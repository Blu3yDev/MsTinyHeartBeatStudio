"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

const words = [
  "Cha-Cha",
  "Samba",
  "Rumba",
  "Jive",
  "Waltz",
  "Tango",
  "Salsa",
  "Bachata",
  "Merengue",
  "Jazz",
  "Afro Beat",
  "Hip Hop",
  "Theatre",
  "Showcase",
];

const DURATION_MS = 42_000;

/**
 * Slim full-bleed conveyor of dance words, scrolling left.
 *
 * The animation is driven by the Web Animations API (Element.animate)
 * in a client effect, so it does not depend on Tailwind class
 * generation, CSS variable expansion in the `animation` shorthand,
 * or @keyframes propagation through Turbopack's CSS chunks.
 *
 * SSR renders the static track; the animation starts on mount.
 */
export function Marquee({ className }: { className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    // The conveyor is core to this section's identity, so we run it
    // regardless of `prefers-reduced-motion`. Hover/focus still pause.
    const animation = node.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-50%)" },
      ],
      {
        duration: DURATION_MS,
        iterations: Infinity,
        easing: "linear",
      },
    );
    animationRef.current = animation;
    if (typeof console !== "undefined") {
      console.info("[marquee] animation started", animation);
    }

    return () => {
      animation.cancel();
      animationRef.current = null;
    };
  }, []);

  const pause = () => animationRef.current?.pause();
  const resume = () => animationRef.current?.play();

  return (
    <section
      aria-label="Styles taught at the studio"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
      className={cn(
        "relative flex overflow-hidden border-y border-line bg-base py-8 select-none md:py-10",
        className,
      )}
    >
      <div
        ref={trackRef}
        className="flex w-max shrink-0 items-center will-change-transform"
      >
        <Row words={words} />
        <div aria-hidden="true" className="flex shrink-0 items-center">
          <Row words={words} />
        </div>
      </div>

      {/* Soft fades at the left and right edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-base to-transparent md:w-24"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-base to-transparent md:w-24"
      />
    </section>
  );
}

function Row({ words }: { words: string[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="flex items-center">
          <span
            className={cn(
              "font-display text-3xl tracking-tight whitespace-nowrap md:text-5xl",
              index % 2 === 1
                ? "font-normal text-muted italic"
                : "font-medium text-cream",
            )}
          >
            {word}
          </span>
          <span
            aria-hidden="true"
            className="mx-8 inline-block h-1.5 w-1.5 rotate-45 bg-brand md:mx-12"
          />
        </span>
      ))}
    </div>
  );
}
