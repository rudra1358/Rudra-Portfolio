import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { personal } from "../data/personal";
import { projects } from "../data/projects";
import { currentlyExploring } from "../data/skills";

type Tok = [text: string, cls?: string];

const K = "text-[#C792EA]"; // keyword
const S = "text-[#A5D6A7]"; // string
const F = "text-[#82AAFF]"; // function / class
const C = "text-[#64748B] italic"; // comment
const P = "text-[#94A3B8]"; // punctuation / plain-dim

const list = (items: string[]): Tok[] =>
  items.flatMap((item, i) => [[`"${item}"`, S] as Tok, ...(i < items.length - 1 ? [[", ", P] as Tok] : [])]);

/**
 * A decorative "editor" that types out a small Python class describing the profile.
 * Content is derived from the data files, so it stays in sync.
 */
export function HeroCode() {
  const lines: Tok[][] = useMemo(
    () => [
      [["class ", K], [personal.name.replace(/\s+/g, ""), F], [":", P]],
      [["    "], ["focus", ""], [" = ", P], ["[", P], ...list(["AI/ML", "Data", "Full Stack"]), ["]", P]],
      [["    "], ["stack", ""], [" = ", P], ["[", P], ...list(["Python", "React", "Node.js", "Flask"]), ["]", P]],
      [["    "], ["learning", ""], [" = ", P], ["[", P], ...list(currentlyExploring), ["]", P]],
      [],
      [["    "], ["def ", K], ["build", F], ["(", P], ["self", K], [", idea", ""], ["):", P]],
      [["        "], ["data", ""], [" = ", P], ["explore", F], ["(idea)", P]],
      [["        "], ["model", ""], [" = ", P], ["train", F], ["(data)", P]],
      [["        "], ["return ", K], ["ship", F], ["(model)", P], ["  # → a real, usable app", C]],
    ],
    [],
  );

  const total = useMemo(() => lines.reduce((n, l) => n + l.reduce((m, [t]) => m + t.length, 0) + 1, 0), [lines]);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(total);
      return;
    }
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= total) {
          window.clearInterval(id);
          return c;
        }
        return c + 2;
      });
    }, 22);
    return () => window.clearInterval(id);
  }, [inView, reduce, total]);

  // Slice tokens so only `count` characters are visible.
  let remaining = count;
  let caretLine = lines.length - 1;
  let caretFound = false;
  const rendered = lines.map((line, li) => {
    const lineLen = line.reduce((n, [t]) => n + t.length, 0);
    if (!caretFound && remaining <= lineLen) {
      caretLine = li;
      caretFound = true;
    }
    const out: Tok[] = [];
    let budget = Math.max(remaining, 0);
    for (const [text, cls] of line) {
      if (budget <= 0) break;
      const shown = text.slice(0, budget);
      budget -= shown.length;
      out.push([shown, cls]);
    }
    remaining -= lineLen + 1; // +1 for the newline
    return out;
  });
  const done = count >= total;

  const liveCount = projects.filter((p) => p.live).length;

  return (
    <div ref={ref} className="relative">
      <div className="tone-ink overflow-hidden rounded-2xl border border-white/10 bg-[#0D1424] shadow-[0_30px_80px_-30px_rgba(16,24,39,0.55)] dark:bg-[#141414]">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <span className="font-mono text-[11px] text-[#94A3B8]">profile.py</span>
          <span className="w-10" />
        </div>

        <pre
          className="overflow-x-auto px-4 py-5 font-mono text-[12px] leading-[1.75] text-[#E2E8F0] sm:px-5 sm:text-[13px]"
          aria-label={`Code snippet describing ${personal.name}`}
        >
          <code>
            {rendered.map((toks, i) => (
              <div key={i} className="flex min-h-[1.75em] whitespace-pre">
                <span aria-hidden className="mr-4 inline-block w-4 shrink-0 text-right text-[#475569] select-none">
                  {i + 1}
                </span>
                <span>
                  {toks.map(([t, cls], j) => (
                    <span key={j} className={cls}>
                      {t}
                    </span>
                  ))}
                  {i === caretLine && (
                    <span aria-hidden className="caret ml-px inline-block h-[1.1em] w-[7px] translate-y-[3px] bg-[#60A5FA]" />
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>

        <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-2 font-mono text-[10.5px] text-[#64748B]">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400/80" /> {done ? "ready" : "typing…"}
          </span>
          <span>Python · UTF-8</span>
        </div>
      </div>

      {/* Floating stat chip — numbers come straight from projects.ts */}
      <div className="tone-paper absolute -bottom-6 -left-4 hidden rounded-xl border border-line bg-surface px-4 py-3 shadow-lift sm:block">
        <p className="font-mono text-[10px] tracking-widest text-muted uppercase">Portfolio</p>
        <p className="mt-0.5 text-sm font-semibold text-fg">
          {projects.length} projects <span className="text-muted">·</span> {liveCount} live demos
        </p>
      </div>
    </div>
  );
}
