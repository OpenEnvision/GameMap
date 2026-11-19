import { useEffect, useRef } from "react";
import { REDUCED_MOTION, matches, watchMedia } from "../../lib/motion";

/*
 * Live tactical game-loop blueprint for Chapter 01 ("Idea").
 * Renders the exact prompt — "One room, three guards, a raccoon after the
 * golden sardine." — as a real-time 60fps architectural stealth simulation
 * with exact corner-accurate 2D raycasted vision cones, illuminated wall-edge
 * occlusion, raccoon stealth trail, golden sardine pickup burst, and an
 * unlocking crimson exit hatch.
 *
 * Respects prefers-reduced-motion (renders one crisp iconic still frame),
 * pauses automatically when offscreen, inactive, or in hidden tabs, and
 * updates cleanly on dark/light theme changes.
 */

const W = 500;
const H = 356;
const ROOM = { x: 26, y: 26, w: 448, h: 304 };

type Rect = { x: number; y: number; w: number; h: number };
type Seg = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  wall: boolean;
};
type Pt = [number, number];

// Five architectural museum cover walls framing the stealth room.
const WALLS: readonly Rect[] = [
  { x: 102, y: 186, w: 22, h: 98 }, // West entry cover
  { x: 96, y: 88, w: 58, h: 20 }, // Northwest exhibit plinth
  { x: 194, y: 112, w: 96, h: 22 }, // Central vault baffle
  { x: 318, y: 184, w: 22, h: 94 }, // East corridor pillar
  { x: 364, y: 78, w: 66, h: 20 }, // Northeast alcove wall
];

const SARDINE: Pt = [242, 66];
const ENTRY_POS: Pt = [ROOM.x, 256];
const EXIT_POS: Pt = [ROOM.x + ROOM.w, 248];

// Room boundary + cover obstacle segments + vertices for razor-sharp shadows.
function buildGeometry(): { segs: Seg[]; corners: Pt[] } {
  const segs: Seg[] = [
    { x1: ROOM.x, y1: ROOM.y, x2: ROOM.x + ROOM.w, y2: ROOM.y, wall: false },
    {
      x1: ROOM.x + ROOM.w,
      y1: ROOM.y,
      x2: ROOM.x + ROOM.w,
      y2: ROOM.y + ROOM.h,
      wall: false,
    },
    {
      x1: ROOM.x + ROOM.w,
      y1: ROOM.y + ROOM.h,
      x2: ROOM.x,
      y2: ROOM.y + ROOM.h,
      wall: false,
    },
    { x1: ROOM.x, y1: ROOM.y + ROOM.h, x2: ROOM.x, y2: ROOM.y, wall: false },
  ];
  const corners: Pt[] = [];
  for (const r of WALLS) {
    segs.push(
      { x1: r.x, y1: r.y, x2: r.x + r.w, y2: r.y, wall: true },
      { x1: r.x + r.w, y1: r.y, x2: r.x + r.w, y2: r.y + r.h, wall: true },
      { x1: r.x + r.w, y1: r.y + r.h, x2: r.x, y2: r.y + r.h, wall: true },
      { x1: r.x, y1: r.y + r.h, x2: r.x, y2: r.y, wall: true },
    );
    corners.push(
      [r.x, r.y],
      [r.x + r.w, r.y],
      [r.x + r.w, r.y + r.h],
      [r.x, r.y + r.h],
    );
  }
  return { segs, corners };
}
const { segs: SEGMENTS, corners: WALL_CORNERS } = buildGeometry();

// Raccoon stealth loop across the room (01 Explore -> 02 Collect -> 03 Escape).
const ROUTE_PTS: readonly Pt[] = [
  [42, 256],
  [72, 256],
  [70, 152],
  [142, 146],
  [172, 100],
  [190, 66],
  [242, 66], // Collect golden sardine (index 6)
  [304, 68],
  [328, 120],
  [294, 174],
  [288, 252],
  [316, 304],
  [398, 294],
  [456, 248], // Slip out the exit hatch
];

const ROUTE_LEN: number[] = [0];
for (let i = 1; i < ROUTE_PTS.length; i++) {
  const dx = ROUTE_PTS[i][0] - ROUTE_PTS[i - 1][0];
  const dy = ROUTE_PTS[i][1] - ROUTE_PTS[i - 1][1];
  ROUTE_LEN.push(ROUTE_LEN[i - 1] + Math.hypot(dx, dy));
}
const TOTAL_LEN = ROUTE_LEN[ROUTE_LEN.length - 1];
const COLLECT_U = ROUTE_LEN[6] / TOTAL_LEN;

