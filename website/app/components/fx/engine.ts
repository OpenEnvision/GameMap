import { clamp } from "../../lib/motion";

/* Signature interactions. One delegated pointermove listener feeds a single
 * requestAnimationFrame loop that drives every pointer effect: the card glow,
 * the cursor ring and its label pill, magnetic controls and the ambient light.
 * The loop sleeps as soon as everything has settled, never measures more than
 * one card and one control per frame, and only writes transforms or custom
 * properties. Markup is never changed; client-only nodes are passed in. */

/** Surfaces that receive the pointer-tracked glow (foundation.css .surface-card
 *  and the template cards rely on --mx/--my/--tilt-x/--tilt-y). */
export const GLOW_SELECTOR = [
  ".example-card",
  ".resource-tile",
  ".testing-card",
  ".content-card",
  ".catalog-game-card",
  ".catalog-paper-row",
  ".path-card",
  ".demo-card",
  ".category-tile",
  ".docs-start",
  ".docs-home-task",
  ".hero-spotlight",
].join(",");

/** Controls that lean toward the pointer. Templates may opt in with data-magnetic. */
const MAGNET_SELECTOR = [
  ".button-primary",
  ".community-submit-link",
  ".nav-pillar > summary",
  ".global-search",
  "[data-magnetic]",
].join(",");
const NAV_MAGNET = ".nav-pillar > summary";
const BUTTON_TYPES =
  '[type="checkbox"], [type="radio"], [type="range"], [type="submit"], [type="button"], [type="reset"], [type="color"], [type="file"], [type="image"]';
const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  "summary",
  "label",
  "select",
  '[role="button"]',
  '[role="tab"]',
  '[role="link"]',
  '[role="option"]',
  '[role="menuitem"]',
  `input:is(${BUTTON_TYPES})`,
].join(",");
const TEXT_SELECTOR = `textarea, [contenteditable]:not([contenteditable="false"]), input:not(${BUTTON_TYPES})`;
const HIDE_SELECTOR = 'iframe, [data-cursor="hide"]';
const MEDIA_SELECTOR = "img, picture, video, canvas, .game-preview-unavailable";
const GLOW_PROPS = ["--mx", "--my", "--tilt-x", "--tilt-y"] as const;
const MAX_TILT = 3;

/** Spring rates (1/s): higher follows faster. */
const RING_RATE = 26;
const PILL_RATE = 15;
const WARM_RATE = 2.4;
const COOL_RATE = 1.3;
const PILL_GAP_X = 16;
const PILL_GAP_Y = 18;
const MAGNET_RELEASE_MS = 720;

export type CursorIcon = "play" | "code" | "visit" | "download" | "open";
export type CursorLabels = Record<CursorIcon, string>;
const ACCESS_ICONS: Record<string, CursorIcon> = {
  playable: "play",
  source: "code",
  reference: "visit",
};

export interface PointerFxNodes {
  ring: HTMLElement;
  pill: HTMLElement;
  pillLabel: HTMLElement;
  ambient: HTMLElement;
  warm: HTMLElement;
  cool: HTMLElement;
}

type Mode = "idle" | "link" | "media" | "hidden";
type Point = { x: number; y: number };

function follow(point: Point, x: number, y: number, rate: number, dt: number) {
  const k = 1 - Math.exp(-rate * dt);
  point.x += (x - point.x) * k;
  point.y += (y - point.y) * k;
  if (Math.abs(x - point.x) < 0.08 && Math.abs(y - point.y) < 0.08) {
    point.x = x;
    point.y = y;
    return false;
  }
  return true;
}
const move = (node: HTMLElement, point: Point) => {
  node.style.transform = `translate3d(${point.x.toFixed(2)}px, ${point.y.toFixed(2)}px, 0)`;
};

/** Cursor ring, label pill, magnetic controls, card glow and ambient light.
 *  Call only under a fine, hovering pointer without reduced motion. */
