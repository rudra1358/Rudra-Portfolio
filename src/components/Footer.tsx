import { ArrowUp } from "lucide-react";
import { navItems } from "../data/navigation";
import { activeSocials, personal } from "../data/personal";
import { externalProps } from "../lib/cn";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="tone-ink border-t border-line bg-bg-alt text-fg">
      <div className="container-x py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {personal.name} — {personal.roles.join(" · ")}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <nav aria-label="Footer">
              <p className="mb-4 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Navigate</p>
              <ul className="space-y-2.5 text-sm">
                {navItems.map((n) => (
                  <li key={n.id}>
                    <a href={`#${n.id}`} className="text-fg/80 transition-colors hover:text-accent">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="mb-4 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Elsewhere</p>
              <ul className="space-y-2.5 text-sm">
                {activeSocials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      {...externalProps(s.url)}
                      className="inline-flex items-center gap-2 text-fg/80 transition-colors hover:text-accent"
                    >
                      <s.icon size={14} aria-hidden /> {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {personal.name}. All rights reserved.
          </p>
          <a href="#home" className="group inline-flex items-center gap-2 transition-colors hover:text-fg">
            Back to top
            <span className="grid size-7 place-items-center rounded-full border border-line transition-transform group-hover:-translate-y-0.5">
              <ArrowUp size={13} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