function sampleRoute(u: number): { x: number; y: number; angle: number } {
  const clamped = Math.max(0, Math.min(1, u));
  const dist = clamped * TOTAL_LEN;
  let idx = 0;
  while (idx < ROUTE_LEN.length - 2 && ROUTE_LEN[idx + 1] < dist) idx++;
  const segLen = Math.max(ROUTE_LEN[idx + 1] - ROUTE_LEN[idx], 1e-4);
  const t = (dist - ROUTE_LEN[idx]) / segLen;
  const p0 = ROUTE_PTS[Math.max(0, idx - 1)];
  const p1 = ROUTE_PTS[idx];
  const p2 = ROUTE_PTS[Math.min(ROUTE_PTS.length - 1, idx + 1)];
  const p3 = ROUTE_PTS[Math.min(ROUTE_PTS.length - 1, idx + 2)];
  const t2 = t * t;
  const t3 = t2 * t;
  const catmull = (a: number, b: number, c: number, d: number) =>
    0.5 *
    (2 * b +
      (-a + c) * t +
      (2 * a - 5 * b + 4 * c - d) * t2 +
      (-a + 3 * b - 3 * c + d) * t3);
  const dCatmull = (a: number, b: number, c: number, d: number) =>
    0.5 *
    (-a +
      c +
      2 * (2 * a - 5 * b + 4 * c - d) * t +
      3 * (-a + 3 * b - 3 * c + d) * t2);
  const x = catmull(p0[0], p1[0], p2[0], p3[0]);
  const y = catmull(p0[1], p1[1], p2[1], p3[1]);
  const dx = dCatmull(p0[0], p1[0], p2[0], p3[0]);
  const dy = dCatmull(p0[1], p1[1], p2[1], p3[1]);
  return { x, y, angle: Math.atan2(dy, dx) };
}

type GuardSpec = {
  a: Pt;
  b: Pt;
  speed: number;
  phase: number;
  baseAngle: number;
  sweep: number;
  sweepSpeed: number;
  range: number;
};

const GUARDS: readonly GuardSpec[] = [
  {
    a: [158, 178],
    b: [158, 272],
    speed: 0.48,
    phase: 0.35,
    baseAngle: (158 * Math.PI) / 180,
    sweep: (28 * Math.PI) / 180,
    sweepSpeed: 1.02,
    range: 124,
  },
  {
    a: [208, 168],
    b: [264, 168],
    speed: 0.44,
    phase: 2.15,
    baseAngle: (94 * Math.PI) / 180,
    sweep: (38 * Math.PI) / 180,
    sweepSpeed: 0.86,
    range: 124,
  },
  {
    a: [396, 146],
    b: [396, 224],
    speed: 0.54,
    phase: 3.9,
    baseAngle: (186 * Math.PI) / 180,
    sweep: (24 * Math.PI) / 180,
    sweepSpeed: 1.08,
    range: 130,
  },
];

// Deterministic golden sparkle motes released when collecting the sardine.
const SPARKLES = Array.from({ length: 8 }, (_, index) => ({
  angle: (index * Math.PI * 2) / 8 + 0.3,
  dist: 24 + (index % 3) * 11,
  radius: 1.3 + (index % 2) * 0.7,
}));

function wrapDelta(delta: number): number {
  let d = delta;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}

type RayHit = { x: number; y: number; hitWall: boolean; dist: number };

