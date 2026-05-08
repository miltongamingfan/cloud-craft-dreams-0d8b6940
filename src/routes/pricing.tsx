import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionTitle, PlanCard } from "@/components/site/Sections";
import { useState } from "react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — HexoraCloud" },
      { name: "description", content: "Transparent pricing for Minecraft, Cloud VPS, and Windows RDP. Pay monthly, no lock-in." },
    ],
  }),
  component: PricingPage,
});

const plans = {
  minecraft: [
    { name: "Dirt", price: "$2.50", tagline: "Up to 10 players", features: ["2 GB RAM", "10 GB NVMe", "Vanilla / Paper", "Free subdomain"] },
    { name: "Iron", price: "$5", tagline: "Up to 25 players", features: ["4 GB RAM", "30 GB NVMe", "Modpacks", "MySQL DB"] },
    { name: "Diamond", price: "$9", popular: true, tagline: "Up to 60 players", features: ["6 GB RAM", "60 GB NVMe", "Ryzen 9", "Premium DDoS", "Daily backups"] },
    { name: "Netherite", price: "$24", tagline: "200+ players", features: ["16 GB RAM", "200 GB NVMe", "Dedicated cores", "BungeeCord", "Hourly backups"] },
  ],
  cloud: [
    { name: "Cloud S", price: "$5", tagline: "Side projects", features: ["1 vCPU", "2 GB RAM", "30 GB NVMe", "1 TB transfer"] },
    { name: "Cloud M", price: "$12", tagline: "Production apps", features: ["2 vCPU", "4 GB RAM", "80 GB NVMe", "3 TB transfer"] },
    { name: "Cloud L", price: "$28", popular: true, tagline: "Growing teams", features: ["4 vCPU", "8 GB RAM", "160 GB NVMe", "6 TB transfer", "Priority I/O"] },
    { name: "Cloud XL", price: "$58", tagline: "Heavy workloads", features: ["8 vCPU", "16 GB RAM", "320 GB NVMe", "10 TB transfer"] },
  ],
  rdp: [
    { name: "RDP Lite", price: "$8", tagline: "Forex VPS", features: ["2 vCPU", "4 GB RAM", "50 GB NVMe", "Win Server 2019"] },
    { name: "RDP Pro", price: "$18", popular: true, tagline: "Power users", features: ["4 vCPU", "8 GB RAM", "120 GB NVMe", "Admin access"] },
    { name: "RDP GPU", price: "$79", tagline: "Render & AI", features: ["8 vCPU", "16 GB RAM", "RTX A4000", "240 GB NVMe"] },
    { name: "RDP Max", price: "$149", tagline: "Studio grade", features: ["16 vCPU", "32 GB RAM", "RTX A5000", "500 GB NVMe"] },
  ],
};

function PricingPage() {
  const [tab, setTab] = useState<keyof typeof plans>("minecraft");
  return (
    <>
      <div className="px-6 pt-20 text-center">
        <h1 className="font-display text-5xl font-extrabold md:text-6xl">Pricing that <span className="gradient-text">scales with you</span></h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Pay monthly. Cancel anytime. 7-day money-back guarantee on every plan.</p>

        <div className="mx-auto mt-10 inline-flex rounded-2xl border border-border/60 bg-card/40 p-1 backdrop-blur">
          {(["minecraft", "cloud", "rdp"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`rounded-xl px-5 py-2 text-sm font-semibold capitalize transition-colors ${tab === k ? "bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]" : "text-muted-foreground hover:text-foreground"}`}
            >
              {k === "rdp" ? "Windows RDP" : k === "cloud" ? "Cloud VPS" : "Minecraft"}
            </button>
          ))}
        </div>
      </div>

      <Section className="pt-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans[tab].map((p) => (
            <PlanCard key={p.name} {...p} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="FAQ" title="Common questions" />
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                <span className="flex items-center justify-between">
                  {f.q}
                  <span className="ml-4 text-accent transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}

const faqs = [
  { q: "How fast is setup?", a: "Most services deploy in under 60 seconds after payment. Custom configurations may take up to 10 minutes." },
  { q: "Do you offer refunds?", a: "Yes — every plan has a 7-day money-back guarantee, no questions asked." },
  { q: "Can I upgrade later?", a: "Absolutely. Scale RAM, CPU, and storage anytime. Upgrades are prorated." },
  { q: "Is DDoS protection included?", a: "Yes, every plan includes always-on DDoS mitigation up to 1.5 Tbps." },
  { q: "Do you support custom domains?", a: "All plans support custom domains. Free subdomains are also included." },
];
