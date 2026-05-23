/**
 * Membership packages. Prices come from the most recent client
 * information and are INDICATIVE — confirm current fees with the
 * studio before launch (the pack lists conflicting figures).
 */

export type Package = {
  name: string;
  price: string;
  cadence: string;
  detail: string;
  features: string[];
  featured: boolean;
};

export const packages: Package[] = [
  {
    name: "Starter",
    price: "SCR 500",
    cadence: "per month",
    detail: "Two classes every week",
    features: ["2 classes per week"],
    featured: false,
  },
  {
    name: "Regular",
    price: "SCR 800",
    cadence: "per month",
    detail: "Three classes every week",
    features: ["3 classes per week"],
    featured: true,
  },
  {
    name: "Full Package",
    price: "SCR 1,250",
    cadence: "per month",
    detail: "Full studio access",
    features: ["All studio classes"],
    featured: false,
  },
];

export const membershipNote =
  "A one-time annual membership fee may apply. Prices are indicative, so please confirm current fees and packages with the studio.";
