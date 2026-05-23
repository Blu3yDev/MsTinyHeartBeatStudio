"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * A pointer-tracking radial glow. Drop inside a `relative` parent —
 * the glow listens on that parent and follows the cursor, fading out
 * when the cursor leaves. Pointer-events are off, so it never blocks
 * clicks.
 */
export function CursorGlow({
  className,
  size = 320,
  opacity = 0.22,
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const parent = node.parentElement;
    if (!parent) return;

    // Skip motion when the user prefers reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = parent.getBoundingClientRect();
        node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        node.style.setProperty("--my", `${event.clientY - rect.top}px`);
        node.style.opacity = "1";
      });
    };
    const onLeave = () => {
      node.style.opacity = "0";
    };

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-expo",
        className,
      )}
      style={{
        background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 30%), rgba(216, 31, 46, ${opacity}), transparent 65%)`,
      }}
    />
  );
}
