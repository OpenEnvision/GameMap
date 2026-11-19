import { useEffect, useRef } from "react";
import { REDUCED_MOTION, clamp, matches, watchMedia } from "../../lib/motion";

/*
 * The home hero: a procedural planet rendered by one fragment shader in raw
 * WebGL, coloured from the page tokens. The sun (--brand) rises behind the
 * limb; the night side keeps a cool fill and faint city lights. The pointer turns the world with inertia and scrolling
 * moves the camera toward it.
 *
 * The CSS art underneath (`.hm-planet-art`) uses the same geometry custom
 * properties, so static HTML, reduced motion without WebGL and lost contexts
 * all show a matching frame. Reduced motion renders one still WebGL frame.
 *
 * The art needs the stage's size. A size container (cqw/cqh) would provide
 * it, but Chrome drops the layout of size containers right after hydration
 * here (the canvas and the art collapse to 0×0), so a ResizeObserver writes
 * the size as --hm-w/--hm-h instead; home.css falls back to viewport units
 * until it has run.
 */

const VERTEX = `
attribute vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform vec3 uPlanet;
uniform vec2 uSun;
uniform float uTime;
uniform vec2 uSpin;
uniform float uRise;
uniform float uLight;
uniform float uScale;
uniform vec3 uPaper;
uniform vec3 uWarm;
uniform vec3 uCool;

float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  vec3 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash13(i), hash13(i + vec3(1.0, 0.0, 0.0)), u.x),
        mix(hash13(i + vec3(0.0, 1.0, 0.0)), hash13(i + vec3(1.0, 1.0, 0.0)), u.x), u.y),
    mix(mix(hash13(i + vec3(0.0, 0.0, 1.0)), hash13(i + vec3(1.0, 0.0, 1.0)), u.x),
        mix(hash13(i + vec3(0.0, 1.0, 1.0)), hash13(i + vec3(1.0, 1.0, 1.0)), u.x), u.y),
    u.z);
}
float fbm5(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec3(3.1, 1.7, 4.3);
    a *= 0.5;
  }
  return v;
}
float fbm3(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = p * 2.11 + vec3(1.3, 5.2, 2.9);
    a *= 0.5;
  }
  return v;
}
mat3 rotY(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}
mat3 rotX(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c);
}
float starLayer(vec2 frag, float cell, float seed, float threshold) {
  vec2 g = floor(frag / cell);
  float h = hash12(g + seed);
  if (h < threshold) return 0.0;
  vec2 offs = vec2(hash12(g + seed + 7.1), hash12(g + seed + 3.7)) * 0.8 + 0.1;
  float d = length(frag - (g + offs) * cell) / uScale;
  float twinkle = 0.62 + 0.38 * sin(uTime * (0.5 + h * 1.7) + h * 40.0);
  return smoothstep(1.5, 0.0, d) * twinkle * (h - threshold) / (1.0 - threshold);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float R = uPlanet.z;
  vec2 p = (frag - uPlanet.xy) / R;
  float r = length(p);
  float aa = 1.4 * uScale / R;
  vec2 sunRel = (uSun - uPlanet.xy) / R;
  vec2 sunDir = normalize(sunRel);
  float dark = 1.0 - uLight;

  /* Palette from the page tokens: --brand is the sun, --signal the cool fill. */
  vec3 solar = pow(uWarm, vec3(2.2));
  solar /= max(max(solar.r, max(solar.g, solar.b)), 0.001);
  vec3 solarHot = mix(solar, vec3(1.0, 0.9, 0.84), 0.62);
  vec3 cool = mix(pow(uCool, vec3(2.2)), vec3(0.55, 0.62, 0.8), 0.45);
  vec3 paper = pow(uPaper, vec3(2.2));

  float lz = mix(mix(-0.74, 0.12, uRise), 0.5, uLight);
  vec3 L = normalize(vec3(sunDir * mix(0.68, 0.8, uLight) + vec2(-0.35, 0.0) * uLight, lz));

  /* Sky: the page colour, a faint haze, stars and the sun's glow. */
  vec2 uv = frag / uRes;
  vec3 col = paper;
  float haze = smoothstep(1.1, 0.0, length((uv - vec2(0.18, 1.0)) * vec2(1.0, 1.7)));
  col += dark * cool * 0.006 * haze;
  if (dark > 0.5 && r > 1.0) {
    float s = starLayer(frag, 17.0 * uScale, 1.0, 0.94) * 0.55
      + starLayer(frag, 41.0 * uScale, 9.0, 0.9) * 0.8
      + starLayer(frag, 97.0 * uScale, 21.0, 0.82) * 1.2;
    col += vec3(0.9, 0.9, 0.92) * s * smoothstep(1.0, 1.25, r);
  }
  vec2 ds = (frag - uSun) / R;
  float d = length(ds);
  float halo = exp(-d * 6.5);
  float wide = exp(-d * 1.8);
  col += solar * (0.16 * halo + 0.014 * wide) * dark;
  col = mix(col, col * mix(vec3(1.0), solarHot, 0.55), (halo * 0.7 + wide * 0.3) * uLight);

  /* Atmosphere outside the limb: hot toward the sun, cool and thin away from it. */
  float hgt = max(r - 1.0, 0.0);
  float cosA = dot(p / max(r, 1e-4), sunDir);
  float facing = smoothstep(-0.45, 1.0, cosA);
  float rim = exp(-hgt / 0.016) * 0.95 + exp(-hgt / 0.08) * 0.26;
  vec3 atmo = mix(cool * 0.22, mix(solar, solarHot, 0.3) * 1.5, pow(facing, 2.2));
  atmo *= 0.3 + 2.6 * pow(max(cosA, 0.0), 10.0);
  col += atmo * rim * dark;
  col = mix(col, mix(vec3(0.62, 0.64, 0.7), solarHot, pow(facing, 3.0)), rim * 0.4 * uLight);

  /* The planet. */
  float body = 1.0 - smoothstep(1.0 - aa, 1.0 + aa, r);
  if (r < 1.0 + aa) {
    float z = sqrt(max(1.0 - r * r, 0.0));
    vec3 n = vec3(p, z);
    vec3 q = rotY(uTime * 0.028 + uSpin.x) * (rotX(0.38 + uSpin.y) * n);
    float warp = fbm3(q * 2.4 + 7.0);
    float h = fbm5(q * 2.6 + warp * 1.1) + (noise(q * 22.0) - 0.5) * 0.06;
    float land = smoothstep(0.5, 0.507, h);
    float shelf = smoothstep(0.43, 0.5, h) * (1.0 - land);
    float ridge = 1.0 - abs(noise(q * 9.0) * 2.0 - 1.0);
    float elev = clamp((h - 0.5) / 0.2 + ridge * ridge * 0.35 * land, 0.0, 1.0);
    float ice = smoothstep(0.82, 0.9, abs(q.y) + (h - 0.5) * 0.5);

    vec3 ocean = mix(vec3(0.003, 0.004, 0.007), vec3(0.012, 0.016, 0.026), shelf);
    vec3 ground = mix(vec3(0.05, 0.045, 0.04), vec3(0.3, 0.28, 0.26), smoothstep(0.08, 0.55, elev));
    ground = mix(ground, vec3(0.78, 0.76, 0.73), smoothstep(0.72, 1.0, elev));
    float grain = noise(q * 46.0);
    ground *= 0.78 + 0.44 * grain;
    vec3 albedo = mix(mix(ocean, ground, land), vec3(0.88, 0.88, 0.9), ice);
    vec3 oceanL = mix(vec3(0.1, 0.11, 0.135), vec3(0.24, 0.26, 0.3), shelf);
    vec3 groundL = mix(vec3(0.7, 0.68, 0.64), vec3(0.86, 0.84, 0.8), smoothstep(0.08, 0.55, elev));
    groundL = mix(groundL, vec3(0.98, 0.97, 0.95), smoothstep(0.72, 1.0, elev));
    groundL *= 0.9 + 0.2 * grain;
    vec3 albedoL = mix(mix(oceanL, groundL, land), vec3(1.0), ice);
    albedo = mix(albedo, albedoL, uLight);

    float ndl = dot(n, L);
    float diff = max(ndl, 0.0);
    float day = smoothstep(-0.1, 0.24, ndl);
    vec3 sunLight = mix(vec3(1.0, 0.93, 0.89) * 2.1, vec3(1.0, 0.99, 0.97) * 1.12, uLight);
    vec3 surf = albedo * sunLight * diff;
    surf += solar * exp(-pow(ndl / 0.07, 2.0)) * 0.07 * dark;
    vec3 hv = normalize(L + vec3(0.0, 0.0, 1.0));
    surf += solarHot * pow(max(dot(n, hv), 0.0), 64.0) * (1.0 - land) * (1.0 - ice) * 1.2 * day;

    float fill = max(dot(n, normalize(vec3(-0.45, 0.35, 0.82))), 0.0);
    vec3 night = cool * (0.004 + 0.022 * fill) * (0.4 + land * (0.8 + elev));
    vec3 nightL = albedoL * mix(vec3(0.6, 0.61, 0.66), paper, 0.2) * (0.5 + 0.3 * fill);
    surf += mix(night, nightL, uLight) * (1.0 - day);

    float c1 = noise(q * 62.0);
    float c2 = noise(q * 12.0 + 3.0);
    float cities = smoothstep(0.7, 0.96, c1) * smoothstep(0.5, 0.74, c2) * land
      * (1.0 - smoothstep(0.1, 0.7, elev)) * (1.0 - day) * (1.0 - ice) * dark;
    vec3 cityCol = mix(vec3(1.0, 0.86, 0.72), solar, step(0.8, hash13(floor(q * 62.0))));

    vec3 cq = vec3(q.x, q.y * 2.2, q.z);
    float cl = fbm5(cq * 3.4 + vec3(uTime * 0.006, 0.0, uTime * 0.003) + warp * 0.8);
    float cloud = smoothstep(0.56, 0.8, cl + (grain - 0.5) * 0.08) * 0.82;
    vec3 cloudLit = vec3(1.0, 0.98, 0.96) * sunLight * (diff * 0.92 + 0.02);
    vec3 cloudNight = mix(cool * 0.016, vec3(0.7, 0.71, 0.75) * 0.7, uLight);
    vec3 cloudCol = mix(cloudNight, cloudLit, day);
    surf += cityCol * cities * 2.4 * (1.0 - cloud);
    surf = mix(surf, cloudCol, cloud);

    float fres = pow(1.0 - z, 4.2);
    float cosN = dot(p / max(r, 1e-4), sunDir);
    vec3 atmoIn = mix(cool * 0.16, solar * 1.4, smoothstep(0.1, 0.95, cosN));
    surf += atmoIn * fres * (0.1 + 1.1 * day) * dark;
    surf = mix(surf, mix(vec3(0.75, 0.77, 0.82), solarHot, smoothstep(0.2, 1.0, cosN)), fres * 0.5 * uLight);
    col = mix(col, surf, body);
  }

  /* Lens: bloom, the sun's core where it clears the limb, an anamorphic streak. */
  col += solar * exp(-d * 10.0) * 0.3 * dark;
  col += solarHot * exp(-d * d * 2600.0) * 3.2 * (1.0 - body) * mix(1.0, 0.6, uLight);
  float streak = exp(-abs(ds.y) * 150.0) * exp(-abs(ds.x) * 2.0);
  col += mix(solar, solarHot, 0.5) * streak * 0.42 * dark;

  col = mix(1.0 - exp(-col * 1.05), clamp(col, 0.0, 1.0), uLight);
  gl_FragColor = vec4(pow(col, vec3(1.0 / 2.2)), 1.0);
}
`;

