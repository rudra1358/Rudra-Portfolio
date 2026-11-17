import { Award, Presentation, Rocket } from "lucide-react";
import type { Achievement } from "./types";

/**
 * ADD A CERTIFICATION / ACHIEVEMENT: append one object.
 * `date`, `location`, `points` and `link` are optional and hidden when missing.
 */
export const achievements: Achievement[] = [
  {
    id: "oci-ai-foundations",
    type: "Certification",
    title: "Oracle Cloud Infrastructure AI Foundations Associate",
    issuer: "Oracle",
    description:
      "Oracle's foundational certification covering core artificial intelligence and machine learning concepts, deep learning and generative AI basics, and AI services on Oracle Cloud Infrastructure.",
    // link: { label: "View credential", url: "https://..." },  // TODO: add your badge URL
    icon: Award,
  },
  {
    id: "nasa-space-apps",
    type: "Hackathon",
    title: "NASA Space Apps Challenge",
    issuer: "NASA International Space Apps Challenge",
    location: "Nirma University",
    description: "Participated as part of team Rocket Raccoons at the Nirma University event.",
    points: [
      "Worked on a NASA farm simulator / scheduler concept",
      "The concept was built around an interactive 3D environment",
    ],
    icon: Rocket,
  },
  {
    id: "scalezix-agentic-ai",
    type: "Webinar",
    title: "Exploring the Power of Agentic Models",
    issuer: "Scalezix",
    date: "September 2025",
    description: "Attended a webinar by Scalezix on agentic AI models and how they are being applied.",
    icon: Presentation,
  },
];
