/**
 * Central registry of studio photography and brand assets.
 *
 * Files live in `public/Images/`. Importing them statically lets
 * Next.js bundle each asset with its intrinsic width/height and an
 * automatic blur placeholder — no layout shift, no manual dimensions.
 *
 * Each export carries a human alt string so callers stay consistent.
 */

import logoSrc from "../../public/Images/logo-ondark.png";
import founderSrc from "../../public/Images/Founder.png";
import aboutLineupSrc from "../../public/Images/04_about_group_dancers_lineup.png";
import preschoolArtSrc from "../../public/Images/06_preschool_paint_hands_photo.jpg";
import kidsRedDressesSrc from "../../public/Images/07_kids_red_dresses_photo.jpg";
import achievementsSrc from "../../public/Images/12_children_certificates_stage_photo.jpg";
import tutuGroupSrc from "../../public/Images/white_tutu_group.png";
import wadfCertificateSrc from "../../public/Images/19_wadf_certificate_seychelles.png";

import type { StaticImageData } from "next/image";

export type StudioImage = {
  src: StaticImageData;
  alt: string;
};

/** Brand logo — dark-theme variant: black art recoloured to cream,
 *  red kept, background transparent. Original Logo.png is untouched. */
export const logo: StudioImage = {
  src: logoSrc,
  alt: "Heartbeat Latin & Ballroom Dance Studio",
};

/** Founder portrait — supplied on a solid backdrop, framed as a photo. */
export const founder: StudioImage = {
  src: founderSrc,
  alt: "Mrs. Tiny Lindiwe Wazime, founder of Heartbeat Dance Studio",
};

/** Wide torn-edge group photo of the studio's young competitors. */
export const aboutLineup: StudioImage = {
  src: aboutLineupSrc,
  alt: "A line-up of young Heartbeat dancers in the studio",
};

/** Pre-schooler with paint-covered hands during a creative-arts session. */
export const preschoolArt: StudioImage = {
  src: preschoolArtSrc,
  alt: "A young child with painted hands at a creative-arts session",
};

/** Four young dancers in red performance dresses at the studio. */
export const kidsRedDresses: StudioImage = {
  src: kidsRedDressesSrc,
  alt: "Young Heartbeat dancers in red performance dresses",
};

/** Children holding diplomas and trophies on the Heartbeat backdrop. */
export const achievements: StudioImage = {
  src: achievementsSrc,
  alt: "Heartbeat students with their competition diplomas and trophies",
};

/** Group of young dancers in white tutus, on a studio backdrop. */
export const tutuGroup: StudioImage = {
  src: tutuGroupSrc,
  alt: "A group of young Heartbeat dancers in white tutus",
};

/** WADF membership certificate issued to the Seychelles studio. */
export const wadfCertificate: StudioImage = {
  src: wadfCertificateSrc,
  alt: "World Artistic Dance Federation membership certificate for Heartbeat Dance Studio Seychelles",
};
