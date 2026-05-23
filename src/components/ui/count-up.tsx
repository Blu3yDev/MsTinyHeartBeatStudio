"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates an integer from 0 up to `to` once the element scrolls into
 * view. Eased with an ease-out cubic so the count settles smoothly.
 * Respects `prefers-reduced-motion` by snapping straight to the value.
 */
export function CountUp({
  to,
  duration = 1500,
  suffix,
  prefix,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        if (reduce) {
          setValue(to);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(to * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
