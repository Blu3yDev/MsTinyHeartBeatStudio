import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { RegisterForm } from "@/components/sections/register-form";
import { siteConfig } from "@/content/site";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Register",
  "Register your interest with Heartbeat Latin & Ballroom Dance Studio. Share the dancer's details and the team will confirm class placement.",
);

const steps = [
  "Submit this form with the dancer's details.",
  "The studio confirms class placement and the timetable.",
  "Visit the studio to meet the team and settle in.",
  "Choose a membership package and you're in.",
];

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const defaultPackage =
    typeof params.package === "string" ? params.package : undefined;
  const { contact } = siteConfig;

  return (
    <>
      <PageHeader
        eyebrow="Register"
        title="Register your interest"
        intro="Tell us a little about the dancer and the studio team will be in touch to confirm class placement."
      />

      <Section tone="base">
        <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
          <Reveal>
            <RegisterForm defaultPackage={defaultPackage} />
          </Reveal>

          <aside className="flex flex-col gap-5">
            <Reveal delay={120}>
              <div className="border border-line bg-surface-2 p-7">
                <h2 className="font-display text-xl tracking-tight text-cream">
                  What happens next
                </h2>
                <ol className="mt-5 flex flex-col gap-4">
                  {steps.map((step, index) => (
                    <li key={step} className="flex gap-4 text-sm text-muted">
                      <span className="font-display text-sm text-brand">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="border border-line bg-surface-2 p-7">
                <h2 className="font-display text-xl tracking-tight text-cream">
                  Prefer to talk?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  The studio team is happy to help you choose a class. Reach
                  us directly any time.
                </p>
                <ul className="mt-5 flex flex-col gap-2.5 text-sm">
                  {contact.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="text-cream transition-colors hover:text-brand"
                      >
                        {phone}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={contact.whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cream transition-colors hover:text-brand"
                    >
                      WhatsApp the studio
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="break-all text-cream transition-colors hover:text-brand"
                    >
                      {contact.email}
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  );
}
