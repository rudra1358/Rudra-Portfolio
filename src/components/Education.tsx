import { GraduationCap } from "lucide-react";
import { education } from "../data/education";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

export function Education() {
  return (
    <Section id="education" labelledBy="education-title">
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
        <SectionHeading
          id="education-title"
          index="06"
          eyebrow="Education"
          title={
            <>
              Where I'm <span className="serif-accent font-normal text-accent">studying</span>.
            </>
          }
        />

        <div className="space-y-4">
          {education.map((e) => (
            <Reveal key={e.id}>
              <article className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
                <div
                  aria-hidden
                  className="dot-grid absolute inset-y-0 right-0 w-1/2 opacity-60 [mask-image:linear-gradient(to_left,black,transparent)]"
                />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#101827] text-[#F8FAFC] transition-transform duration-300 group-hover:-rotate-6 dark:bg-[#F8FAFC] dark:text-[#101827]">
                    <GraduationCap size={22} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {e.status && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[11px] text-accent">
                          <span className="size-1.5 rounded-full bg-accent" /> {e.status}
                        </span>
                      )}
                      {e.period && <span className="font-mono text-xs text-muted">{e.period}</span>}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight">{e.degree}</h3>
                    <p className="mt-1 text-lg text-fg/85">{e.field}</p>

                    <dl className="mt-6 grid gap-4 border-t border-line pt-5 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Institute</dt>
                        <dd className="mt-1 font-medium">{e.institution}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">University</dt>
                        <dd className="mt-1 font-medium">{e.university}</dd>
                      </div>
                    </dl>

                    {e.notes && e.notes.length > 0 && (
                      <ul className="mt-5 list-disc space-y-1 pl-5 text-sm text-muted">
                        {e.notes.map((n) => (
                          <li key={n}>{n}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
