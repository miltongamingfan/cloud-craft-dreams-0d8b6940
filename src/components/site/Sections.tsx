import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Cpu, HardDrive, Shield, Zap, Globe, Headphones, Database, Server, Lock, Gauge } from "lucide-react";
import type { ReactNode } from "react";

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-7xl px-6 py-20 ${className}`}>{children}</section>;
}

export function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
      <h2 className="font-display text-4xl font-bold md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function Hero({
  eyebrow,
  title,
  highlight,
  subtitle,
  primaryHref = "/pricing",
  primaryLabel = "Deploy now",
  secondaryHref = "/contact",
  secondaryLabel = "Talk to sales",
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  primaryHref?: "/pricing" | "/contact" | "/minecraft" | "/cloud" | "/rdp";
  primaryLabel?: string;
  secondaryHref?: "/pricing" | "/contact" | "/minecraft" | "/cloud" | "/rdp";
  secondaryLabel?: string;
}) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-5xl px-6 pt-20 pb-12 text-center md:pt-28">
        <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {eyebrow}
        </div>
        <h1 className="animate-rise mt-6 font-display text-5xl font-extrabold leading-[1.05] md:text-7xl" style={{ animationDelay: "0.1s" }}>
          {title} <span className="gradient-text">{highlight}</span>
        </h1>
        <p className="animate-rise mx-auto mt-6 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "0.2s" }}>
          {subtitle}
        </p>
        <div className="animate-rise mt-10 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "0.3s" }}>
          <Link to={primaryHref} className="group inline-flex items-center gap-2 rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">
            {primaryLabel} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to={secondaryHref} className="rounded-xl border border-border bg-card/40 px-6 py-3 font-semibold backdrop-blur hover:bg-card/70">
            {secondaryLabel}
          </Link>
        </div>
        <div className="animate-rise mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground" style={{ animationDelay: "0.4s" }}>
          <span className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Instant setup</span>
          <span className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> DDoS protected</span>
          <span className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> 99.99% uptime</span>
          <span className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> 24/7 support</span>
        </div>
      </div>
    </section>
  );
}

export function FeatureGrid({ items }: { items: { icon: keyof typeof iconMap; title: string; desc: string }[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => {
        const Icon = iconMap[it.icon];
        return (
          <div
            key={it.title}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-[var(--gradient-card)] p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
            style={{ animation: `rise 0.6s ease-out ${i * 0.05}s both` }}
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

export const iconMap = {
  Cpu, HardDrive, Shield, Zap, Globe, Headphones, Database, Server, Lock, Gauge,
};

export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 rounded-3xl border border-border/60 bg-[var(--gradient-card)] p-8 md:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="text-center">
          <div className="font-display text-4xl font-bold gradient-text">{s.value}</div>
          <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function PlanCard({
  name, price, tagline, features, popular, cta = "Order now",
}: {
  name: string; price: string; tagline: string; features: string[]; popular?: boolean; cta?: string;
}) {
  return (
    <div className={`relative flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 ${popular ? "border-primary bg-[var(--gradient-card)] shadow-[var(--shadow-glow)]" : "border-border/60 bg-card/50"}`}>
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--gradient-primary)] px-3 py-1 text-xs font-semibold text-primary-foreground">
          Most Popular
        </span>
      )}
      <h3 className="font-display text-xl font-bold">{name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{tagline}</p>
      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-display text-4xl font-extrabold">{price}</span>
        <span className="text-sm text-muted-foreground">/mo</span>
      </div>
      <ul className="mt-6 flex-1 space-y-2.5 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/contact"
        className={`mt-6 rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition-transform hover:scale-105 ${popular ? "bg-[var(--gradient-primary)] text-primary-foreground" : "border border-border bg-card hover:bg-secondary"}`}
      >
        {cta}
      </Link>
    </div>
  );
}
