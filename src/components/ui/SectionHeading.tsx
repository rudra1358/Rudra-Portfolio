import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
}

/** Editorial section header: numbered eyebrow, large title, optional lead and right-hand slot. */
export function SectionHeading({ id, index, eyebrow, title, lead, aside }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 flex flex-col gap-6 sm:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-muted uppercase">
          <span className="text-accent">{index}</span>
          <span aria-hidden className="h-px w-8 bg-line" />
          {eyebrow}
        </p>
        <h2 id={id} className="text-4xl leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
          {title}
        </h2>
        {lead && <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">{lead}</p>}
      </div>
      {aside}
    </Reveal>
  );
}
