import { categoryColors, fallbackProjectIcon } from "../data/projects";
import type { Project } from "../data/types";
import { cn } from "../lib/cn";

/**
 * Card / modal artwork. Uses `project.image` when provided; otherwise renders a
 * generated cover from the project's icon and category colour, so new projects
 * look finished even without a screenshot.
 */
export function ProjectCover({ project, index, className }: { project: Project; index?: number; className?: string }) {
  const hue = categoryColors[project.category] ?? categoryColors.default;

  if (project.image) {
    return (
      <div className={cn("relative overflow-hidden bg-bg-alt", className)}>
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const Icon = project.icon ?? fallbackProjectIcon;

  return (
    <div
      aria-hidden
      className={cn("relative isolate overflow-hidden", className)}
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, ${hue} 14%, var(--surface)) 0%, color-mix(in srgb, ${hue} 4%, var(--surface)) 100%)`,
      }}
    >
      <div
        className="absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, color-mix(in srgb, ${hue} 35%, transparent) 1px, transparent 0)`,
          backgroundSize: "18px 18px",
        }}
      />
      {/* oversized, cropped icon as a graphic */}
      <Icon
        strokeWidth={1}
        className="absolute -right-6 -bottom-8 size-40 transition-transform duration-700 ease-out group-hover:-translate-y-1 group-hover:-rotate-6"
        style={{ color: `color-mix(in srgb, ${hue} 45%, transparent)` }}
      />
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span
          className="grid size-9 place-items-center rounded-lg text-white shadow-sm"
          style={{ background: hue }}
        >
          <Icon size={18} />
        </span>
      </div>
      <span className="absolute bottom-4 left-4 font-mono text-[11px] text-muted">~/{project.id}</span>
      {index !== undefined && (
        <span className="absolute top-4 right-4 font-mono text-[11px] text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}
