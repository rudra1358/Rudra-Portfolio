import { Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { TbBrandLinkedin } from "react-icons/tb";
import type { SocialLink } from "./types";

/**
 * Central place for personal details.
 * Every section of the site reads from here — edit this file, not the components.
 */
export const personal = {
  name: "Rudra Patel",
  initials: "RP",
  title: "Computer Science Student | Aspiring AI/ML Engineer | Full Stack Developer",
  roles: ["Computer Science Student", "Aspiring AI/ML Engineer", "Full Stack Developer"],

  headline: {
    // Rendered as: "Building ideas into <accent> digital experiences."
    before: "Building ideas into",
    accent: "intelligent",
    after: "digital experiences.",
  },
  tagline:
    "I enjoy building software applications, exploring machine learning, working with data, and developing solutions that combine technology with real-world problems.",

  /** Shown as a small status pill in the hero. Set to "" to hide. */
  availability: "Open to internship opportunities",

  email: "rudra300806@gmail.com",

  /**
   * Résumé: drop a PDF into /public/resume/ and set the path, e.g.
   * "/resume/Rudra-Patel-Resume.pdf". Leave "" to hide the button.
   */
  resume: "",

  /**
   * Optional form backend (e.g. a Formspree endpoint such as
   * "https://formspree.io/f/xxxxxxx"). When empty, the contact form opens the
   * visitor's email app with the message pre-filled (mailto).
   */
  contactFormEndpoint: "",

  siteUrl: "https://rudra-patel-portfolio.rudra1358.workers.dev",

  about: [
    "I'm a Computer Science and Engineering student at New LJIET (Gujarat Technological University) who likes turning ideas into software people can actually use.",
    "Most of my recent work sits where data meets software. I take a dataset from exploration and cleaning through feature engineering, model training and evaluation, then wrap the result in a Flask or Streamlit app so it is usable outside a notebook.",
    "On the web side I build with React and the MERN stack — from small React apps to a full-stack listings platform with authentication, maps and image hosting.",
    "I learn best by building. Right now I'm strengthening my machine learning fundamentals and starting to explore deep learning and agentic AI.",
  ],

  interests: [
    "Applied machine learning",
    "Data analysis & visualisation",
    "Full stack web development",
    "Software for real-world problems",
  ],
};

/**
 * Social links. An empty `url` hides that link everywhere (hero, contact, footer).
 * Add more by appending objects — e.g. { label: "X", url: "...", icon: SiX }.
 */
export const socials: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/rudra1358", icon: SiGithub },
  { label: "LinkedIn", url: "", icon: TbBrandLinkedin }, // TODO: add your LinkedIn URL
  { label: "Email", url: `mailto:${personal.email}`, icon: Mail },
];

export const activeSocials = socials.filter((s) => s.url.trim() !== "");
export const findSocial = (label: string) => activeSocials.find((s) => s.label === label);
