import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

/** Any icon component from lucide-react or react-icons. */
export type AnyIcon = LucideIcon | IconType;

export interface SocialLink {
  label: string;
  /** Leave as an empty string to hide the link everywhere on the site. */
  url: string;
  icon: AnyIcon;
}

export interface Project {
  /** Unique, URL-friendly id. */
  id: string;
  title: string;
  /** One or two sentences shown on the card. */
  summary: string;
  /** Paragraphs shown in the project modal. */
  description: string[];
  /** Optional bullet points shown in the modal under "What it does". */
  highlights?: string[];
  technologies: string[];
  /** Free text. New categories automatically appear in the filter bar. */
  category: string;
  /** Optional. Omit (or leave empty) to hide the GitHub button. */
  github?: string;
  /** Optional. Omit (or leave empty) to hide the Live Demo button. */
  live?: string;
  /** Optional path inside /public, e.g. "/projects/wanderlust.webp". */
  image?: string;
  /** Icon shown on the generated cover when no image is provided. */
  icon?: AnyIcon;
  /** Featured projects are listed first and get a "Featured" badge. */
  featured?: boolean;
}

/**
 * Freelance / client work. Kept separate from `Project` (hand-coded work) on purpose,
 * so it is always shown in its own section with an honest note on how it was built.
 */
export interface ClientProject {
  id: string;
  title: string;
  /** Who it was for, e.g. "Concept client — premium café, Ahmedabad". */
  client: string;
  /** e.g. "Client demo", "Delivered", "In progress". */
  status: string;
  summary: string;
  /** What the client gets — shown as a checklist. */
  deliverables: string[];
  technologies: string[];
  /** True when built mainly with AI coding tools. Shows the disclosure badge and note. */
  aiAssisted: boolean;
  /** Short, honest note on how the project was made and what you did yourself. */
  buildNote: string;
  live?: string;
  github?: string;
  /** Path inside /public, e.g. "/projects/aurelia-cafe.webp". */
  image?: string;
  imageAlt?: string;
  /** Optional extra screenshots shown as smaller thumbnails under the main image. */
  gallery?: { src: string; alt: string }[];
}

export interface Skill {
  name: string;
  icon?: AnyIcon;
  /** Brand colour revealed on hover. Omit for monochrome logos. */
  color?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  blurb: string;
  icon: AnyIcon;
  skills: Skill[];
  /** Optional concept tags (no logos), e.g. "Feature Engineering". */
  concepts?: string[];
  /** Makes the card span two columns on large screens. */
  wide?: boolean;
}

export interface Achievement {
  id: string;
  /** e.g. "Certification", "Hackathon", "Webinar". Free text. */
  type: string;
  title: string;
  issuer: string;
  /** Optional, free text such as "September 2025". Hidden when empty. */
  date?: string;
  location?: string;
  description: string;
  points?: string[];
  /** Optional link to a credential, certificate or repo. Hidden when empty. */
  link?: { label: string; url: string };
  icon: AnyIcon;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  university: string;
  /** e.g. "Currently pursuing". Hidden when empty. */
  status?: string;
  /** e.g. "2023 – 2027". Hidden when empty. */
  period?: string;
  /** Optional extra notes such as relevant coursework. */
  notes?: string[];
}
