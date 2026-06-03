import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionTitle } from "@/components/site/Sections";
import { ScrollText, ShieldCheck, Cookie, FileText } from "lucide-react";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal — TigerHost" },
      { name: "description", content: "Terms of Service, Privacy Policy, Acceptable Use, and Cookie Policy for TigerHost." },
    ],
  }),
  component: LegalPage,
});

const docs = [
  { icon: ScrollText, title: "Terms of Service", desc: "The contract between you and TigerHost. Service levels, billing terms, suspensions, refunds." },
  { icon: ShieldCheck, title: "Privacy Policy", desc: "What we collect, why, who we share it with, and how to request your data or its deletion. GDPR + CCPA compliant." },
  { icon: FileText, title: "Acceptable Use Policy", desc: "What you can and can't run on our infrastructure. Spam, abuse, illegal content, and law enforcement cooperation." },
  { icon: Cookie, title: "Cookie Policy", desc: "First and third-party cookies we set, what they do, and how to opt out." },
  { icon: ScrollText, title: "DMCA / Copyright", desc: "How to file a DMCA notice or counter-notice. Designated agent contact details." },
  { icon: ShieldCheck, title: "Service Level Agreement", desc: "Our 99.99% uptime guarantee, downtime credits, and how compensation is calculated." },
];

function LegalPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur">
          Legal
        </span>
        <h1 className="mt-5 font-display text-5xl font-extrabold md:text-6xl">Plain-English <span className="gradient-text">policies</span></h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          We keep our legal documents short, readable, and human. No 50-page wall of capital letters — just clear answers.
        </p>
      </section>

      <Section>
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {docs.map((d) => (
            <div key={d.title} className="rounded-2xl border border-border/60 bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
                <d.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-display text-lg font-bold">{d.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{d.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Need a copy?" title="Request the full PDF" />
        <div className="mx-auto max-w-2xl rounded-3xl border border-border/60 bg-[var(--gradient-card)] p-8 text-center">
          <p className="text-muted-foreground">
            Enterprise customers and resellers can request signed PDF versions of all of the above, plus our SOC 2 Type II report and ISO 27001 attestation.
          </p>
          <Link to="/contact" className="mt-5 inline-block rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">
            Contact legal
          </Link>
        </div>
      </Section>
    </>
  );
}
