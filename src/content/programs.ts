/** Dance styles, programmes, and the structure of training. */

export type StyleGroup = {
  name: string;
  blurb: string;
  styles: string[];
};

export const styleGroups: StyleGroup[] = [
  {
    name: "Latin & Ballroom",
    blurb:
      "Our most competitive classes, covering the full international Latin and Ballroom syllabus, from footwork and partnering through to performance.",
    styles: ["Cha-Cha", "Samba", "Rumba", "Jive", "Waltz", "Tango"],
  },
  {
    name: "Caribbean",
    blurb:
      "The social dances people learn to enjoy at parties and on a night out, taught from the ground up.",
    styles: ["Salsa", "Bachata", "Merengue"],
  },
  {
    name: "Modern & Performance",
    blurb:
      "Built around performance, from contemporary technique through to full theatre productions.",
    styles: [
      "Contemporary",
      "Jazz",
      "Afro Beat",
      "Hip Hop",
      "Traditional Dance",
      "Theatre Productions",
    ],
  },
];

/** Additional programmes beyond the weekly class styles. */
export const programmes: string[] = [
  "Dance Fitness",
  "Private Lessons",
  "Performance Training",
  "Competition Preparation",
  "Medal Test Preparation",
  "Holiday Dance & Arts Camps",
  "Youth Development Camps",
  "Dance Model Programme (showbiz, catwalk & pageantry)",
  "Parent & Child Dance Programme",
];

export type AgeGroup = {
  name: string;
  age: string;
  type: string;
};

export const ageGroups: AgeGroup[] = [
  { name: "Mini Kids", age: "4 – 6 years", type: "Pre-school" },
  { name: "Tiny Tots", age: "7 – 9 years", type: "After-school" },
  { name: "Juveniles", age: "10 – 12 years", type: "After-school" },
  { name: "Juniors", age: "13 – 15 years", type: "After-school" },
  { name: "Youth & Adults", age: "16+ years", type: "After-school & after-work" },
];

export const classFormats: string[] = [
  "Solo",
  "Duo",
  "Trio",
  "Group",
  "Private Lessons",
];

export const classLevels: string[] = ["Beginner", "Intermediate", "Advanced"];