type Uniforms = Record<
  | "uRes"
  | "uPlanet"
  | "uSun"
  | "uTime"
  | "uSpin"
  | "uRise"
  | "uLight"
  | "uScale"
  | "uPaper"
  | "uWarm"
  | "uCool",
  WebGLUniformLocation | null
>;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(shader) || "compile");
  return shader;
}

function parseColor(value: string, fallback: [number, number, number]) {
  const hex = value.trim().match(/^#([0-9a-f]{6})$/i);
  if (!hex) return fallback;
  const n = parseInt(hex[1], 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255] as [
    number,
    number,
    number,
  ];
}

const PIXEL_BUDGET = 2_300_000;

export function PlanetHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Stage size for the CSS art, independent of WebGL support.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      stage.style.setProperty("--hm-w", `${stage.clientWidth}px`);
      stage.style.setProperty("--hm-h", `${stage.clientHeight}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const hero = stage?.parentElement;
    if (!stage || !canvas || !hero) return;
    const fail = () => {
      canvas.dataset.state = "fallback";
    };
    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let uniforms: Uniforms;
    try {
      gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: false,
        powerPreference: "low-power",
      });
      if (!gl) return fail();
      program = gl.createProgram();
      if (!program) return fail();
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return fail();
      gl.useProgram(program);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      const position = gl.getAttribLocation(program, "aPosition");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      const names = [
        "uRes",
        "uPlanet",
        "uSun",
        "uTime",
        "uSpin",
        "uRise",
        "uLight",
        "uScale",
        "uPaper",
        "uWarm",
        "uCool",
      ] as const;
      uniforms = Object.fromEntries(
        names.map((name) => [name, gl!.getUniformLocation(program!, name)]),
      ) as Uniforms;
    } catch {
      return fail();
    }
    const context = gl;

    let width = 0;
    let height = 0;
    let scale = 1;
    let quality = 1;
    let horizon = 0.64;
    let radiusW = 0.62;
    let radiusH = 0.75;
    let sunAngle = 70;
    let light = 0;
    let paper: [number, number, number] = [0.02, 0.02, 0.02];
    let warm: [number, number, number] = [0.9, 0.23, 0.2];
    let cool: [number, number, number] = [0.85, 0.85, 0.83];
    let reduced = matches(REDUCED_MOTION, true);
    let visible = true;
    let frame = 0;
    let lost = false;
    const start = performance.now();
    let last = start;
    let slowFrames = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let scroll = 0;
    let scrollTarget = 0;

    const readTheme = () => {
      const styles = getComputedStyle(stage);
      const number = (name: string, fallback: number) => {
        const value = parseFloat(styles.getPropertyValue(name));
        return Number.isFinite(value) ? value : fallback;
      };
      horizon = number("--hm-horizon", horizon);
      radiusW = number("--hm-radius-w", radiusW);
      radiusH = number("--hm-radius-h", radiusH);
      sunAngle = number("--hm-sun-angle", sunAngle);
      light = document.documentElement.classList.contains("dark") ? 0 : 1;
      const root = getComputedStyle(document.documentElement);
      paper = parseColor(
        root.getPropertyValue("--paper"),
        light ? [0.96, 0.96, 0.94] : [0.02, 0.02, 0.02],
      );
      warm = parseColor(root.getPropertyValue("--brand"), warm);
      cool = parseColor(root.getPropertyValue("--signal"), cool);
    };
    const resize = () => {
      width = stage.clientWidth;
      height = stage.clientHeight;
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      scale =
        Math.min(dpr, Math.sqrt(PIXEL_BUDGET / (width * height))) * quality;
      scale = Math.max(scale, 0.5);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      readTheme();
    };
    const readScroll = () => {
      const rect = hero.getBoundingClientRect();
      scrollTarget = clamp(-rect.top / Math.max(rect.height * 0.85, 1), 0, 1);
    };

    const draw = (now: number) => {
      if (lost || !width || !height) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const ease = reduced ? 1 : 1 - Math.exp(-dt * 3.2);
      pointer.x += (pointer.tx - pointer.x) * ease;
      pointer.y += (pointer.ty - pointer.y) * ease;
      scroll += (scrollTarget - scroll) * (reduced ? 1 : 1 - Math.exp(-dt * 6));
      const s = reduced ? 0 : scroll;
      const time = reduced ? 34 : 34 + (now - start) / 1000;
      const radius =
        Math.max(width * radiusW, height * radiusH) * (1 + 0.28 * s);
      const top = horizon * height - s * 0.4 * height;
      const cx = width / 2 + pointer.x * width * 0.012;
      const cy = top + radius;
      const angle = ((sunAngle - pointer.x * 7) * Math.PI) / 180;
      const reach = radius * (1.012 + 0.08 * s);
      const sunX = cx + Math.cos(angle) * reach;
      const sunY = cy - Math.sin(angle) * reach;
      const k = scale;
      const H = canvas.height;
      context.viewport(0, 0, canvas.width, H);
      context.uniform2f(uniforms.uRes, canvas.width, H);
      context.uniform3f(uniforms.uPlanet, cx * k, H - cy * k, radius * k);
      context.uniform2f(uniforms.uSun, sunX * k, H - sunY * k);
      context.uniform1f(uniforms.uTime, time);
      context.uniform2f(
        uniforms.uSpin,
        pointer.x * 0.9 + s * 0.7,
        pointer.y * 0.22,
      );
      context.uniform1f(uniforms.uRise, s);
      context.uniform1f(uniforms.uLight, light);
      context.uniform1f(uniforms.uScale, k);
      context.uniform3f(uniforms.uPaper, paper[0], paper[1], paper[2]);
      context.uniform3f(uniforms.uWarm, warm[0], warm[1], warm[2]);
      context.uniform3f(uniforms.uCool, cool[0], cool[1], cool[2]);
      context.drawArrays(context.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      frame = 0;
      try {
        const interval = now - last;
        draw(now);
        canvas.dataset.state = "live";
        // Slow GPUs: sustained long frames lower the internal resolution.
        if (now - start > 1500 && quality > 0.55) {
          slowFrames =
            interval > 28 ? slowFrames + 1 : Math.max(0, slowFrames - 1);
          if (slowFrames > 24) {
            quality *= 0.8;
            slowFrames = 0;
            resize();
            draw(now);
          }
        }
      } catch {
        return fail();
      }
      schedule();
    };
    const schedule = () => {
      if (frame || reduced || !visible || document.hidden || lost) return;
      frame = requestAnimationFrame(loop);
    };
    const still = () => {
      try {
        last = performance.now();
        draw(last);
        canvas.dataset.state = "static";
      } catch {
        fail();
      }
    };
    const refresh = () => {
      resize();
      if (reduced) return still();
      try {
        draw(performance.now());
      } catch {
        return fail();
      }
      schedule();
    };

    const onPointer = (event: PointerEvent) => {
      if (reduced || event.pointerType === "touch") return;
      pointer.tx = clamp(event.clientX / window.innerWidth - 0.5, -0.5, 0.5);
      pointer.ty = clamp(event.clientY / window.innerHeight - 0.5, -0.5, 0.5);
    };
    const onScroll = () => readScroll();
    const onVisibility = () => {
      if (!document.hidden) {
        last = performance.now();
        schedule();
      }
    };
    const onLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      cancelAnimationFrame(frame);
      frame = 0;
      fail();
    };

    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(stage);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) {
        last = performance.now();
        schedule();
      }
    });
    intersection.observe(hero);
    const themeObserver = new MutationObserver(() => {
      readTheme();
      if (reduced) still();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    const stopWatching = watchMedia(REDUCED_MOTION, () => {
      reduced = matches(REDUCED_MOTION, true);
      if (reduced) {
        cancelAnimationFrame(frame);
        frame = 0;
        still();
      } else {
        last = performance.now();
        schedule();
      }
    });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onLost);
    readScroll();
    refresh();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      stopWatching();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
    };
  }, []);

  return (
    <div className="hm-hero-stage" ref={stageRef} aria-hidden="true">
      <div className="hm-planet-art">
        <span className="hm-art-sun" />
        <span className="hm-art-planet" />
      </div>
      <canvas
        ref={canvasRef}
        className="hero-starfield hm-planet-canvas"
        data-state="idle"
      />
    </div>
  );
}
