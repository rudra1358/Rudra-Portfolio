import { forwardRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink, Star } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "../data/types";
import { externalProps } from "../lib/cn";
import { ProjectCover } from "./ProjectCover";
import { TechBadge } from "./ui/TechBadge";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project, trigger: HTMLElement) => void;
}

const MAX_BADGES = 4;

export const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(function ProjectCard(
  { project, index, onOpen },
  ref,
) {
  const extra = project.technologies.length - MAX_BADGES;

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-lift"
    >
      {/* The cover is a mouse shortcut to the modal; keyboard users use the title button. */}
      <div className="cursor-pointer" onClick={(e) => onOpen(project, e.currentTarget)} role="presentation">
        <ProjectCover project={project} index={index} className="aspect-[16/9] border-b border-line" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2 font-mono text-[11px] text-muted">
          <span>{project.category}</span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-accent">
              <Star size={10} fill="currentColor" /> Featured
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold tracking-tight">
          <button
            type="button"
            onClick={(e) => onOpen(project, e.currentTarget)}
            aria-haspopup="dialog"
            className="group/title inline-flex items-start gap-1.5 text-left decoration-accent decoration-2 underline-offset-4 hover:underline"
          >
            {project.title}
            <ArrowUpRight
              size={18}
              aria-hidden
              className="mt-1 shrink-0 text-subtle transition-all duration-300 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 group-hover/title:text-accent"
            />
          </button>
        </h3>

        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.slice(0, MAX_BADGES).map((t) => (
            <li key={t}>
              <TechBadge name={t} />
            </li>
          ))}
          {extra > 0 && (
            <li>
              <TechBadge name={`+${extra}`} />
            </li>
          )}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <button
            type="button"
            onClick={(e) => onOpen(project, e.currentTarget)}
            className="text-sm font-medium text-fg underline-offset-4 hover:text-accent hover:underline"
            aria-label={`View details for ${project.title}`}
          >
            View details
          </button>
          <div className="flex items-center gap-1">
            {project.github && (
              <a
                href={project.github}
                {...externalProps(project.github)}
                aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
                title="Source code"
                className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-accent-soft hover:text-fg"
              >
                <SiGithub size={16} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                {...externalProps(project.live)}
                aria-label={`${project.title} live demo (opens in a new tab)`}
                title="Live demo"
                className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-accent-soft hover:text-fg"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
});
