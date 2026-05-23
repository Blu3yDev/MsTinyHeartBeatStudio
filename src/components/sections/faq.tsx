import type { ReactNode } from "react";
import { Section, SectionHeading } from "@/components/layout/section";
import { type Faq as FaqItem, faqs } from "@/content/faqs";

type Heading = { eyebrow: string; title: ReactNode; intro?: ReactNode };

/** Frequently asked questions as a native `<details>` accordion. */
export function Faq({
  id,
  tone = "base",
  heading,
  limit,
}: {
  id?: string;
  tone?: "base" | "surface";
  heading: Heading;
  limit?: number;
}) {
  const items = limit ? faqs.slice(0, limit) : faqs;

  return (
    <Section id={id} tone={tone}>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">
        <SectionHeading {...heading} />
        <div className="border-t border-line">
          {items.map((faq) => (
            <FaqRow key={faq.question} faq={faq} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function FaqRow({ faq }: { faq: FaqItem }) {
  return (
    <details className="group border-b border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-medium tracking-tight text-cream transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
        {faq.question}
        <span
          aria-hidden="true"
          className="grid h-7 w-7 shrink-0 place-items-center border border-line text-muted transition-transform duration-300 ease-expo group-open:rotate-45"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </summary>
      <p className="pr-10 pb-5 leading-relaxed text-muted">{faq.answer}</p>
    </details>
  );
}
