"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type RevealDirection = "up" | "left" | "right" | "scale" | "fade";

/**
 * Fades and lifts its children into view on scroll.
 *
 * The hidden starting state lives in CSS behind a `.js` class on
 * `<html>` (see globals.css). When JavaScript is unavailable the class
 * is never added, so content simply renders visible.
 *
 * `direction` swaps the entry transform: lift, slide from a side, or
 * scale-in. `fade` enters in place without translation.
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: RevealDirection;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          node.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-direction={direction}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
