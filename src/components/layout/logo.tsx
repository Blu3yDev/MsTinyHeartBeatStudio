import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { logo } from "@/content/images";

/**
 * Studio logo lockup. Uses the dark-theme variant (black artwork
 * recoloured to cream so the male dancer reads on the near-black
 * stage). `height` is the rendered logo height in px.
 */
export function Logo({
  className,
  height = 40,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 transition-opacity duration-200 hover:opacity-80",
        className,
      )}
    >
      <Image
        src={logo.src}
        alt={`${logo.alt} — home`}
        style={{ height, width: "auto" }}
        className="select-none"
        sizes="240px"
      />
    </Link>
  );
}
