import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, CircleAlert, Copy, LoaderCircle, Send } from "lucide-react";
import { activeSocials, personal } from "../data/personal";
import { cn, externalProps } from "../lib/cn";
import { buttonBase, buttonVariants } from "./ui/ButtonLink";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

type Fields = { name: string; email: string; subject: string; message: string };
type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const empty: Fields = { name: "", email: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(f.email.trim())) errors.email = "Please enter a valid email address.";
  if (!f.subject.trim()) errors.subject = "Please add a subject.";
  if (f.message.trim().length < 10) errors.message = "Message should be at least 10 characters.";
  return errors;
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(personal.email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard blocked — the mailto link still works */
        }
      }}
      className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-fg/30 hover:text-fg"
      aria-label={copied ? "Email copied" : "Copy email address"}
      title={copied ? "Copied!" : "Copy email"}
    >
      {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
    </button>
  );
}

export function Contact() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const hasBackend = personal.contactFormEndpoint.trim() !== "";

  const update = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    if (!hasBackend) {
      // No form backend configured: hand off to the visitor's email client.
      const body = `${fields.message}\n\n— ${fields.name} (${fields.email})`;
      const href = `mailto:${personal.email}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = href;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(personal.contactFormEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setFields(empty);
    } catch {
      setStatus("error");
    }
  }

  const inputCls = (invalid?: string) =>
    cn(
      "w-full rounded-xl border bg-bg px-4 py-3 text-[15px] text-fg placeholder:text-subtle transition-colors",
      "focus:border-accent focus:ring-4 focus:ring-accent-soft focus:outline-none",
      invalid ? "border-red-400/70" : "border-line",
    );

  const field = (key: keyof Fields, label: string, props: Record<string, unknown> = {}, area = false) => (
    <div className={cn(area && "sm:col-span-2")}>
      <label htmlFor={`contact-${key}`} className="mb-2 block text-sm font-medium text-fg">
        {label}
      </label>
      {area ? (
        <textarea
          id={`contact-${key}`}
          name={key}
          rows={5}
          value={fields[key]}
          onChange={update(key)}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `contact-${key}-error` : undefined}
          className={cn(inputCls(errors[key]), "resize-y")}
          {...props}
        />
      ) : (
        <input
          id={`contact-${key}`}
          name={key}
          value={fields[key]}
          onChange={update(key)}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `contact-${key}-error` : undefined}
          className={inputCls(errors[key])}
          {...props}
        />
      )}
      {errors[key] && (
        <p id={`contact-${key}-error`} className="mt-1.5 text-xs text-red-400">
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <Section id="contact" tone="ink" labelledBy="contact-title">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
        <div>
          <SectionHeading
            id="contact-title"
            index="06"
            eyebrow="Contact"
            title={
              <>
                Let's build something <span className="serif-accent font-normal text-accent">useful</span>.
              </>
            }
            lead="Have an internship opportunity, a project idea or a question about my work? I'd be glad to hear from you."
          />

          <Reveal className="space-y-3">
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 sm:p-5">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Email</p>
                <a
                  href={`mailto:${personal.email}`}
                  className="mt-1 block truncate text-base font-medium text-fg hover:text-accent sm:text-lg"
                >
                  {personal.email}
                </a>
              </div>
              <CopyEmail />
            </div>

            {activeSocials
              .filter((s) => s.label !== "Email")
              .map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  {...externalProps(s.url)}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent/40 sm:p-5"
                >
                  <s.icon size={20} className="text-muted transition-colors group-hover:text-fg" aria-hidden />
                  <span className="flex-1">
                    <span className="block font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{s.label}</span>
                    <span className="mt-0.5 block text-[15px] font-medium">
                      {s.url.replace(/^https?:\/\/(www\.)?/, "")}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-subtle transition-all group-hover:rotate-45 group-hover:text-accent"
                    aria-hidden
                  />
                </a>
              ))}
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            noValidate
            onSubmit={onSubmit}
            className="rounded-3xl border border-line bg-surface p-6 sm:p-8"
            aria-describedby="contact-form-note"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {field("name", "Name", { autoComplete: "name", placeholder: "Your name" })}
              {field("email", "Email", { type: "email", autoComplete: "email", placeholder: "you@example.com" })}
              <div className="sm:col-span-2">{field("subject", "Subject", { placeholder: "Internship opportunity" })}</div>
              {field("message", "Message", { placeholder: "Tell me a little about it…" }, true)}
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "sending"}
                className={cn(buttonBase, buttonVariants.primary, "px-6 py-3 disabled:opacity-60")}
              >
                {status === "sending" ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} /> {hasBackend ? "Send message" : "Send via email"}
                  </>
                )}
              </button>
              <p id="contact-form-note" className="text-xs leading-relaxed text-muted sm:max-w-[16rem] sm:text-right">
                {hasBackend
                  ? "Your message is delivered straight to my inbox."
                  : "Opens your email app with the message ready to send."}
              </p>
            </div>

            <AnimatePresence>
              {status !== "idle" && status !== "sending" && (
                <motion.p
                  role="status"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "mt-5 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm",
                    status === "error"
                      ? "border-red-400/40 bg-red-400/10 text-red-300"
                      : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
                  )}
                >
                  {status === "error" ? (
                    <>
                      <CircleAlert size={16} className="mt-0.5 shrink-0" /> Something went wrong. Please email me
                      directly at {personal.email}.
                    </>
                  ) : status === "sent" ? (
                    <>
                      <Check size={16} className="mt-0.5 shrink-0" /> Thanks! Your message has been sent.
                    </>
                  ) : (
                    <>
                      <Check size={16} className="mt-0.5 shrink-0" /> Your email app should now be open with the
                      message filled in. If nothing happened, email me at {personal.email}.
                    </>
                  )}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
