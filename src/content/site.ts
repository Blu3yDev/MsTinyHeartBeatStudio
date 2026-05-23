/**
 * Site-wide identity, navigation, and contact details for
 * Heartbeat Latin & Ballroom Dance Studio, Seychelles.
 *
 * Values flagged "confirm" come from the client information pack and
 * should be verified with the studio before launch.
 */

export type NavLink = {
  label: string;
  href: string;
};

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

export const siteConfig = {
  name: "Heartbeat Latin & Ballroom Dance Studio",
  shortName: "Heartbeat",
  wordmark: "Heartbeat",
  location: "Seychelles",
  established: "2018",
  tagline: "Dance with confidence. Perform with heart.",
  description:
    "Latin, Ballroom, Caribbean, and modern dance for kids, teens, and adults in Seychelles. Whether it is your first class or you are training to compete, there is a place for you on our floor.",
  contact: {
    email: "admin@heartbeatdancestudio.net",
    // confirm: both Seychelles numbers from the client pack
    phones: ["+248 283 7228", "+248 253 5438"],
    primaryPhone: "+248 283 7228",
    primaryPhoneHref: "tel:+2482837228",
    whatsappHref: "https://wa.me/2482837228",
    // confirm: room number (212 vs 215) and whether still in Orion Mall
    address: {
      line1: "Orion Mall, 2nd Floor",
      line2: "Victoria, Mahé",
      line3: "Seychelles",
    },
  },
} as const;

export const navLinks: NavLink[] = [
  { label: "Studio", href: "/studio" },
  { label: "Classes", href: "/classes" },
  { label: "Membership", href: "/membership" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

/**
 * Headline statistics — derived from the studio's published content
 * (programmes, age groups, founding year) so every number is verifiable.
 */
export const stats: Stat[] = [
  { value: 8, suffix: "+", label: "Years on Mahé" },
  { value: 5, label: "Age groups" },
  { value: 15, label: "Dance styles" },
];
