import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { navLinks, siteConfig } from "@/content/site";

/** Site footer — identity, navigation, and contact details. */
export function Footer() {
  const year = new Date().getFullYear();
  const { contact } = siteConfig;

  return (
    <footer className="border-t border-line bg-base">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo height={56} />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              International artistic dance training in Seychelles, for kids,
              teens, and adults.
            </p>
          </div>

          <div className="lg:col-span-2">
            <FooterHeading>Explore</FooterHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <FooterHeading>Visit</FooterHeading>
            <address className="mt-5 text-sm leading-relaxed text-muted not-italic">
              {contact.address.line1}
              <br />
              {contact.address.line2}
              <br />
              {contact.address.line3}
            </address>
          </div>

          <div className="lg:col-span-3">
            <FooterHeading>Get in touch</FooterHeading>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-muted">
              {contact.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-brand"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-brand"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-brand"
                >
                  WhatsApp the studio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-7 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Victoria, Mahé · Seychelles</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cream">
      {children}
    </h3>
  );
}
