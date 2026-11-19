import { ArrowRight, Briefcase, Check, ExternalLink, Info, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { clientWork } from "../data/clientWork";
import type { ClientProject } from "../data/types";
import { ButtonLink } from "./ui/ButtonLink";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { TechBadge } from "./ui/TechBadge";

/**
 * Freelance & client work — deliberately separate from the hand-coded Projects section,
 * with a clear disclosure for AI-assisted builds.
 */
export function ClientWork() {
  if (clientWork.length === 0) return null;

  return (
    <section
      id="client-work"
      aria-labelledby="client-work-title"
      className="tone-paper relative border-y border-line bg-bg-alt py-20 text-fg transition-colors duration-300 sm:py-28"
    >
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="container-x relative">
        <SectionHeading
          id="client-work-title"
          index="04"
          eyebrow="Freelance & Client Work"
          title={
            <>
              Websites built <span className="serif-accent font-normal text-accent">for clients</span>.
            </>
          }
          lead="Production-ready websites for small businesses, built fast with AI-assisted development. They're listed here, separately from my hand-coded projects above."
          aside={
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent/50 md:self-end"
            >
              <Briefcase size={15} className="text-accent" aria-hidden />
              Available for freelance
              <ArrowRight size={14} aria-hidden />
            </a>
          }
        />

        <div className="flex flex-col gap-8">
          {clientWork.map((p) => (
            <ClientCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientCard({ project: p }: { project: ClientProject }) {
  return (
    <Reveal>
      <article
        aria-labelledby={`${p.id}-title`}
        className="group grid overflow-hidden rounded-3xl border border-line bg-surface shadow-card lg:grid-cols-[1.1fr_1fr]"
      >
        {/* Screenshots */}
        <div className="flex flex-col gap-3 border-b border-line bg-bg-alt p-3 sm:p-4 lg:justify-center lg:border-r lg:border-b-0 lg:p-6">
          <figure className="relative m-0 overflow-hidden rounded-2xl border border-line">
            {p.image ? (
              <img
                src={p.image}
                alt={p.imageAlt ?? `Screenshot of ${p.title}`}
                loading="lazy"
                decoding="async"
                width={1280}
                height={800}
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="aspect-[16/10]" />
            )}
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#0B1120]/75 px-3 py-1 font-mono text-[11px] text-white backdrop-blur">
              <Briefcase size={12} aria-hidden /> Freelance
            </span>
          </figure>
          {p.gallery && p.gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {p.gallery.map((g) => (
                <figure key={g.src} className="m-0 overflow-hidden rounded-xl border border-line">
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={500}
                    className="aspect-[16/10] w-full object-cover"
                  />
                </figure>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[11px]">
            <span className="rounded-full border border-line px-2.5 py-1 text-muted">{p.status}</span>
            {p.aiAssisted && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-accent">
                <Sparkles size={12} aria-hidden /> AI-assisted build
              </span>
            )}
          </div>

          <h3 id={`${p.id}-title`} className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {p.title}
          </h3>
          <p className="mt-1.5 text-sm text-muted">{p.client}</p>

          <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.summary}</p>

          <h4 className="mt-6 mb-3 font-mono text-xs tracking-[0.16em] text-muted uppercase">What the client gets</h4>
          <ul className="grid gap-2 sm:grid-cols-2">
            {p.deliverables.map((d) => (
              <li key={d} className="flex gap-2.5 text-sm leading-snug">
                <Check size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                {d}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
            {p.technologies.map((t) => (
              <li key={t}>
                <TechBadge name={t} />
              </li>
            ))}
          </ul>

          {p.aiAssisted && (
            <div role="note" className="mt-6 flex gap-3 rounded-2xl border border-dashed border-line bg-bg-alt p-4 text-[13px] leading-relaxed text-muted">
              <Info size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <p>
                <span className="font-medium text-fg">How this was built: </span>
                {p.buildNote}
              </p>
            </div>
          )}

          <div className="mt-auto flex flex-wrap gap-3 pt-7">
            {p.live && (
              <ButtonLink href={p.live} aria-label={`${p.title} — live site (opens in a new tab)`}>
                <ExternalLink size={15} aria-hidden /> Live site
              </ButtonLink>
            )}
            {p.github && (
              <ButtonLink
                href={p.github}
                variant="secondary"
                aria-label={`${p.title} — source code on GitHub (opens in a new tab)`}
              >
                <SiGithub size={15} aria-hidden /> Source
              </ButtonLink>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
