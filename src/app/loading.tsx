import { HeartbeatLine } from "@/components/ui/heartbeat-line";

/**
 * Route-level loading fallback. Most pages are static and resolve
 * instantly, so this shows only during slower navigations — a calm,
 * on-brand heartbeat trace rather than a spinner.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <HeartbeatLine className="h-5 w-40 md:w-52" />
    </div>
  );
}
