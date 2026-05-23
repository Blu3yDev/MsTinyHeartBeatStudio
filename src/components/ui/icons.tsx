import type { SVGProps } from "react";

/** Shared line-icon set. All icons inherit `currentColor`. */

function Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </Icon>
  );
}

export function Check(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="m5 12.5 4.5 4.5L19 6.5" />
    </Icon>
  );
}

/** Ascending bars — "a class for every level". */
export function IconLevels(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M5 19v-4" />
      <path d="M12 19V9" />
      <path d="M19 19V5" />
    </Icon>
  );
}

/** Mirrored studio wall — "studios built for dancers". */
export function IconStudio(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="4" y="3" width="7" height="18" rx="1.5" />
      <rect x="13" y="3" width="7" height="18" rx="1.5" />
      <path d="M7.5 7v10M16.5 7v10" />
    </Icon>
  );
}

/** Star — "teachers who still perform". */
export function IconStar(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
    </Icon>
  );
}

/** Two figures — "a community, not a gym". */
export function IconCommunity(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.6" />
      <path d="M17.5 14.3A5.5 5.5 0 0 1 20.5 19" />
    </Icon>
  );
}
