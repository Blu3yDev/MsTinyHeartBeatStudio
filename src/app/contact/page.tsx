import type { ReactNode } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Faq } from "@/components/sections/faq";
import { ClosingCta } from "@/components/sections/closing-cta";
import { siteConfig } from "@/content/site";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Contact",
  "Contact Heartbeat Latin & Ballroom Dance Studio in Orion Mall, Victoria, Mahé. Call, WhatsApp, or email the studio team.",
);

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Come and find us"
        intro="The studio handles class enquiries and enrolment directly. Reach us whichever way is easiest for you."
      />

      <Section tone="base">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Get in touch"
              title="Reach the studio team"
            />
            <div className="mt-10 border-t border-line">
              <ContactRow label="Call the studio">
                {contact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="block transition-colors hover:text-brand"
                  >
                    {phone}
                  </a>
                ))}
              </ContactRow>
              <ContactRow label="WhatsApp">
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-brand"
                >
                  Message us on WhatsApp
                </a>
              </ContactRow>
              <ContactRow label="Email">
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition-colors hover:text-brand"
                >
                  {contact.email}
                </a>
              </ContactRow>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <aside className="border border-line bg-surface-2 p-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand">
                Visit
              </p>
              <h2 className="mt-3 font-display text-2xl tracking-tight text-cream">
                The studio
              </h2>
              <address className="mt-4 text-sm leading-relaxed text-muted not-italic">
                {contact.address.line1}
                <br />
                {contact.address.line2}
                <br />
                {contact.address.line3}
              </address>
              <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                To enrol, complete the registration form and the team will
                confirm class placement.
              </p>
              <Button href="/register" variant="solid" className="mt-7 w-full">
                Register your interest
              </Button>
            </aside>
          </Reveal>
        </div>
      </Section>

      <Faq
        tone="surface"
        heading={{ eyebrow: "Questions", title: "Before you visit" }}
        limit={4}
      />

      <ClosingCta />
    </>
  );
}

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-line py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-faint">
        {label}
      </span>
      <div className="font-display text-lg text-cream sm:text-right">
        {children}
      </div>
    </div>
  );
}
