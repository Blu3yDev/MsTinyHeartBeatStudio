import { cn } from "@/lib/cn";

/**
 * Animated ECG / heartbeat trace — echoes the studio's logo motif.
 * The path draws across, then undraws, on a slow loop. The animation
 * is defined in globals.css (`.heartbeat-path` + `--animate-ecg`).
 */
export function HeartbeatLine({
  className,
  ariaHidden = true,
}: {
  className?: string;
  ariaHidden?: boolean;
}) {
  return (
    <svg
      aria-hidden={ariaHidden}
      viewBox="0 0 320 24"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-brand", className)}
    >
      <path
        className="heartbeat-path"
        d="M0 12 H60 L70 12 L78 4 L86 20 L96 8 L104 12 L150 12 L160 12 L168 4 L176 20 L186 8 L194 12 L320 12"
      />
    </svg>
  );
}