function raycast(
  ox: number,
  oy: number,
  dx: number,
  dy: number,
  maxDist: number,
): RayHit {
  let best = maxDist;
  let hitWall = false;
  for (let i = 0; i < SEGMENTS.length; i++) {
    const s = SEGMENTS[i];
    const sx = s.x2 - s.x1;
    const sy = s.y2 - s.y1;
    const denom = dx * sy - dy * sx;
    if (Math.abs(denom) < 1e-6) continue;
    const qx = s.x1 - ox;
    const qy = s.y1 - oy;
    const t = (qx * sy - qy * sx) / denom;
    if (t <= 0 || t >= best) continue;
    const u = (qx * dy - qy * dx) / denom;
    if (u >= 0 && u <= 1) {
      best = t;
      hitWall = s.wall;
    }
  }
  return { x: ox + dx * best, y: oy + dy * best, hitWall, dist: best };
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

const CYCLE_SECONDS = 12.5;
const STILL_TIME = 5.45; // Iconic still frame right as the raccoon reaches the golden sardine

export function IdeaLoopCanvas({
  active = true,
  onPhaseChange,
  onProgress,
}: {
  active?: boolean;
  onPhaseChange?: (phase: 0 | 1 | 2) => void;
  onProgress?: (progress: number) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  const onPhaseRef = useRef(onPhaseChange);
  const onProgressRef = useRef(onProgress);
  const scheduleRef = useRef<() => void>(() => {});
  activeRef.current = active;
  onPhaseRef.current = onPhaseChange;
  onProgressRef.current = onProgress;

  useEffect(() => {
    if (active) scheduleRef.current();
  }, [active]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = 1;
    let width = 0;
    let height = 0;
    let dark = true;
    let reduced = matches(REDUCED_MOTION, true);
    let visible = true;
    let frame = 0;
    let lastPhase: 0 | 1 | 2 | -1 = -1;
    const start = performance.now();

    const readTheme = () => {
      dark = document.documentElement.classList.contains("dark");
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      readTheme();
    };

    const draw = (seconds: number) => {
      if (!width || !height) return;
      const cycle = (seconds % CYCLE_SECONDS) / CYCLE_SECONDS;
      const moveU = Math.min(1, cycle / 0.92);
      const collected = moveU >= COLLECT_U;
      const exiting = cycle >= 0.92;
      const exitPulse = exiting ? (cycle - 0.92) / 0.08 : 0;

      onProgressRef.current?.(cycle);

      const phase: 0 | 1 | 2 =
        moveU < COLLECT_U - 0.06 ? 0 : moveU < COLLECT_U + 0.11 ? 1 : 2;
      if (phase !== lastPhase) {
        lastPhase = phase;
        onPhaseRef.current?.(phase);
      }

      const p = dark
        ? {
            floor: "#0a0a0d",
            floorTop: "#0e0e13",
            floorEdge: "rgba(255, 255, 255, 0.15)",
            grid: "rgba(255, 255, 255, 0.032)",
            gridMajor: "rgba(255, 255, 255, 0.068)",
            wallFill: "#15151b",
            wallHatch: "rgba(255, 255, 255, 0.058)",
            wallStroke: "rgba(255, 255, 255, 0.21)",
            wallHi: "rgba(255, 255, 255, 0.34)",
            shadow: "rgba(0, 0, 0, 0.5)",
            track: "rgba(255, 255, 255, 0.14)",
            routeGhost: "rgba(255, 255, 255, 0.095)",
            accent: "#f04a3a",
            accentRgb: "240, 74, 58",
            gold: "#f5c249",
            goldRgb: "245, 194, 73",
            pawn: "#f7f7f5",
            pawnMask: "#15151a",
            guardFill: "#111116",
            guardStroke: "rgba(255, 255, 255, 0.78)",
            label: "rgba(255, 255, 255, 0.3)",
            labelSoft: "rgba(255, 255, 255, 0.18)",
          }
        : {
            floor: "#fafaf7",
            floorTop: "#ffffff",
            floorEdge: "rgba(5, 5, 5, 0.16)",
            grid: "rgba(5, 5, 5, 0.04)",
            gridMajor: "rgba(5, 5, 5, 0.082)",
            wallFill: "#ecece5",
            wallHatch: "rgba(5, 5, 5, 0.068)",
            wallStroke: "rgba(5, 5, 5, 0.22)",
            wallHi: "rgba(255, 255, 255, 0.92)",
            shadow: "rgba(5, 5, 5, 0.09)",
            track: "rgba(5, 5, 5, 0.16)",
            routeGhost: "rgba(5, 5, 5, 0.1)",
            accent: "#c81920",
            accentRgb: "200, 25, 32",
            gold: "#c7860a",
            goldRgb: "199, 134, 10",
            pawn: "#0f0f12",
            pawnMask: "#fafaf7",
            guardFill: "#ffffff",
            guardStroke: "rgba(5, 5, 5, 0.76)",
            label: "rgba(5, 5, 5, 0.38)",
            labelSoft: "rgba(5, 5, 5, 0.22)",
          };

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Fit virtual W x H cleanly inside the stage.
      const scale = Math.min(width / W, height / H);
      const offsetX = (width - W * scale) * 0.5;
      const offsetY = (height - H * scale) * 0.5;
      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);

      // 0. Precision drafting coordinates & ruler ticks outside the room
      ctx.fillStyle = p.label;
      ctx.strokeStyle = p.labelSoft;
      ctx.lineWidth = 0.85;
      ctx.font =
        '500 8px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const cols = ["A", "B", "C", "D"];
      for (let i = 0; i < cols.length; i++) {
        const cx = ROOM.x + ((i + 0.5) * ROOM.w) / cols.length;
        ctx.fillText(cols[i], cx, ROOM.y - 12);
        if (i > 0) {
          const tx = ROOM.x + (i * ROOM.w) / cols.length;
          ctx.beginPath();
          ctx.moveTo(tx, ROOM.y - 6);
          ctx.lineTo(tx, ROOM.y - 2);
          ctx.stroke();
        }
      }
      const rows = ["01", "02", "03"];
      ctx.textAlign = "right";
      for (let i = 0; i < rows.length; i++) {
        const cy = ROOM.y + ((i + 0.5) * ROOM.h) / rows.length;
        ctx.fillText(rows[i], ROOM.x - 9, cy);
      }

      // 1. Architectural room floorplate
      const floorGrad = ctx.createLinearGradient(
        ROOM.x,
        ROOM.y,
        ROOM.x,
        ROOM.y + ROOM.h,
      );
      floorGrad.addColorStop(0, p.floorTop);
      floorGrad.addColorStop(1, p.floor);
      roundedRect(ctx, ROOM.x, ROOM.y, ROOM.w, ROOM.h, 12);
      ctx.fillStyle = floorGrad;
      ctx.fill();

      // Clip interior blueprint layers to the room
      ctx.save();
      roundedRect(ctx, ROOM.x, ROOM.y, ROOM.w, ROOM.h, 12);
      ctx.clip();

      // Architectural sub-grid inside the room
      const step = 28;
      ctx.lineWidth = 0.75;
      for (let gx = ROOM.x + step; gx < ROOM.x + ROOM.w; gx += step) {
        ctx.strokeStyle =
          Math.round((gx - ROOM.x) / step) % 4 === 0 ? p.gridMajor : p.grid;
        ctx.beginPath();
        ctx.moveTo(gx, ROOM.y);
        ctx.lineTo(gx, ROOM.y + ROOM.h);
        ctx.stroke();
      }
      for (let gy = ROOM.y + step; gy < ROOM.y + ROOM.h; gy += step) {
        ctx.strokeStyle =
          Math.round((gy - ROOM.y) / step) % 4 === 0 ? p.gridMajor : p.grid;
        ctx.beginPath();
        ctx.moveTo(ROOM.x, gy);
        ctx.lineTo(ROOM.x + ROOM.w, gy);
        ctx.stroke();
      }

      // Subtle micro-blueprint labels inside room corners
      ctx.fillStyle = p.label;
      ctx.font =
        '500 7.5px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("ROOM 01 // STEALTH", ROOM.x + 12, ROOM.y + 10);
      ctx.textAlign = "right";
      ctx.fillText("FOV 52° · 3×", ROOM.x + ROOM.w - 12, ROOM.y + 10);

      // Soft ambient glow around the golden sardine vault
      const vaultGlow = ctx.createRadialGradient(
        SARDINE[0],
        SARDINE[1],
        2,
        SARDINE[0],
        SARDINE[1],
        collected ? 48 : 96,
      );
      vaultGlow.addColorStop(
        0,
        `rgba(${p.goldRgb}, ${collected ? 0.07 : 0.25})`,
      );
      vaultGlow.addColorStop(
        0.5,
        `rgba(${p.goldRgb}, ${collected ? 0.02 : 0.065})`,
      );
      vaultGlow.addColorStop(1, `rgba(${p.goldRgb}, 0)`);
      ctx.fillStyle = vaultGlow;
      ctx.fillRect(ROOM.x, ROOM.y, ROOM.w, ROOM.h);

      // Soft crimson glow at Exit Hatch once unlocked
      const exitGlow = ctx.createRadialGradient(
        EXIT_POS[0],
        EXIT_POS[1],
        2,
        EXIT_POS[0],
        EXIT_POS[1],
        collected ? 112 : 44,
      );
      exitGlow.addColorStop(
        0,
        `rgba(${p.accentRgb}, ${collected ? 0.36 : 0.07})`,
      );
      exitGlow.addColorStop(
        0.52,
        `rgba(${p.accentRgb}, ${collected ? 0.09 : 0.01})`,
      );
      exitGlow.addColorStop(1, `rgba(${p.accentRgb}, 0)`);
      ctx.fillStyle = exitGlow;
      ctx.fillRect(ROOM.x, ROOM.y, ROOM.w, ROOM.h);

      // Faint planned loop spline (subtle tactical route guide)
      ctx.save();
      ctx.strokeStyle = p.routeGhost;
      ctx.lineWidth = 1.1;
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      for (let i = 0; i <= 84; i++) {
        const pt = sampleRoute(i / 84);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
      ctx.restore();

      // 2. Three patrolling guards + corner-accurate raycasted volumetric cones
      const guardStates = GUARDS.map((g) => {
        const ping = 0.5 - 0.5 * Math.cos(seconds * g.speed + g.phase);
        const gx = g.a[0] + (g.b[0] - g.a[0]) * ping;
        const gy = g.a[1] + (g.b[1] - g.a[1]) * ping;
        const angle =
          g.baseAngle + Math.sin(seconds * g.sweepSpeed + g.phase) * g.sweep;
        return { g, gx, gy, angle };
      });

      // Patrol rails + terminal stops
      ctx.save();
      ctx.strokeStyle = p.track;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      for (const { g } of guardStates) {
        ctx.beginPath();
        ctx.moveTo(g.a[0], g.a[1]);
        ctx.lineTo(g.b[0], g.b[1]);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.fillStyle = p.track;
      for (const { g } of guardStates) {
        ctx.beginPath();
        ctx.arc(g.a[0], g.a[1], 1.8, 0, Math.PI * 2);
        ctx.arc(g.b[0], g.b[1], 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Compute exact raycast fans (44 uniform + wall-corner precision rays)
      const RAYS = 44;
      const HALF_FOV = (26 * Math.PI) / 180;
      const wallHits: Array<[RayHit, RayHit]> = [];

      for (let gi = 0; gi < guardStates.length; gi++) {
        const { g, gx, gy, angle } = guardStates[gi];
        const offsets: number[] = [];
        for (let i = 0; i <= RAYS; i++) {
          offsets.push(-HALF_FOV + (2 * HALF_FOV * i) / RAYS);
        }
        // Inject exact wall corner angles inside FOV for razor-sharp shadows
        for (let ci = 0; ci < WALL_CORNERS.length; ci++) {
          const [cx, cy] = WALL_CORNERS[ci];
          const ca = Math.atan2(cy - gy, cx - gx);
          const delta = wrapDelta(ca - angle);
          if (Math.abs(delta) < HALF_FOV) {
            offsets.push(delta - 0.0012, delta, delta + 0.0012);
          }
        }
        offsets.sort((a, b) => a - b);

        const fan: RayHit[] = [];
        for (let i = 0; i < offsets.length; i++) {
          const a = angle + offsets[i];
          fan.push(raycast(gx, gy, Math.cos(a), Math.sin(a), g.range));
        }

        // Collect lit grazing edges on interior cover walls
        for (let i = 1; i < fan.length; i++) {
          const prev = fan[i - 1];
          const curr = fan[i];
          if (
            prev.hitWall &&
            curr.hitWall &&
            Math.hypot(curr.x - prev.x, curr.y - prev.y) < 16
          ) {
            wallHits.push([prev, curr]);
          }
        }

        const coneGrad = ctx.createRadialGradient(gx, gy, 5, gx, gy, g.range);
        coneGrad.addColorStop(0, `rgba(${p.accentRgb}, ${dark ? 0.34 : 0.25})`);
        coneGrad.addColorStop(
          0.55,
          `rgba(${p.accentRgb}, ${dark ? 0.135 : 0.1})`,
        );
        coneGrad.addColorStop(1, `rgba(${p.accentRgb}, 0.01)`);

        ctx.beginPath();
        ctx.moveTo(gx, gy);
        for (const pt of fan) ctx.lineTo(pt.x, pt.y);
        ctx.closePath();
        ctx.fillStyle = coneGrad;
        ctx.fill();

        // Crisp outer sightline border rays
        ctx.strokeStyle = `rgba(${p.accentRgb}, ${dark ? 0.38 : 0.32})`;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(gx, gy);
        ctx.lineTo(fan[0].x, fan[0].y);
        ctx.moveTo(gx, gy);
        ctx.lineTo(fan[fan.length - 1].x, fan[fan.length - 1].y);
        ctx.stroke();

        // Range arcs + subtle outward radar sweep clipped to the occluded cone
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(gx, gy);
        for (const pt of fan) ctx.lineTo(pt.x, pt.y);
        ctx.closePath();
        ctx.clip();

        ctx.strokeStyle = `rgba(${p.accentRgb}, ${dark ? 0.2 : 0.16})`;
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.arc(gx, gy, g.range * 0.52, angle - HALF_FOV, angle + HALF_FOV);
        ctx.stroke();

        const sweepR =
          (((seconds * 0.42 + gi * 0.33) % 1) * 0.85 + 0.15) * g.range;
        const sweepFade = 1 - sweepR / g.range;
        ctx.strokeStyle = `rgba(${p.accentRgb}, ${sweepFade * (dark ? 0.48 : 0.38)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(gx, gy, sweepR, angle - HALF_FOV, angle + HALF_FOV);
        ctx.stroke();

        ctx.restore();
      }

      // 3. Architectural cover walls (hatched drafting geometry + crisp rim)
      for (const wall of WALLS) {
        // Directional contact shadow
        ctx.save();
        roundedRect(ctx, wall.x + 2.5, wall.y + 3.5, wall.w, wall.h, 4);
        ctx.fillStyle = p.shadow;
        ctx.fill();
        ctx.restore();

        // Wall fill + diagonal blueprint hatch
        ctx.save();
        roundedRect(ctx, wall.x, wall.y, wall.w, wall.h, 4);
        ctx.fillStyle = p.wallFill;
        ctx.fill();
        ctx.clip();
        ctx.strokeStyle = p.wallHatch;
        ctx.lineWidth = 1;
        const span = wall.w + wall.h;
        for (let d = -wall.h; d < span; d += 7) {
          ctx.beginPath();
          ctx.moveTo(wall.x + d, wall.y);
          ctx.lineTo(wall.x + d + wall.h, wall.y + wall.h);
          ctx.stroke();
        }
        ctx.restore();

        // Crisp perimeter + top specular bevel
        roundedRect(ctx, wall.x, wall.y, wall.w, wall.h, 4);
        ctx.strokeStyle = p.wallStroke;
        ctx.lineWidth = 1.1;
        ctx.stroke();
        ctx.strokeStyle = p.wallHi;
        ctx.lineWidth = 0.85;
        ctx.beginPath();
        ctx.moveTo(wall.x + 4, wall.y + 0.7);
        ctx.lineTo(wall.x + wall.w - 4, wall.y + 0.7);
        ctx.stroke();
      }

      // Illuminated grazing edges where guard vision rays strike cover walls
      if (wallHits.length) {
        ctx.save();
        ctx.strokeStyle = `rgba(${p.accentRgb}, ${dark ? 0.72 : 0.56})`;
        ctx.lineWidth = 1.65;
        ctx.lineCap = "round";
        ctx.shadowColor = `rgba(${p.accentRgb}, 0.65)`;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        for (let i = 0; i < wallHits.length; i++) {
          const [a, b] = wallHits[i];
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
        ctx.stroke();
        ctx.restore();
      }

      // 4. Golden Sardine pedestal + rotating reticle + pickup sparkle burst
      const pulse = 0.5 + 0.5 * Math.sin(seconds * 3.1);
      ctx.save();
      ctx.translate(SARDINE[0], SARDINE[1]);

      // Outer segmented reticle ring
      ctx.save();
      ctx.rotate(seconds * 0.45);
      ctx.strokeStyle = collected
        ? `rgba(${p.goldRgb}, 0.22)`
        : `rgba(${p.goldRgb}, ${0.46 + pulse * 0.26})`;
      ctx.lineWidth = 1;
      for (let q = 0; q < 4; q++) {
        const a0 = (q * Math.PI) / 2 + 0.2;
        const a1 = a0 + Math.PI / 2 - 0.4;
        ctx.beginPath();
        ctx.arc(0, 0, 16, a0, a1);
        ctx.stroke();
      }
      ctx.restore();

      if (!collected) {
        // Expanding soft gold halo
        ctx.strokeStyle = `rgba(${p.goldRgb}, ${0.3 * (1 - pulse)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, 16 + pulse * 9, 0, Math.PI * 2);
        ctx.stroke();

        // Stylized golden sardine emblem
        ctx.fillStyle = p.gold;
        ctx.shadowColor = `rgba(${p.goldRgb}, 0.8)`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.ellipse(-1.5, 0, 7.8, 3.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(5, 0);
        ctx.lineTo(10, -4.1);
        ctx.lineTo(8.9, 0);
        ctx.lineTo(10, 4.1);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        // Crisp dorsal glint & eye pinpoint
        ctx.fillStyle = p.floor;
        ctx.beginPath();
        ctx.arc(-5.4, -0.8, 0.95, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Captured hollow center pip
        ctx.strokeStyle = `rgba(${p.goldRgb}, 0.42)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, 3.2, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // Pickup shockwave ring + golden sparkle motes
      if (collected) {
        const since = (moveU - COLLECT_U) / 0.17;
        if (since >= 0 && since <= 1) {
          const eased = 1 - Math.pow(1 - since, 3);
          ctx.save();
          ctx.strokeStyle = `rgba(${p.goldRgb}, ${(1 - since) * 0.9})`;
          ctx.lineWidth = 1.7 * (1 - since * 0.5);
          ctx.beginPath();
          ctx.arc(SARDINE[0], SARDINE[1], 11 + eased * 48, 0, Math.PI * 2);
          ctx.stroke();
          // Golden pickup motes
          ctx.fillStyle = `rgba(${p.goldRgb}, ${(1 - since) * 0.95})`;
          for (const mote of SPARKLES) {
            const mx =
              SARDINE[0] + Math.cos(mote.angle) * (8 + eased * mote.dist);
            const my =
              SARDINE[1] + Math.sin(mote.angle) * (8 + eased * mote.dist);
            ctx.beginPath();
            ctx.arc(mx, my, mote.radius * (1 - since * 0.45), 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      }

      // 5. Guard markers (drawn cleanly above cones & walls)
      for (const { gx, gy, angle } of guardStates) {
        ctx.save();
        ctx.translate(gx, gy);
        ctx.rotate(angle);
        ctx.fillStyle = p.guardFill;
        ctx.strokeStyle = p.guardStroke;
        ctx.lineWidth = 1.45;
        ctx.beginPath();
        ctx.arc(0, 0, 6.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Forward directional visor chevron in signal red
        ctx.fillStyle = p.accent;
        ctx.beginPath();
        ctx.moveTo(4.6, 0);
        ctx.lineTo(-2.2, -3.1);
        ctx.lineTo(-1.1, 0);
        ctx.lineTo(-2.2, 3.1);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // 6. Raccoon stealth trail + tactile raccoon token
      const trailSamples = 34;
      const trailSpan = 0.24;
      const pawnAlpha = exiting ? Math.max(0, 1 - exitPulse * 1.4) : 1;

      if (pawnAlpha > 0.02) {
        for (let i = 1; i <= trailSamples; i++) {
          const u0 = Math.max(0, moveU - (trailSpan * i) / trailSamples);
          const u1 = Math.max(0, moveU - (trailSpan * (i - 1)) / trailSamples);
          if (u1 <= 0) break;
          const a = sampleRoute(u0);
          const b = sampleRoute(u1);
          const fade = (1 - i / trailSamples) * pawnAlpha;
          ctx.strokeStyle =
            u1 >= COLLECT_U
              ? `rgba(${p.goldRgb}, ${fade * 0.88})`
              : `rgba(${p.accentRgb}, ${fade * 0.65})`;
          ctx.lineWidth = 1.15 + fade * 2;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        const pos = sampleRoute(moveU);
        ctx.save();
        ctx.globalAlpha = pawnAlpha;
        ctx.translate(pos.x, pos.y);

        // Outer stealth awareness ring
        ctx.strokeStyle = collected
          ? `rgba(${p.goldRgb}, 0.68)`
          : `rgba(${p.accentRgb}, 0.45)`;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.arc(0, 0, 12.2, 0, Math.PI * 2);
        ctx.stroke();

        // Directional raccoon token (ears + luminous body + bandit mask)
        ctx.save();
        ctx.rotate(pos.angle);
        ctx.fillStyle = p.pawn;
        ctx.shadowColor = collected
          ? `rgba(${p.goldRgb}, 0.75)`
          : `rgba(${p.accentRgb}, 0.45)`;
        ctx.shadowBlur = 13;

        // Subtle raccoon ears behind the circular silhouette
        ctx.beginPath();
        ctx.moveTo(-1, -5.4);
        ctx.lineTo(-5.8, -8.8);
        ctx.lineTo(-5.4, -3.2);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-1, 5.4);
        ctx.lineTo(-5.8, 8.8);
        ctx.lineTo(-5.4, 3.2);
        ctx.closePath();
        ctx.fill();

        // Main circular body
        ctx.beginPath();
        ctx.arc(0, 0, 6.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Minimalist raccoon eye-mask band
        ctx.fillStyle = p.pawnMask;
        roundedRect(ctx, 0.2, -4.6, 3.2, 9.2, 1.6);
        ctx.fill();

        // Bright forward nose/gem indicator (turns gold once carrying loot!)
        ctx.fillStyle = collected ? p.gold : p.accent;
        ctx.beginPath();
        ctx.arc(5.1, 0, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Orbiting golden sardine spark while carrying loot to the exit
        if (collected) {
          const orbA = seconds * 3.8;
          const ox = Math.cos(orbA) * 12.2;
          const oy = Math.sin(orbA) * 12.2;
          ctx.fillStyle = p.gold;
          ctx.shadowColor = `rgba(${p.goldRgb}, 0.9)`;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(ox, oy, 2.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        ctx.restore();
      }

      // Exit completion burst ring when escaping
      if (exiting) {
        const eased = 1 - Math.pow(1 - exitPulse, 3);
        ctx.save();
        ctx.strokeStyle = `rgba(${p.accentRgb}, ${(1 - exitPulse) * 0.92})`;
        ctx.lineWidth = 1.9;
        ctx.beginPath();
        ctx.arc(EXIT_POS[0] - 4, EXIT_POS[1], 8 + eased * 42, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Directional exit chevrons inside east wall once unlocked
      if (collected) {
        const chevShift = (seconds * 12) % 6;
        ctx.save();
        ctx.strokeStyle = `rgba(${p.accentRgb}, ${dark ? 0.85 : 0.78})`;
        ctx.lineWidth = 1.3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let k = 0; k < 2; k++) {
          const cx = EXIT_POS[0] - 20 + k * 6 + chevShift * 0.65;
          ctx.beginPath();
          ctx.moveTo(cx - 3, EXIT_POS[1] - 4);
          ctx.lineTo(cx + 1, EXIT_POS[1]);
          ctx.lineTo(cx - 3, EXIT_POS[1] + 4);
          ctx.stroke();
        }
        ctx.restore();
      }

      ctx.restore(); // end interior room clip

      // 7. Outer room perimeter border + precision entry/exit gates
      roundedRect(ctx, ROOM.x, ROOM.y, ROOM.w, ROOM.h, 12);
      ctx.strokeStyle = p.floorEdge;
      ctx.lineWidth = 1.25;
      ctx.stroke();

      // Entry gate (left wall)
      ctx.strokeStyle = p.wallStroke;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(ENTRY_POS[0], ENTRY_POS[1] - 18);
      ctx.lineTo(ENTRY_POS[0], ENTRY_POS[1] + 18);
      ctx.stroke();

      // Exit hatch (right wall: ignites crimson once sardine is collected!)
      ctx.save();
      ctx.strokeStyle = collected ? p.accent : p.wallStroke;
      ctx.lineWidth = collected ? 3.8 : 2.6;
      if (collected) {
        ctx.shadowColor = `rgba(${p.accentRgb}, 0.88)`;
        ctx.shadowBlur = 14;
      }
      ctx.beginPath();
      ctx.moveTo(EXIT_POS[0], EXIT_POS[1] - 22);
      ctx.lineTo(EXIT_POS[0], EXIT_POS[1] + 22);
      ctx.stroke();
      ctx.restore();

      // Precision architectural corner registration brackets
      ctx.strokeStyle = p.label;
      ctx.lineWidth = 1;
      const brk = 8;
      const pad = 7;
      const corners: [number, number, number, number][] = [
        [ROOM.x - pad, ROOM.y - pad, 1, 1],
        [ROOM.x + ROOM.w + pad, ROOM.y - pad, -1, 1],
        [ROOM.x - pad, ROOM.y + ROOM.h + pad, 1, -1],
        [ROOM.x + ROOM.w + pad, ROOM.y + ROOM.h + pad, -1, -1],
      ];
      for (const [cx, cy, sx, sy] of corners) {
        ctx.beginPath();
        ctx.moveTo(cx + sx * brk, cy);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx, cy + sy * brk);
        ctx.stroke();
      }

      ctx.restore();
    };

    const tick = (now: number) => {
      frame = 0;
      draw((now - start) / 1000 + STILL_TIME - 2.1);
      schedule();
    };
    const schedule = () => {
      if (frame || reduced || !visible || !activeRef.current || document.hidden)
        return;
      frame = requestAnimationFrame(tick);
    };
    scheduleRef.current = schedule;

    const renderStill = () => draw(STILL_TIME);
    const refresh = () => {
      resize();
      if (reduced) renderStill();
      else {
        draw((performance.now() - start) / 1000 + STILL_TIME - 2.1);
        schedule();
      }
    };

    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(wrap);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) schedule();
    });
    intersection.observe(wrap);
    const themeObserver = new MutationObserver(() => {
      readTheme();
      if (reduced || !activeRef.current) renderStill();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    const stopMotion = watchMedia(REDUCED_MOTION, () => {
      reduced = matches(REDUCED_MOTION, true);
      if (reduced) {
        cancelAnimationFrame(frame);
        frame = 0;
        renderStill();
      } else {
        schedule();
      }
    });
    const onVisibility = () => {
      if (!document.hidden) schedule();
    };
    document.addEventListener("visibilitychange", onVisibility);
    refresh();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      stopMotion();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="hm-idea-canvas-wrap" ref={wrapRef}>
      <canvas ref={canvasRef} className="hm-idea-canvas" />
    </div>
  );
}