export function startPointerFx(
  nodes: PointerFxNodes,
  labels: () => CursorLabels,
) {
  const { ring, pill, pillLabel, ambient, warm, cool } = nodes;
  let px = window.innerWidth / 2,
    py = window.innerHeight / 2;
  const ringAt: Point = { x: px, y: py },
    pillAt: Point = { x: px, y: py },
    warmAt: Point = { x: px, y: py * 0.6 },
    coolAt: Point = { x: px, y: py * 0.6 };
  let seen = false,
    visible = false,
    moved = false,
    rehit = false;
  let target: Element | null = null,
    classified: Element | null = null;
  let frame = 0,
    last = 0;
  let mode: Mode = "idle",
    label = "",
    pillWidth = 0,
    side = 1;
  let glow: HTMLElement | null = null,
    glowRect: DOMRect | null = null;
  let magnet: HTMLElement | null = null,
    magnetRect: DOMRect | null = null;
  const releasing = new Map<HTMLElement, number>();
  const mediaLinks = new WeakMap<Element, boolean>();

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(tick);
  };

  /* --- Card glow --------------------------------------------------------- */
  const releaseGlow = () => {
    if (glow) for (const name of GLOW_PROPS) glow.style.removeProperty(name);
    glow = null;
    glowRect = null;
  };
  const paintGlow = (card: HTMLElement, rect: DOMRect) => {
    if (!rect.width || !rect.height) return;
    const x = clamp((px - rect.left) / rect.width, 0, 1);
    const y = clamp((py - rect.top) / rect.height, 0, 1);
    card.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    card.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    card.style.setProperty(
      "--tilt-x",
      `${((x - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`,
    );
    card.style.setProperty(
      "--tilt-y",
      `${((0.5 - y) * 2 * MAX_TILT).toFixed(2)}deg`,
    );
  };

  /* --- Magnetic controls ------------------------------------------------- */
  const settle = (element: HTMLElement) => {
    releasing.delete(element);
    element.removeAttribute("data-fx-magnet");
    element.style.removeProperty("--fx-mx");
    element.style.removeProperty("--fx-my");
  };
  const acquireMagnet = (element: HTMLElement) => {
    const timer = releasing.get(element);
    if (timer) {
      window.clearTimeout(timer);
      releasing.delete(element);
    }
    magnet = element;
    magnetRect = null;
    element.setAttribute("data-fx-magnet", "");
  };
  const releaseMagnet = () => {
    const element = magnet;
    if (!element) return;
    magnet = null;
    magnetRect = null;
    // CSS transitions the control home; the attribute goes once it has arrived.
    element.style.setProperty("--fx-mx", "0px");
    element.style.setProperty("--fx-my", "0px");
    releasing.set(
      element,
      window.setTimeout(() => settle(element), MAGNET_RELEASE_MS),
    );
  };
  const paintMagnet = (element: HTMLElement, rect: DOMRect) => {
    const nav = element.matches(NAV_MAGNET);
    const strength = nav ? 0.2 : 0.3,
      maxX = nav ? 7 : 14,
      maxY = nav ? 4 : 9;
    const dx = clamp(
      (px - (rect.left + rect.width / 2)) * strength,
      -maxX,
      maxX,
    );
    const dy = clamp(
      (py - (rect.top + rect.height / 2)) * strength,
      -maxY,
      maxY,
    );
    element.style.setProperty("--fx-mx", `${dx.toFixed(2)}px`);
    element.style.setProperty("--fx-my", `${dy.toFixed(2)}px`);
  };

  /* --- Cursor ------------------------------------------------------------ */
  const isMediaLink = (anchor: Element) => {
    let media = mediaLinks.get(anchor);
    if (media === undefined) {
      const rect = anchor.getBoundingClientRect();
      media =
        rect.width >= 140 &&
        rect.height >= 80 &&
        (anchor.matches(GLOW_SELECTOR) ||
          !!anchor.querySelector(MEDIA_SELECTOR));
      mediaLinks.set(anchor, media);
    }
    return media;
  };
  const setMode = (next: Mode, text = "", icon: CursorIcon = "open") => {
    if (next !== mode) {
      if (next === "media" && mode !== "media") {
        // The pill appears where the pointer is instead of flying in.
        pillAt.x = side > 0 ? px + PILL_GAP_X : px - PILL_GAP_X - pillWidth;
        pillAt.y = py + PILL_GAP_Y;
        move(pill, pillAt);
      }
      mode = next;
      ring.dataset.mode = next;
      pill.toggleAttribute("data-on", next === "media");
    }
    if (next === "media") {
      if (text !== label) {
        label = text;
        pillLabel.textContent = text;
        pillWidth = 0;
      }
      if (pill.dataset.icon !== icon) pill.dataset.icon = icon;
    }
  };
  const cursorFor = (element: Element | null) => {
    if (!element) return setMode("idle");
    if (element.closest(HIDE_SELECTOR) || element.matches(TEXT_SELECTOR))
      return setMode("hidden");
    const custom = element.closest<HTMLElement>("[data-cursor-label]");
    if (custom?.dataset.cursorLabel)
      return setMode("media", custom.dataset.cursorLabel, "open");
    const text = labels();
    const cover = element.closest<HTMLElement>("a.example-image");
    if (cover) {
      const kind =
        cover.closest<HTMLElement>("[data-access-kind]")?.dataset.accessKind ??
        "";
      const icon = ACCESS_ICONS[kind] ?? "download";
      return setMode("media", text[icon], icon);
    }
    const control = element.closest(INTERACTIVE_SELECTOR);
    if (control instanceof HTMLAnchorElement && isMediaLink(control))
      return setMode("media", text.open, "open");
    setMode(control ? "link" : "idle");
  };

  /* --- Hover classification (once per new element under the pointer) ---- */
  const classify = (element: Element | null) => {
    classified = element;
    const card = element?.closest<HTMLElement>(GLOW_SELECTOR) ?? null;
    if (card !== glow) {
      releaseGlow();
      glow = card;
    }
    let control = element?.closest<HTMLElement>(MAGNET_SELECTOR) ?? null;
    if (control?.matches(":disabled")) control = null;
    if (control !== magnet) {
      releaseMagnet();
      if (control) acquireMagnet(control);
    }
    cursorFor(element);
  };

  const setVisible = (value: boolean) => {
    if (visible === value) return;
    visible = value;
    ring.toggleAttribute("data-visible", value);
    ambient.toggleAttribute("data-visible", value);
    if (!value) {
      releaseGlow();
      releaseMagnet();
      setMode("idle");
      classified = null;
      ring.removeAttribute("data-pressed");
    }
  };

  /* --- Frame ------------------------------------------------------------- */
  function tick(now: number) {
    frame = 0;
    const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 1 / 60;
    last = now;
    if (visible) {
      if (rehit) {
        rehit = false;
        target = document.elementFromPoint(px, py);
      }
      if (target !== classified || (glow && !glow.isConnected))
        classify(target);
      // Reads first.
      if (moved) {
        if (glow) glowRect ??= glow.getBoundingClientRect();
        if (magnet) magnetRect ??= magnet.getBoundingClientRect();
      }
      if (mode === "media" && !pillWidth) pillWidth = pill.offsetWidth;
      // Then writes.
      if (moved) {
        if (glow && glowRect) paintGlow(glow, glowRect);
        if (magnet && magnetRect) paintMagnet(magnet, magnetRect);
      }
    }
    moved = false;

    let busy = follow(ringAt, px, py, RING_RATE, dt);
    move(ring, ringAt);
    if (mode === "media") {
      const width = window.innerWidth;
      if (side > 0 && px + PILL_GAP_X + pillWidth > width - 12) side = -1;
      else if (side < 0 && px - PILL_GAP_X - pillWidth < 12) side = 1;
      const facing = side > 0 ? "right" : "left";
      if (pill.dataset.side !== facing) pill.dataset.side = facing;
      const x = side > 0 ? px + PILL_GAP_X : px - PILL_GAP_X - pillWidth;
      busy = follow(pillAt, x, py + PILL_GAP_Y, PILL_RATE, dt) || busy;
      move(pill, pillAt);
    }
    // Two lights: a warm one trails the pointer, a cool one drifts opposite.
    const cx = window.innerWidth / 2,
      cy = window.innerHeight / 2;
    busy = follow(warmAt, px, py, WARM_RATE, dt) || busy;
    busy =
      follow(
        coolAt,
        cx + (cx - px) * 0.45,
        cy + (cy - py) * 0.35,
        COOL_RATE,
        dt,
      ) || busy;
    move(warm, warmAt);
    move(cool, coolAt);

    if (busy) schedule();
    else last = 0;
  }

  /* --- Events (all delegated) ------------------------------------------- */
  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    px = event.clientX;
    py = event.clientY;
    target = event.target instanceof Element ? event.target : null;
    if (!seen) {
      seen = true;
      ringAt.x = px;
      ringAt.y = py;
    }
    setVisible(true);
    moved = true;
    schedule();
  };
  const onOut = (event: PointerEvent) => {
    if (event.pointerType === "mouse" && !event.relatedTarget)
      setVisible(false);
  };
  const onDown = (event: PointerEvent) => {
    if (event.pointerType === "mouse") ring.setAttribute("data-pressed", "");
  };
  const onUp = () => ring.removeAttribute("data-pressed");
  const onScroll = () => {
    if (!visible) return;
    // Content moved under a still pointer: measure and hit-test again.
    glowRect = null;
    magnetRect = null;
    rehit = true;
    moved = true;
    schedule();
  };
  const onBlur = () => setVisible(false);

  document.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerout", onOut, { passive: true });
  document.addEventListener("pointerdown", onDown, { passive: true });
  document.addEventListener("pointerup", onUp, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true, capture: true });
  window.addEventListener("resize", onScroll, { passive: true });
  window.addEventListener("blur", onBlur);
  move(ring, ringAt);
  move(warm, warmAt);
  move(cool, coolAt);

  return () => {
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerout", onOut);
    document.removeEventListener("pointerdown", onDown);
    document.removeEventListener("pointerup", onUp);
    window.removeEventListener("scroll", onScroll, { capture: true });
    window.removeEventListener("resize", onScroll);
    window.removeEventListener("blur", onBlur);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    releaseGlow();
    releaseMagnet();
    for (const [element, timer] of releasing) {
      window.clearTimeout(timer);
      settle(element);
    }
  };
}

