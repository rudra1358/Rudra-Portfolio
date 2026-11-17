import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useScrolled } from "../hooks/useScrolled";

/** Floating back-to-top button with a ring that shows reading progress. */
export function BackToTop() {
  const visible = useScrolled(700);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#home"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ y: -3 }}
          className="tone-paper fixed right-5 bottom-5 z-30 grid size-12 place-items-center rounded-full border border-line bg-surface text-fg shadow-lift sm:right-8 sm:bottom-8"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden>
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
          </svg>
          <ArrowUp size={17} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
