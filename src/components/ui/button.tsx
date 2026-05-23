import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "md" | "lg";

const baseClasses =
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden font-medium uppercase tracking-[0.16em] transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-expo will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100";

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    "bg-brand text-cream hover:bg-brand-bright hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-14px_rgba(216,31,46,0.7)] motion-reduce:hover:translate-y-0",
  outline:
    "border border-cream/25 text-cream hover:border-cream hover:bg-cream hover:text-base hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
  ghost: "text-cream hover:text-brand",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-6 text-[0.7rem]",
  lg: "h-14 px-8 text-xs",
};

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** When set, renders a link. Internal paths use `next/link`; URLs,
   *  `mailto:`, `tel:`, and `#` anchors render a plain `<a>`. */
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}

/** Rectangular, uppercase call-to-action. Polymorphic on `href`. */
export function Button({
  variant = "solid",
  size = "md",
  href,
  type = "button",
  onClick,
  disabled,
  ariaLabel,
  className,
  children,
}: ButtonProps) {
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    const isPlainAnchor = /^(https?:|mailto:|tel:|#)/.test(href);

    if (isPlainAnchor) {
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          onClick={onClick}
          aria-label={ariaLabel}
          className={classes}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
}
