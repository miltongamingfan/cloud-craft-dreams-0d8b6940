import { createFileRoute, Link } from "@tanstack/react-router";
import { Box, Cloud, Monitor, ArrowRight } from "lucide-react";
import { Section, SectionTitle } from "@/components/site/Sections";

export const Route = createFileRoute("/services/")({
  head: () => ({ meta: [
    { title: "Services — HexoraCloud" },
    { name: "description", content: "Minecraft, Cloud VPS, and Windows RDP hosting plans." },
  ] }),
  component: ServicesIndex,
});

const services = [
  { to: "/services/minecraft" as const, name: "Minecraft Hosting", desc: "Java + Bedrock, modpacks, networks", icon: Box },
  { to: "/services/vps" as const, name: "Cloud VPS", desc: "KVM, NVMe, full root access", icon: Cloud },
  { to: "/services/rdp" as const, name: "Windows RDP", desc: "Forex, GPU, dedicated IP", icon: Monitor },
];

function ServicesIndex() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-6 text-center md:pt-28">
        <h1 className="font-display text-5xl font-extrabold md:text-6xl">Our <span className="gradient-text">Services</span></h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Pick the platform that fits your workload. Every plan ships with DDoS protection, instant deploy, and 24/7 human support.</p>
      </section>
      <Section className="pt-6">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.to} to={s.to} className="group rounded-2xl border border-border/60 bg-[var(--gradient-card)] p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-bold">{s.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">View plans <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}
