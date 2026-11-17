import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ExternalLink, Star, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "../data/types";
import { ProjectCover } from "./ProjectCover";
import { ButtonLink } from "./ui/ButtonLink";
import { TechBadge } from "./ui/TechBadge";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const FOCUSABLE = "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])";

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape to close, focus trap, and body scroll lock while open.
  useEffect(() => {
    if (!project) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#0B1120]/60 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            // Close only when the press starts on the backdrop itself.
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            aria-describedby="project-modal-desc"
            className="tone-paper relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-line bg-bg text-fg shadow-2xl sm:rounded-3xl"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-full border border-line bg-surface/90 text-fg backdrop-blur transition-colors hover:bg-fg hover:text-bg"
            >
              <X size={17} />
            </button>

            <div className="overflow-y-auto overscroll-contain">
              <ProjectCover project={project} className="h-36 border-b border-line sm:h-44" />

              <div className="p-6 sm:p-8">
                <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted">
                  <span>{project.category}</span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-accent">
                      <Star size={10} fill="currentColor" /> Featured
                    </span>
                  )}
                </div>

                <h2 id="project-modal-title" className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  {project.title}
                </h2>

                <div id="project-modal-desc" className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted">
                  {project.description.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>

                {project.highlights && project.highlights.length > 0 && (
                  <>
                    <h3 className="mt-8 mb-3 font-mono text-xs tracking-[0.16em] text-muted uppercase">What it does</h3>
                    <ul className="space-y-2.5">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-[15px] leading-snug">
                          <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <h3 className="mt-8 mb-3 font-mono text-xs tracking-[0.16em] text-muted uppercase">Built with</h3>
                <ul className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <li key={t}>
                      <TechBadge name={t} className="px-3 py-1.5 text-xs" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-line bg-surface px-6 py-4 sm:px-8">
              {project.github && (
                <ButtonLink href={project.github} variant={project.live ? "secondary" : "primary"}>
                  <SiGithub size={15} /> View on GitHub
                </ButtonLink>
              )}
              {project.live ? (
                <ButtonLink href={project.live}>
                  <ExternalLink size={15} /> Live demo
                </ButtonLink>
              ) : (
                <span className="text-xs text-muted">No live deployment — source code only.</span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
