import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { Compass } from "lucide-react";
import { currentlyExploring, skillCategories } from "../data/skills";
import type { Skill } from "../data/types";
import { cn } from "../lib/cn";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

function SkillChip({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <li>
      <motion.span
        tabIndex={0}
        whileHover={{ y: -2 }}
        whileFocus={{ y: -2 }}
        style={{ "--brand": skill.color ?? "var(--accent)" } as CSSProperties}
        className={cn(
          "group/chip flex cursor-default items-center gap-2 rounded-lg border border-line bg-bg px-3 py-2 text-[13px] text-fg",
          "transition-colors duration-200 hover:border-[var(--brand)] focus-visible:border-[var(--brand)]",
        )}
      >
        {Icon ? (
          <Icon
            size={16}
            aria-hidden
            className="shrink-0 text-muted transition-colors duration-200 group-hover/chip:text-[var(--brand)] group-focus-visible/chip:text-[var(--brand)]"
          />
        ) : (
          <span aria-hidden className="grid size-4 place-items-center rounded bg-accent-soft font-mono text-[9px] text-accent">
            {skill.name[0]}
          </span>
        )}
        {skill.name}
      </motion.span>
    </li>
  );
}

export function Skills() {
  return (
    <Section id="skills" tone="ink" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        index="02"
        eyebrow="Skills & Technologies"
        title={
          <>
            The tools I <span className="serif-accent font-normal text-accent">build</span> with.
          </>
        }
        lead="Grouped by where they fit in a project. Hover a technology to bring it into focus."
      />

      <div className="grid grid-flow-dense gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => (
          <Reveal
            key={cat.id}
            delay={(i % 3) * 0.06}
            className={cn(
              "group rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/40 sm:p-7",
              cat.wide && "md:col-span-2",
            )}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{cat.title}</h3>
                <p className="mt-1 text-sm text-muted">{cat.blurb}</p>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:-rotate-6">
                <cat.icon size={19} aria-hidden />
              </span>
            </div>

            <ul className="flex flex-wrap gap-2" aria-label={`${cat.title} technologies`}>
              {cat.skills.map((s) => (
                <SkillChip key={s.name} skill={s} />
              ))}
            </ul>

            {cat.concepts && cat.concepts.length > 0 && (
              <>
                <p className="mt-6 mb-3 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Concepts</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg/90">
                  {cat.concepts.map((c) => (
                    <li key={c} className="flex items-center gap-2">
                      <span aria-hidden className="size-1 rounded-full bg-accent" />
                      {c}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>
        ))}

        {currentlyExploring.length > 0 && (
          <Reveal className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-dashed border-line p-6 sm:p-7 lg:col-span-2">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line text-muted">
                  <Compass size={19} aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">Currently exploring</h3>
                  <p className="mt-1 max-w-md text-sm text-muted">
                    Areas I'm actively learning — not skills I claim yet.
                  </p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2">
                {currentlyExploring.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-fg"
                  >
                    {t} <span className="text-muted">· learning</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
