/** Competitions, showcases, examinations, and holiday programmes. */

export type EventCategory = {
  title: string;
  blurb: string;
  items: string[];
};

export const eventCategories: EventCategory[] = [
  {
    title: "Competitions",
    blurb:
      "We prepare Seychellois dancers for local, regional, and international competition floors.",
    items: [
      "WADF-sanctioned competitions",
      "Mdundo International Dance Competition, run with the Botswana Dance Sport Association",
      "Regional & international championships",
      "One-on-one competition preparation",
    ],
  },
  {
    title: "Showcases & Productions",
    blurb:
      "Theme-based shows that put a season of training in front of a live audience.",
    items: [
      "Theme-based production shows",
      "Public recitals at the ICCS, Victoria",
      "Caribbean & Latin extravaganzas featuring salsa, merengue, bachata, ballroom tango, and jive",
      "Full theatre productions",
    ],
  },
  {
    title: "Examinations",
    blurb:
      "A structured path through internationally recognised medal grades and professional levels.",
    items: [
      "Bronze, Silver & Gold medal tests",
      "Professional-level assessments",
      "WADF-sanctioned examinations",
      "Personalised exam preparation",
    ],
  },
  {
    title: "Holiday Camps",
    blurb:
      "School-holiday programmes that mix dance with arts, sport, and youth development.",
    items: [
      "Holiday Dance & Arts Camps (ages 3–17)",
      "Youth Development Camps",
      "Dance Model Programme (showbiz, catwalk & pageantry)",
      "Parent & Child Dance Programme for modelling and talent competitions",
    ],
  },
];

/** Past production themes, used as illustrative examples. */
export const showcaseThemes: string[] = [
  "Aladdin",
  "Back to School",
];

/** What a school-holiday camp day mixes together. */
export const campActivities: string[] = [
  "Dance training",
  "Exhibition preparation",
  "Gymnastics",
  "Swimming",
  "Arts and crafts",
];
