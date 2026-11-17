import { BrainCircuit, CodeXml, Database, Layers, Server, Wrench } from "lucide-react";
import {
  SiAnaconda,
  SiCss,
  SiExpress,
  SiFlask,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJupyter,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiOpenjdk,
  SiPandas,
  SiPython,
  SiReact,
  SiScikitlearn,
} from "react-icons/si";
import { TbApi, TbBrandVscode, TbChartDots, TbChartHistogram, TbSql } from "react-icons/tb";
import type { SkillCategory } from "./types";

/**
 * ADD A TECHNOLOGY: push { name, icon?, color? } into the right category.
 * ADD A CATEGORY: append a new object. The Skills section lays itself out automatically.
 * Icons: https://react-icons.github.io/react-icons (Simple Icons = "Si…").
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    blurb: "The languages I write most of my projects in.",
    icon: CodeXml,
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Java", icon: SiOpenjdk, color: "#E76F00" },
      { name: "JavaScript", icon: SiJavascript, color: "#E9C400" },
      { name: "SQL", icon: TbSql, color: "#3B82F6" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#663399" },
    ],
  },
  {
    id: "ml",
    title: "Machine Learning & Data Science",
    blurb: "From raw data to evaluated models — the part of software I enjoy most.",
    icon: BrainCircuit,
    wide: true,
    skills: [
      { name: "NumPy", icon: SiNumpy, color: "#4DABCF" },
      { name: "Pandas", icon: SiPandas, color: "#E70488" },
      { name: "Matplotlib", icon: TbChartDots, color: "#11557C" },
      { name: "Seaborn", icon: TbChartHistogram, color: "#4C72B0" },
      { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "Jupyter Notebook", icon: SiJupyter, color: "#F37626" },
    ],
    concepts: [
      "Machine Learning fundamentals",
      "Exploratory Data Analysis",
      "Data Preprocessing",
      "Feature Engineering",
      "Model Evaluation",
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    blurb: "Interfaces that are responsive, accessible and quick.",
    icon: Layers,
    skills: [
      { name: "React.js", icon: SiReact, color: "#149ECA" },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss, color: "#663399" },
      { name: "JavaScript", icon: SiJavascript, color: "#E9C400" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    blurb: "APIs and servers that put data and models to work.",
    icon: Server,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express.js", icon: SiExpress },
      { name: "Flask", icon: SiFlask },
      { name: "REST APIs", icon: TbApi, color: "#3B82F6" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    blurb: "Document and relational storage.",
    icon: Database,
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    ],
  },
  {
    id: "tools",
    title: "Developer Tools",
    blurb: "Everyday tooling for writing, tracking and sharing code.",
    icon: Wrench,
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub },
      { name: "VS Code", icon: TbBrandVscode, color: "#007ACC" },
      { name: "Jupyter Notebook", icon: SiJupyter, color: "#F37626" },
      { name: "Anaconda", icon: SiAnaconda, color: "#44A833" },
    ],
  },
];

/** Topics I'm learning next — shown separately so they're never mistaken for existing skills. */
export const currentlyExploring: string[] = ["Deep Learning", "Agentic AI"];

/** Unique technology count across all categories (used in the About stats). */
export const uniqueTechnologyCount = new Set(
  skillCategories.flatMap((c) => c.skills.map((s) => s.name.replace(/\d+$/, "").replace(/\.js$/, "").toLowerCase())),
).size;
