import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { projects } from "../data/projects";
import type { Project } from "../data/types";
import { cn } from "../lib/cn";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const ALL = "All";

// Featured first; otherwise keep the order from projects.ts.
const ordered = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

export function Projects() {
  const [filter, setFilter] = useState(ALL);
  const [selected, setSelected] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Categories are derived from the data, so new ones appear automatically.
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
    return [[ALL, projects.length] as const, ...Array.from(counts.entries())];
  }, []);

  const visible = filter === ALL ? ordered : ordered.filter((p) => p.category === filter);

  const open = useCallback((p: Project, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelected(p);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    // Return focus to whatever opened the modal.
    window.setTimeout(() => triggerRef.current?.focus({ preventScroll: true }), 0);
  }, []);

  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeading
        id="projects-title"
        index="03"
        eyebrow="Selected Work"
        title={
          <>
            Projects, from <span className="serif-accent font-normal text-accent">notebook</span> to production.
          </>
        }
        lead="Hand-coded machine learning, data analysis and full stack apps. Click a project title for the full story, tech stack and links."
      />

      <LayoutGroup>
        <div
          role="group"
          aria-label="Filter projects by category"
          className="-mx-1 mb-8 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none]"
        >
          {categories.map(([name, count]) => {
            const active = filter === name;
            return (
              <button
                key={name}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(name)}
                className={cn(
                  "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "text-bg" : "text-muted hover:text-fg",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full bg-fg"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">
                  {name}{" "}
                  <span className={cn("ml-1 font-mono text-[11px]", active ? "opacity-70" : "text-subtle")}>
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} index={projects.indexOf(p)} onOpen={open} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <ProjectModal project={selected} onClose={close} />
    </Section>
  );
}
