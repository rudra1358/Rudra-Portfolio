import { cn } from "../../lib/cn";

/** Small pill for a technology name. */
export function TechBadge({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[11px] leading-none text-muted",
        "transition-colors duration-200 hover:border-accent/50 hover:text-fg",
        className,
      )}
    >
      {name}
    </span>
  );
}
