import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";

/** Title band at the top of an inner page. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-base">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-brand/12 blur-[120px]"
      />
      <Container>
        <div className="relative max-w-3xl pt-28 pb-16 md:pt-36 md:pb-20">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-[2.9rem] leading-[1.04] font-semibold tracking-tight text-balance text-cream md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">
            {intro}
          </p>
        </div>
      </Container>
    </header>
  );
}
