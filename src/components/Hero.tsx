import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { findSocial, personal } from "../data/personal";
import { ButtonLink } from "./ui/ButtonLink";
import { HeroCode } from "./HeroCode";

const ease = [0.22, 1, 0.36, 1] as const;

function RotatingRole() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % personal.roles.length), 2600);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative inline-grid h-[1.5em] overflow-hidden align-bottom">
      {/* Screen readers get the full title once instead of a changing word */}
      <span className="sr-only">{personal.title}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          aria-hidden
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease }}
          className="col-start-1 row-start-1 whitespace-nowrap text-accent"
        >
          {personal.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const github = findSocial("GitHub");
  const linkedin = findSocial("LinkedIn");

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: d, ease } }),
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="tone-paper relative isolate overflow-hidden bg-bg pt-28 pb-24 text-fg sm:pt-36 sm:pb-32"
    >
      {/* Background: masked dot grid + a single soft accent wash */}
      <div
        aria-hidden
        className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_35%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] -z-10 size-[38rem] rounded-full bg-[#3B82F6]/10 blur-3xl dark:bg-[#3B82F6]/[0.07]"
      />

      <div className="container-x grid grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          {personal.availability && (
            <motion.p
              variants={item}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {personal.availability}
            </motion.p>
          )}

          <motion.h1
            variants={item}
            initial="hidden"
            animate="show"
            custom={0.08}
            className="flex flex-wrap items-baseline gap-x-2 text-base font-medium text-fg sm:text-lg"
          >
            <span>{personal.name}</span>
            <span aria-hidden className="text-subtle">
              /
            </span>
            <RotatingRole />
          </motion.h1>

          <motion.p
            variants={item}
            initial="hidden"
            animate="show"
            custom={0.16}
            className="mt-5 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-[4.4rem]"
          >
            {personal.headline.before}{" "}
            <span className="serif-accent text-[1.08em] font-normal text-accent">{personal.headline.accent}</span>{" "}
            {personal.headline.after}
          </motion.p>

          <motion.p
            variants={item}
            initial="hidden"
            animate="show"
            custom={0.24}
            className="mt-7 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg"
          >
            {personal.tagline}
          </motion.p>

          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            custom={0.32}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="#projects">
              View my projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            {personal.resume && (
              <ButtonLink href={personal.resume} variant="secondary" download>
                <Download size={16} /> Download résumé
              </ButtonLink>
            )}
            {github && (
              <ButtonLink href={github.url} variant="secondary" aria-label="GitHub profile (opens in a new tab)">
                <github.icon size={16} /> GitHub
              </ButtonLink>
            )}
            {linkedin && (
              <ButtonLink href={linkedin.url} variant="secondary" aria-label="LinkedIn profile (opens in a new tab)">
                <linkedin.icon size={17} /> LinkedIn
              </ButtonLink>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="mx-auto w-full max-w-xl lg:mr-0"
        >
          <HeroCode />
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-muted uppercase transition-colors hover:text-fg md:flex"
      >
        Scroll <ArrowDown size={13} className="animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  );
}
