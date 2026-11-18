import { useEffect, useRef } from "react";
import { REDUCED_MOTION, matches, seeded, watchMedia } from "../../lib/motion";

type Star = {
  x: number;
  y: number;
  radius: number;
  layer: 0 | 1 | 2;
  phase: number;
  speed: number;
  tint: 0 | 1 | 2;
};
type Palette = {
  star: string;
  orbit: string;
  brand: string;
  signal: string;
  dark: boolean;
};
type Meteor = { x: number; y: number; vx: number; vy: number; age: number };

const LAYER_DEPTH = [0.25, 0.55, 1] as const;
const LAYER_ALPHA = [0.45, 0.7, 1] as const;
/** Orbit periods in milliseconds; slow enough to read as ambient, not as UI. */
const ORBIT_PERIODS = [48_000, 72_000, 110_000] as const;
const ORBIT_SCALE = [0.3, 0.45, 0.62] as const;
const METEOR_LIFE = 950;

function readPalette(host: Element): Palette {
  const styles = getComputedStyle(host);
  const value = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback;
  return {
    star: value("--star", "rgb(220 232 255 / 0.85)"),
    orbit: value("--orbit-line", "rgb(95 227 240 / 0.2)"),
    brand: value("--brand", "#ff7a45"),
    signal: value("--signal", "#5fe3f0"),
    dark: document.documentElement.classList.contains("dark"),
  };
}

function glowSprite(color: string, size = 48) {
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = size;
  const context = sprite.getContext("2d");
  if (!context) return sprite;
  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  try {
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.25, color);
  } catch {
    // An unparsable custom property must never break the page.
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(0.25, "#ffffff");
  }
  gradient.addColorStop(1, "transparent");
  context.fillStyle = gradient;
  context.globalAlpha = 1;
  context.fillRect(0, 0, size, size);
  return sprite;
}

/**
 * A decorative, layered starfield with slowly precessing orbits.
 * Everything happens after hydration; static HTML keeps the CSS fallback.
 */
