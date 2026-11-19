import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { achievements } from "../data/achievements";
import { externalProps } from "../lib/cn";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

export function Experience() {
  return (
    <Section id="experience" tone="ink" labelledBy="experience-title">
      <SectionHeading
        id="experience-title"
        index="05"
        eyebrow="Certifications & Achievements"
        title={
          <>
            Learning <span className="serif-accent font-normal text-accent">beyond</span> the classroom.
          </>
        }
        lead="Certifications, hackathons and events that have shaped how I approach AI and software."
      />

      <ol className="relative">
        {achievements.map((a, i) => (
          <li key={a.id} className="relative grid grid-cols-1 gap-4 pb-10 last:pb-0 last:[&_.rail]:bottom-auto last:[&_.rail]:h-10 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10">
            {/* Left meta column (desktop) */}
            <Reveal className="hidden pt-6 text-right md:block">
              <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">{a.type}</p>
              {a.date && <p className="mt-1.5 text-sm text-muted">{a.date}</p>}
            </Reveal>

            <Reveal delay={0.05 * i} className="relative md:pl-10">
              {/* Timeline rail + node */}
              <span aria-hidden className="rail absolute top-0 bottom-[-2.5rem] left-0 hidden w-px bg-line md:block" />
              <span
                aria-hidden
                className="absolute top-6 left-0 hidden size-8 -translate-x-1/2 place-items-center rounded-full border border-line bg-bg text-accent md:grid"
              >
                <a.icon size={15} />
              </span>

              <article className="group rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/40 sm:p-7">
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted md:hidden">
                  <span className="tracking-[0.16em] text-accent uppercase">{a.type}</span>
                  {a.date && <span>{a.date}</span>}
                </div>

                <div className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent md:hidden">
                    <a.icon size={18} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg leading-snug font-semibold tracking-tight sm:text-xl">{a.title}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                      <span className="text-fg/85">{a.issuer}</span>
                      {a.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={13} aria-hidden /> {a.location}
                        </span>
                      )}
                      {a.date && (
                        <span className="hidden items-center gap-1 sm:inline-flex md:hidden">
                          <Calendar size={13} aria-hidden /> {a.date}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-[15px] leading-relaxed text-muted">{a.description}</p>

                {a.points && a.points.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {a.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] leading-snug text-fg/90">
                        <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}

                {a.link?.url && (
                  <a
                    href={a.link.url}
                    {...externalProps(a.link.url)}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                  >
                    {a.link.label} <ArrowUpRight size={14} />
                  </a>
                )}
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
