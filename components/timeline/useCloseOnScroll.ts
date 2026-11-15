import { useEffect } from "react";

/** How far the reader has to scroll or swipe before an open view closes. */
const THRESHOLD = 120;

/**
 * Closes an expanded project or photo when the reader scrolls on, so moving
 * to the next pitch never leaves a stale panel open. The dialog locks page
 * scroll, so this listens for the wheel and touch gestures themselves.
 */
export function useCloseOnScroll(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return;
    let travelled = 0;
    let touchY: number | null = null;

    // Gestures inside a panel that can scroll itself (a long bottom sheet)
    // scroll the panel instead of closing it.
    const insideScroller = (target: EventTarget | null) => {
      const panel =
        target instanceof Element && target.closest("[data-scroll-keep]");
      return !!panel && panel.scrollHeight > panel.clientHeight;
    };

    const onWheel = (e: WheelEvent) => {
      if (insideScroller(e.target)) return;
      travelled += Math.abs(e.deltaY);
      if (travelled > THRESHOLD) close();
    };
    const onTouchStart = (e: TouchEvent) => {
      touchY = insideScroller(e.target) ? null : e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null) return;
      if (Math.abs(e.touches[0].clientY - touchY) > THRESHOLD) close();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [open, close]);
}
