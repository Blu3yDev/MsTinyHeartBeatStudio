"use client";

import { useEffect, useRef } from "react";

/**
 * Thin red progress bar fixed to the top of the viewport, scaling from
 * left to right as the user scrolls the document. DOM is mutated
 * directly (no React state) so it never triggers a re-render.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const range = root.scrollHeight - root.clientHeight;
      const progress = range > 0 ? root.scrollTop / range : 0;
      node.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left"
    >
      <div
        ref={ref}
        className="h-full origin-left bg-gradient-to-r from-brand via-brand-bright to-brand"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
