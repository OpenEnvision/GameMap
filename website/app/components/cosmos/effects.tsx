import { useEffect } from "react";
import { FINE_POINTER_MOTION, clamp, matches, watchMedia } from "../../lib/motion";

/** Surfaces that receive the pointer-tracked glow. Markup is never changed:
 *  only CSS custom properties are written to the hovered element's inline style. */
const GLOW_SELECTOR = [
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
const PROPERTIES = ["--mx", "--my", "--tilt-x", "--tilt-y"] as const;
const MAX_TILT = 3;

export function CosmosEffects() {
  useEffect(() => {
    let active: HTMLElement | null = null;
    let rect: DOMRect | null = null;
    let pending: PointerEvent | null = null;
    let frame = 0;
    let attached = false;

    const release = () => {
      if (active) for (const name of PROPERTIES) active.style.removeProperty(name);
      active = null;
      rect = null;
    };
    const paint = () => {
      frame = 0;
      const event = pending;
      pending = null;
      if (!event) return;
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(GLOW_SELECTOR)
          : null;
      if (target !== active) {
        release();
        active = target;
      }
      if (!active) return;
      rect ??= active.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      active.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      active.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
      active.style.setProperty("--tilt-x", `${((x - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`);
      active.style.setProperty("--tilt-y", `${((0.5 - y) * 2 * MAX_TILT).toFixed(2)}deg`);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pending = event;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onScroll = () => {
      rect = null;
    };
    const onLeave = () => {
      pending = null;
      release();
    };
    const attach = () => {
      if (attached) return;
      attached = true;
      document.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("scroll", onScroll, { passive: true, capture: true });
      window.addEventListener("resize", onScroll, { passive: true });
      window.addEventListener("blur", onLeave);
    };
    const detach = () => {
      if (!attached) return;
      attached = false;
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("blur", onLeave);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      onLeave();
    };
    const sync = () => (matches(FINE_POINTER_MOTION) ? attach() : detach());
    sync();
    const unwatch = watchMedia(FINE_POINTER_MOTION, sync);
    return () => {
      unwatch();
      detach();
    };
  }, []);
  return null;
}
