"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { navLinks, siteConfig } from "@/content/site";

/**
 * Sticky site header. Desktop (`lg`+) shows inline navigation; below
 * that it collapses into a full-height menu panel.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever the route changes. Storing the
  // previous path in state and comparing during render avoids the
  // `setState-in-effect` anti-pattern.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/90 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors duration-200 ease-expo",
                  active ? "text-cream" : "text-muted hover:text-cream",
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-brand transition-transform duration-300 ease-expo",
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href="/register"
            variant="outline"
            size="md"
            className="hidden sm:inline-flex"
          >
            Register
          </Button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 place-items-center border border-line text-cream transition-colors hover:border-cream lg:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </Container>

      {/* Mobile menu — fills the viewport below the header bar. */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 top-20 bottom-0 z-40 flex flex-col overflow-y-auto bg-base px-6 pt-8 pb-10 transition-all duration-300 ease-expo lg:hidden",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0",
        )}
      >
        <nav className="flex flex-col">
          {navLinks.map((link, index) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-baseline gap-4 border-b border-line py-4 font-display text-3xl font-medium tracking-tight transition-colors",
                  active ? "text-brand" : "text-cream hover:text-brand",
                )}
              >
                <span className="font-sans text-xs font-medium text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-4 pt-10">
          <Button
            href="/register"
            variant="solid"
            size="lg"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Register Now
          </Button>
          <a
            href={siteConfig.contact.primaryPhoneHref}
            className="text-center text-sm text-muted transition-colors hover:text-cream"
          >
            Call the studio · {siteConfig.contact.primaryPhone}
          </a>
        </div>
      </div>
    </header>
  );
}

/** Three bars that animate into a close (×) when `open`. */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3 w-5" aria-hidden="true">
      <span
        className={cn(
          "absolute left-0 block h-0.5 w-full bg-cream transition-all duration-300 ease-expo",
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
        )}
      />
      <span
        className={cn(
          "absolute top-1/2 left-0 block h-0.5 w-full -translate-y-1/2 bg-cream transition-opacity duration-200",
          open ? "opacity-0" : "opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute left-0 block h-0.5 w-full bg-cream transition-all duration-300 ease-expo",
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
        )}
      />
    </span>
  );
}