/** Page-level motion for every pointer type: records where a link was
 *  activated so the view transition can open from that point, and retires the
 *  first-visit intro once the visitor starts moving around. */
export function startPageFx() {
  const root = document.documentElement;
  const retireIntro = () => {
    if (root.getAttribute("data-fx-intro") !== "off")
      root.setAttribute("data-fx-intro", "off");
  };
  const onClick = (event: MouseEvent) => {
    const anchor =
      event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null;
    if (!anchor) return;
    const width = window.innerWidth,
      height = window.innerHeight;
    let x = event.clientX,
      y = event.clientY;
    // Keyboard activation has no coordinates: open from the link itself.
    if (event.detail === 0) {
      const rect = anchor.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }
    x = clamp(x, 0, width);
    y = clamp(y, 0, height);
    const radius = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
    root.style.setProperty("--fx-vt-x", `${Math.round(x)}px`);
    root.style.setProperty("--fx-vt-y", `${Math.round(y)}px`);
    root.style.setProperty("--fx-vt-r", `${Math.ceil(radius + 4)}px`);
    if (anchor.target !== "_blank") retireIntro();
  };
  window.addEventListener("click", onClick, { capture: true });
  // The intro is pure CSS and over after ~1.4s; later pages skip its delays.
  const timer = window.setTimeout(retireIntro, 2600);
  return () => {
    window.removeEventListener("click", onClick, { capture: true });
    window.clearTimeout(timer);
  };
}
