import { personal } from "../data/personal";

export function Logo({ withName = true }: { withName?: boolean }) {
  return (
    <a href="#home" className="group flex items-center gap-2.5" aria-label={`${personal.name} — back to top`}>
      <span className="relative grid size-9 place-items-center rounded-[10px] bg-[#101827] text-[#F8FAFC] ring-1 ring-white/10 transition-transform duration-300 group-hover:-rotate-6 dark:bg-[#F8FAFC] dark:text-[#101827]">
        <span className="serif-accent text-[19px] leading-none lowercase">{personal.initials}</span>
        <span aria-hidden className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-[#3B82F6]" />
      </span>
      {withName && (
        <span className="hidden text-[15px] font-semibold tracking-tight text-fg sm:inline">{personal.name}</span>
      )}
    </a>
  );
}
