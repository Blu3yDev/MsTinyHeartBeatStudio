import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HeartbeatLine } from "@/components/ui/heartbeat-line";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight } from "@/components/ui/icons";
import { siteConfig, stats } from "@/content/site";
import { tutuGroup } from "@/content/images";

/** Landing hero — dramatic display type over a dark stage. */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Oversized faint wordmark behind the content. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[18%] font-display text-[26vw] leading-none font-semibold whitespace-nowrap text-cream/[0.035] select-none"
      >
        {siteConfig.wordmark}
      </span>

      {/* Warm red glow — drifts slowly while gently breathing. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 animate-drift"
      >
        <div className="h-[42rem] w-[42rem] animate-pulse-glow rounded-full bg-brand/12 blur-[150px]" />
      </div>

      {/* Cursor-following light, restricted to the hero. */}
      <CursorGlow size={420} opacity={0.18} />

      <Container className="relative">
        <div className="pt-20 pb-20 md:pt-28 md:pb-28">
          <Reveal>
            <Eyebrow>Mahé · Seychelles</Eyebrow>
          </Reveal>

          <h1 className="mt-8 font-display text-[clamp(3rem,8.5vw,7rem)] leading-[1] font-semibold tracking-[-0.02em] text-balance">
            <Reveal>
              <span className="block">
                Dance with <span className="italic">Confidence.</span>
              </span>
            </Reveal>
            <Reveal delay={140}>
              <span className="block">
                Perform with <span className="text-brand">Heart.</span>
              </span>
            </Reveal>
          </h1>

          <Reveal delay={280} className="mt-7">
            <HeartbeatLine className="h-3.5 w-44 md:w-56" />
          </Reveal>

          <Reveal
            delay={360}
            className="mt-12 grid gap-12 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end"
          >
            <div>
              <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
                {siteConfig.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/classes" variant="outline" size="lg">
                  Explore Programmes
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover/btn:translate-x-1" />
                </Button>
                <Button href="/register" variant="ghost" size="lg">
                  Register
                </Button>
              </div>

              <dl className="mt-12 flex gap-9 md:gap-12">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-display text-4xl font-semibold tracking-tight text-cream md:text-5xl">
                      <CountUp to={stat.value} suffix={stat.suffix} />
                    </dt>
                    <dd className="mt-2 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-muted">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Studio dancers — transparent cutout, gently floating. */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 animate-pulse-glow rounded-full bg-brand/18 blur-[90px]"
              />
              <Image
                src={tutuGroup.src}
                alt={tutuGroup.alt}
                sizes="(max-width: 1024px) 90vw, 26rem"
                className="relative h-auto w-full animate-float motion-reduce:animate-none"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
