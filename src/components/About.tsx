import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { achievements } from "../data/achievements";
import { personal } from "../data/personal";
import { projects } from "../data/projects";
import { uniqueTechnologyCount } from "../data/skills";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration: 1.1, ease: "easeOut", onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return <span ref={ref}>{reduce ? to : value}</span>;
}

// Every number here is computed from the data files — nothing is hardcoded.
const stats = [
  { value: projects.length, label: "Projects built", hint: "see them below" },
  { value: uniqueTechnologyCount, label: "Technologies used", hint: "across languages, frameworks & tools" },
  { value: achievements.length, label: "Certifications & events", hint: "Oracle, NASA Space Apps & more" },
  { value: personal.interests.length, label: "Areas of focus", hint: "AI/ML, data & the web" },
];

export function About() {
  const [lead, ...rest] = personal.about;

  return (
    <Section id="about" labelledBy="about-title" className="border-t border-line">
      <SectionHeading
        id="about-title"
        index="01"
        eyebrow="About"
        title={
          <>
            A developer who <span className="serif-accent font-normal text-accent">learns</span> by building.
          </>
        }
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-20">
        <Reveal>
          <p className="text-xl leading-snug font-medium tracking-tight text-pretty sm:text-2xl">{lead}</p>

          <h3 className="mt-10 mb-4 font-mono text-xs tracking-[0.18em] text-muted uppercase">What I focus on</h3>
          <ul className="divide-y divide-line border-y border-line">
            {personal.interests.map((interest) => (
              <li key={interest} className="group flex items-center justify-between py-3 text-[15px]">
                <span className="transition-transform duration-300 group-hover:translate-x-1">{interest}</span>
                <ArrowUpRight
                  size={16}
                  className="text-subtle transition-all duration-300 group-hover:rotate-45 group-hover:text-accent"
                />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="space-y-5 text-base leading-relaxed text-muted sm:text-[17px]">
          {rest.map((p) => (
            <p key={p.slice(0, 24)} className="text-pretty">
              {p}
            </p>
          ))}
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-16 grid grid-cols-2 border-t border-l border-line lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="group border-r border-b border-line p-5 transition-colors duration-300 hover:bg-surface sm:p-7"
          >
            <p className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
              <CountUp to={s.value} />
            </p>
            <p className="mt-3 text-sm font-medium text-fg">{s.label}</p>
            <p className="mt-1 text-xs text-muted">{s.hint}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