export function Starfield({
  className,
  density = 1,
  orbits = true,
  parallax = 14,
  meteors = true,
}: {
  className?: string;
  density?: number;
  orbits?: boolean;
  parallax?: number;
  meteors?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let context: CanvasRenderingContext2D | null = null;
    try {
      context = canvas.getContext("2d");
    } catch {
      context = null;
    }
    if (!context) {
      canvas.dataset.state = "failed";
      return;
    }
    const ctx = context;
    const host = canvas.parentElement ?? canvas;
    let palette = readPalette(host);
    let sprites = makeSprites(palette);
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let frame = 0;
    let running = false;
    let failed = false;
    let visible = true;
    let last = 0;
    let time = 0;
    let pointerX = 0;
    let pointerY = 0;
    let driftX = 0;
    let driftY = 0;
    let meteor: Meteor | null = null;
    const random = seeded(0x6a3e17);
    let nextMeteor = 5_000 + random() * 6_000;

    function makeSprites(colors: Palette) {
      return [
        glowSprite(colors.star),
        glowSprite(colors.brand),
        glowSprite(colors.signal),
      ] as const;
    }

    function build() {
      const box = host.getBoundingClientRect();
      width = Math.max(1, Math.round(box.width));
      height = Math.max(1, Math.round(box.height));
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * ratio);
      canvas!.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const generate = seeded(0x51a7 + width * 7 + height);
      const count = Math.min(
        320,
        Math.round(((width * height) / 5200) * density * (palette.dark ? 1 : 0.5)),
      );
      stars = Array.from({ length: count }, () => {
        const layer = (generate() < 0.55 ? 0 : generate() < 0.7 ? 1 : 2) as Star["layer"];
        const roll = generate();
        return {
          x: generate(),
          y: generate(),
          radius: layer === 2 ? 0.9 + generate() * 1.3 : 0.45 + generate() * 0.7,
          layer,
          phase: generate() * Math.PI * 2,
          speed: 0.0006 + generate() * 0.0016,
          tint: (roll > 0.93 ? 1 : roll > 0.86 ? 2 : 0) as Star["tint"],
        };
      });
    }

    function drawStars(now: number) {
      for (const star of stars) {
        const depth = LAYER_DEPTH[star.layer];
        const x = star.x * width + driftX * parallax * depth;
        const y = star.y * height + driftY * parallax * depth;
        const twinkle = 0.55 + 0.45 * Math.sin(now * star.speed + star.phase);
        ctx.globalAlpha = LAYER_ALPHA[star.layer] * twinkle;
        if (star.radius < 1 && star.tint === 0) {
          ctx.fillStyle = palette.star;
          ctx.fillRect(x, y, star.radius * 1.6, star.radius * 1.6);
        } else {
          const size = star.radius * (star.tint ? 9 : 7);
          ctx.drawImage(sprites[star.tint], x - size / 2, y - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    }

    function drawOrbits(now: number) {
      const wide = width > 900;
      const cx = width * (wide ? 0.7 : 0.5) + driftX * parallax * 0.4;
      const cy = height * (wide ? 0.5 : 0.62) + driftY * parallax * 0.4;
      const base = Math.min(width * (wide ? 0.62 : 0.9), height * 1.5);
      const tilt = -0.36 + Math.sin(now / 20_000) * 0.04;
      const cos = Math.cos(tilt);
      const sin = Math.sin(tilt);
      ctx.lineWidth = 1;
      ctx.strokeStyle = palette.orbit;
      ORBIT_SCALE.forEach((scale, index) => {
        const rx = base * scale;
        const ry = rx * 0.32;
        ctx.setLineDash(index === 1 ? [2, 7] : []);
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, tilt, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      ORBIT_SCALE.forEach((scale, index) => {
        const rx = base * scale;
        const ry = rx * 0.32;
        const angle =
          (index * 2.1 + (now / ORBIT_PERIODS[index]) * Math.PI * 2) % (Math.PI * 2);
        const ex = rx * Math.cos(angle);
        const ey = ry * Math.sin(angle);
        const x = cx + ex * cos - ey * sin;
        const y = cy + ex * sin + ey * cos;
        const front = Math.sin(angle) > 0;
        const radius = [3.2, 6.5, 2.4][index] * (front ? 1 : 0.78);
        const tint = index === 1 ? 1 : 2;
        ctx.globalAlpha = front ? 1 : 0.5;
        const halo = radius * 7;
        ctx.drawImage(sprites[tint], x - halo / 2, y - halo / 2, halo, halo);
        const sphere = ctx.createRadialGradient(
          x - radius * 0.35,
          y - radius * 0.35,
          radius * 0.1,
          x,
          y,
          radius,
        );
        sphere.addColorStop(0, "#ffffff");
        sphere.addColorStop(0.35, index === 1 ? palette.brand : palette.signal);
        sphere.addColorStop(1, palette.dark ? "#05070f" : "#0b1020");
        ctx.fillStyle = sphere;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    function drawMeteor(delta: number) {
      if (!meteors) return;
      nextMeteor -= delta;
      if (!meteor && nextMeteor <= 0) {
        const leftward = random() > 0.5;
        meteor = {
          x: width * (0.15 + random() * 0.7),
          y: height * random() * 0.35,
          vx: (leftward ? -1 : 1) * (0.55 + random() * 0.35),
          vy: 0.28 + random() * 0.18,
          age: 0,
        };
        nextMeteor = 7_000 + random() * 8_000;
      }
      if (!meteor) return;
      meteor.age += delta;
      meteor.x += meteor.vx * delta;
      meteor.y += meteor.vy * delta;
      const life = meteor.age / METEOR_LIFE;
      if (life >= 1) {
        meteor = null;
        return;
      }
      const fade = Math.sin(life * Math.PI);
      const tail = 110;
      const length = Math.hypot(meteor.vx, meteor.vy);
      const tx = meteor.x - (meteor.vx / length) * tail;
      const ty = meteor.y - (meteor.vy / length) * tail;
      const streak = ctx.createLinearGradient(meteor.x, meteor.y, tx, ty);
      streak.addColorStop(0, palette.star);
      streak.addColorStop(1, "transparent");
      ctx.globalAlpha = fade;
      ctx.strokeStyle = streak;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(meteor.x, meteor.y);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function draw(now: number, delta: number) {
      driftX += (pointerX - driftX) * 0.04;
      driftY += (pointerY - driftY) * 0.04;
      ctx.clearRect(0, 0, width, height);
      drawStars(now);
      if (orbits) drawOrbits(now);
      drawMeteor(delta);
    }

    function paintOnce() {
      if (failed) return;
      try {
        draw(time || 12_000, 0);
      } catch {
        fail();
      }
    }
    function fail() {
      failed = true;
      stop();
      canvas!.dataset.state = "failed";
    }
    function tick(now: number) {
      frame = 0;
      if (!running) return;
      const delta = last ? Math.min(64, now - last) : 16;
      last = now;
      time += delta;
      try {
        draw(time, delta);
      } catch {
        fail();
        return;
      }
      frame = requestAnimationFrame(tick);
    }
    function start() {
      if (failed || running || !visible || document.hidden) return;
      if (matches(REDUCED_MOTION, true)) {
        paintOnce();
        canvas!.dataset.state = "static";
        return;
      }
      running = true;
      last = 0;
      canvas!.dataset.state = "running";
      frame = requestAnimationFrame(tick);
    }
    function stop() {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }
    function refresh() {
      if (failed) return;
      try {
        build();
      } catch {
        fail();
        return;
      }
      if (!running) paintOnce();
    }

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotion = () => {
      stop();
      start();
      if (!running) paintOnce();
    };

    refresh();
    const resize = new ResizeObserver(refresh);
    resize.observe(host);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) start();
      else stop();
    });
    intersection.observe(canvas);
    const theme = new MutationObserver(() => {
      palette = readPalette(host);
      sprites = makeSprites(palette);
      refresh();
    });
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    document.addEventListener("visibilitychange", onVisibility);
    if (parallax > 0 && matches("(pointer: fine)"))
      window.addEventListener("pointermove", onPointer, { passive: true });
    const unwatch = watchMedia(REDUCED_MOTION, onMotion);
    start();
    return () => {
      stop();
      unwatch();
      resize.disconnect();
      intersection.disconnect();
      theme.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [density, orbits, parallax, meteors]);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
