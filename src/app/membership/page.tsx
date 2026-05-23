import { PageHeader } from "@/components/layout/page-header";
import { MembershipPackages } from "@/components/sections/membership-packages";
import { Faq } from "@/components/sections/faq";
import { ClosingCta } from "@/components/sections/closing-cta";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Membership",
  "Membership packages at Heartbeat Dance Studio. Train two or three times a week, or take the full studio.",
);

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="Simple packages, serious training"
        intro="Choose how often you want to dance. Class enrolment is handled through direct contact with the studio team."
      />
      <MembershipPackages tone="base" />
      <Faq
        tone="surface"
        heading={{ eyebrow: "Good to know", title: "Membership questions" }}
      />
      <ClosingCta />
    </>
  );
}
