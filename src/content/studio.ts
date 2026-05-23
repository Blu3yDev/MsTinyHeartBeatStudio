/** The studio's story, leadership, examinations, and affiliations. */

export const founder = {
  name: "Mrs. Tiny Lindiwe Wazime",
  role: "Founder & Head Instructor",
  origin: "Originally from Botswana, based in Victoria, Seychelles",
  quote:
    "No words can describe how proud I am. When I opened the studio's doors years ago, this was the vision I started with: to bring international artistic dance to Seychelles, where I had been acquainted with so much potential and talent.",
};

export const vision =
  "Heartbeat was created to bring international artistic dance to Seychelles, and to help local talent grow through structured training, performance opportunities, and competition experience.";

export type Affiliation = {
  abbr: string;
  name: string;
};

/** confirm: verify current membership status before launch. */
export const affiliations: Affiliation[] = [
  { abbr: "WADF", name: "World Artistic Dance Federation" },
  { abbr: "SDSA", name: "Seychelles Dancesport Association" },
];

export type MedalGrade = {
  grade: string;
  levels: number;
};

export const medalGrades: MedalGrade[] = [
  { grade: "Bronze", levels: 4 },
  { grade: "Silver", levels: 4 },
  { grade: "Gold", levels: 4 },
];

export const professionalLevels: string[] = [
  "Student Teacher",
  "Associate",
  "Licentiate",
  "Fellow",
];
