import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HeartbeatLine } from "@/components/ui/heartbeat-line";
import { Reveal } from "@/components/ui/reveal";

/** Dark closing call-to-action band, present at the foot of every page. */
export function ClosingCta() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-base">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-brand/12 blur-[140px]"
      />
      <Container>
        <Reveal className="relative py-24 text-center md:py-32">
          <HeartbeatLine className="mx-auto mb-8 h-4 w-48 md:w-64" />
          <Eyebrow center>Your first step</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-cream md:text-6xl">
            Ready to find your rhythm?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-pretty text-muted">
            Register your interest today. Tell us a little about the dancer
            and the studio team will be in touch.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/register" variant="solid" size="lg">
              Register Now
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact the Studio
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
