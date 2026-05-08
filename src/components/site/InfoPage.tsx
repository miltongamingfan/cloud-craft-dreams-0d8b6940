import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Section, SectionTitle } from "./Sections";

export type InfoPageProps = {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  body?: { heading: string; text: string }[];
  bullets?: string[];
  ctaPrimary?: { label: string; to: "/buy" | "/pricing" | "/contact" | "/about" };
  ctaSecondary?: { label: string; to: "/buy" | "/pricing" | "/contact" | "/about" };
  icon?: React.ReactNode;
};

export function InfoPage({ eyebrow, title, intro, body = [], bullets = [], ctaPrimary, ctaSecondary, icon }: InfoPageProps) {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-10 text-center">
        {icon && (
          <div className="animate-rise mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--gradient-primary)] shadow-[var(--shadow-glow)]">
            {icon}
          </div>
        )}
        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur">
          {eyebrow}
        </span>
        <h1 className="animate-rise mt-5 font-display text-5xl font-extrabold leading-[1.05] md:text-6xl">{title}</h1>
        <p className="animate-rise mx-auto mt-5 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "0.1s" }}>
          {intro}
        </p>

        {(ctaPrimary || ctaSecondary) && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {ctaPrimary && (
              <Link to={ctaPrimary.to} className="rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">
                {ctaPrimary.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link to={ctaSecondary.to} className="rounded-xl border border-border bg-card/40 px-6 py-3 font-semibold backdrop-blur hover:bg-card/70">
                {ctaSecondary.label}
              </Link>
            )}
          </div>
        )}
      </section>

      {body.length > 0 && (
        <Section className="pt-4">
          <div className="mx-auto grid max-w-4xl gap-4">
            {body.map((b) => (
              <div key={b.heading} className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur">
                <h2 className="font-display text-xl font-bold">{b.heading}</h2>
                <p className="mt-2 text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {bullets.length > 0 && (
        <Section>
          <SectionTitle eyebrow="Highlights" title="What you get" />
          <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
            {bullets.map((b) => (
              <div key={b} className="flex items-start gap-2 rounded-xl border border-border/60 bg-card/40 p-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span className="text-sm">{b}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section>
        <div className="rounded-3xl border border-border/60 bg-[var(--gradient-card)] p-10 text-center md:p-12">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">Ready when you are</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Order in seconds, get setup in minutes. Our team is on Discord 24/7.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/buy" className="inline-flex items-center gap-2 rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/pricing" className="rounded-xl border border-border bg-card/40 px-6 py-3 font-semibold backdrop-blur hover:bg-card/70">
              View plans
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
