import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionTitle } from "@/components/site/Sections";
import { Hexagon, Download, Palette } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/branding")({
  head: () => ({
    meta: [
      { title: "Brand Kit — HexoraCloud" },
      { name: "description", content: "Logos, colors, typography, and usage guidelines for HexoraCloud. Free to use for affiliates, press, and partners." },
    ],
  }),
  component: BrandingPage,
});

const colors = [
  { name: "Primary Indigo", hex: "#6D5BFF", desc: "Buttons, gradients, key UI" },
  { name: "Accent Magenta", hex: "#E94BFF", desc: "Hovers, highlights, CTAs" },
  { name: "Midnight", hex: "#0B0B19", desc: "Background, dark surfaces" },
  { name: "Cloud White", hex: "#F5F5FB", desc: "Foreground text" },
];

function BrandingPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur">
          Brand Assets
        </span>
        <h1 className="mt-5 font-display text-5xl font-extrabold md:text-6xl">The HexoraCloud <span className="gradient-text">brand kit</span></h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Free to use for affiliates, press, partners, and customers. Please don't modify the marks — keep our colors, spacing, and typography intact.
        </p>
      </section>

      <Section>
        <SectionTitle eyebrow="Logos" title="The mark" />
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
          {[
            { bg: "bg-[var(--gradient-card)]", label: "Primary on dark" },
            { bg: "bg-white", label: "Mono on light", invert: true },
            { bg: "bg-[var(--gradient-primary)]", label: "Reversed" },
          ].map((v) => (
            <div key={v.label} className={`group rounded-2xl border border-border/60 ${v.bg} p-10 text-center`}>
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${v.invert ? "bg-[var(--gradient-primary)]" : "bg-white/10"}`}>
                <Hexagon className={`h-8 w-8 ${v.invert ? "text-white" : "text-white"}`} strokeWidth={2.5} />
              </div>
              <div className={`mt-4 text-sm font-semibold ${v.invert ? "text-zinc-900" : ""}`}>{v.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-5 py-2.5 text-sm font-semibold backdrop-blur hover:bg-card/70">
            <Download className="h-4 w-4" /> Download logo pack (SVG + PNG)
          </button>
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Colors" title="The palette" />
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 md:grid-cols-4">
          {colors.map((c) => (
            <div key={c.hex} className="rounded-2xl border border-border/60 bg-card/40 overflow-hidden">
              <div className="h-24" style={{ background: c.hex }} />
              <div className="p-4">
                <div className="font-display text-sm font-bold">{c.name}</div>
                <div className="mt-0.5 font-mono text-xs text-muted-foreground">{c.hex}</div>
                <div className="mt-1.5 text-xs text-muted-foreground">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Typography" title="Type system" />
        <div className="mx-auto max-w-4xl rounded-3xl border border-border/60 bg-[var(--gradient-card)] p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Display</div>
              <div className="mt-1 font-display text-4xl font-extrabold">Space Grotesk</div>
              <div className="mt-1 text-sm text-muted-foreground">Used for headings, hero, and the logo wordmark.</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Body</div>
              <div className="mt-1 text-2xl">DM Sans, Inter</div>
              <div className="mt-1 text-sm text-muted-foreground">Body copy, UI labels, dashboards.</div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-border/60 bg-card/40 p-10 text-center">
          <Palette className="mx-auto h-10 w-10 text-accent" />
          <h2 className="mt-4 font-display text-3xl font-extrabold">Need something custom?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Press kits, lockups for sponsorships, or co-branded creator graphics — reach out and we'll send tailored assets.</p>
          <Link to="/contact" className="mt-6 inline-block rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
            Request press kit
          </Link>
        </div>
      </Section>
    </>
  );
}
