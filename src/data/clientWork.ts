import type { ClientProject } from "./types";

/**
 * ─────────────────────────────────────────────────────────────
 *  FREELANCE & CLIENT WORK
 *  Shown in its own section, separate from the hand-coded projects in projects.ts.
 *  Set `aiAssisted: true` for anything built mainly with AI coding tools:
 *  the card then shows an "AI-assisted build" badge and the build note.
 * ─────────────────────────────────────────────────────────────
 */
export const clientWork: ClientProject[] = [
  {
    id: "aurelia-cafe",
    title: "Aurelia — Café Website",
    client: "Concept client · Premium café, Sindhu Bhavan, Ahmedabad",
    status: "Client demo",
    summary:
      "A premium, fully responsive website for a café, with a real table-reservation system: requests are emailed to the guest and the owner and logged in the owner's Google Sheet.",
    deliverables: [
      "Brand look & editorial design: typography, palette, photography",
      "Menu in ₹ with bestseller labels, editable from one data file",
      "Reservation form with validation, opening hours and policies",
      "Automatic emails to guest and owner via Gmail SMTP",
      "Every booking saved to Google Sheets with a status dropdown",
      "Privacy Policy & Terms pages, SEO and mobile-first layout",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Nodemailer", "Google Sheets", "Vercel"],
    aiAssisted: true,
    buildNote:
      "Built with AI-assisted development. I wrote the brief, made the design and business decisions, set up Gmail, Google Sheets and Vercel, and tested everything end to end; an AI coding assistant wrote most of the code. It's a concept project for showing clients, not a real café.",
    live: "https://aurelia-cafe-theta.vercel.app",
    github: "https://github.com/rudra1358/aurelia-cafe",
    image: "/projects/aurelia-cafe.webp",
    imageAlt: "Aurelia café website hero: the AURELIA wordmark over a sunlit café interior",
    gallery: [
      { src: "/projects/aurelia-cafe-menu.webp", alt: "Aurelia drinks menu with rupee prices and bestseller labels" },
      { src: "/projects/aurelia-cafe-reservation.webp", alt: "Aurelia reservation form on a dark background" },
    ],
  },
];
