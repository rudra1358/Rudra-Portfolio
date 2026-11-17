import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface SectionProps {
  id: string;
  /** "paper" = light band, "ink" = dark band. Both adapt to the global theme. */
  tone?: "paper" | "ink";
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}

export function Section({ id, tone = "paper", className, children, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        tone === "ink" ? "tone-ink" : "tone-paper",
        "relative bg-bg text-fg transition-colors duration-300",
        "py-20 sm:py-28",
        className,
      )}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}
