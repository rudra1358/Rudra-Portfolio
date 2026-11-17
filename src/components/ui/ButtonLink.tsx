import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn, externalProps } from "../../lib/cn";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg hover:bg-accent hover:text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]",
  secondary: "border border-line bg-surface text-fg hover:border-fg/40",
  ghost: "text-fg hover:bg-accent-soft",
};

export const buttonBase =
  "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] whitespace-nowrap";

/** Link styled as a button. External URLs automatically open in a new tab with safe rel attributes. */
export function ButtonLink({ href, variant = "primary", className, children, ...rest }: ButtonLinkProps) {
  return (
    <a href={href} {...externalProps(href)} className={cn(buttonBase, variants[variant], className)} {...rest}>
      {children}
    </a>
  );
}

export const buttonVariants = variants;
