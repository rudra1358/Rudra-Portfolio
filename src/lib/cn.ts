/** Tiny className joiner — avoids pulling in a dependency for this. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Props that make an external link open safely in a new tab. */
export function externalProps(url: string) {
  return /^https?:\/\//.test(url) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
