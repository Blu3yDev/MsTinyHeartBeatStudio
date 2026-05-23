import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[62vh] flex-col items-center justify-center py-28 text-center">
        <Eyebrow center>Error 404</Eyebrow>
        <h1 className="mt-7 font-display text-5xl font-semibold tracking-tight text-balance text-cream md:text-7xl">
          This page missed a beat
        </h1>
        <p className="mt-5 max-w-md leading-relaxed text-pretty text-muted">
          The page you&apos;re looking for isn&apos;t on the floor. Let&apos;s
          get you back to where the music is.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="solid" size="lg">
            Back to Home
          </Button>
          <Button href="/classes" variant="outline" size="lg">
            Browse Classes
          </Button>
        </div>
      </div>
    </Container>
  );
}
