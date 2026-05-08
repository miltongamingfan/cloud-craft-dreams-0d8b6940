import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero, Section, SectionTitle, FeatureGrid, Stats, PlanCard } from "@/components/site/Sections";
import { ArrowRight, Box, Cloud, Monitor } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VoxelHost — Minecraft, Cloud VPS & RDP Hosting" },
      { name: "description", content: "Premium hosting for Minecraft servers, Cloud VPS, and Windows RDP. Instant deploy, NVMe SSDs, DDoS protection." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero
        eyebrow="Powered by AMD Ryzen + NVMe"
        title="Hosting that feels"
        highlight="legendary."
        subtitle="Spin up high-performance Minecraft servers, Cloud VPS, or Windows RDP in under 60 seconds. Crafted for creators, builders, and businesses."
      />

      <Section className="py-10">
        <Stats
          items={[
            { value: "99.99%", label: "Uptime SLA" },
            { value: "<1ms", label: "Avg latency" },
            { value: "12+", label: "Global regions" },
            { value: "50K+", label: "Servers deployed" },
          ]}
        />
      </Section>

      <Section>
        <SectionTitle
          eyebrow="What we host"
          title="One platform. Every workload."
          subtitle="From your first Minecraft realm to enterprise cloud workloads — we've engineered the stack for speed."
        />
        <div className="grid gap-5 md:grid-cols-3">
          <ProductCard
            icon={<Box className="h-6 w-6" />}
            title="Minecraft Hosting"
            desc="Java & Bedrock. One-click modpacks, free subdomain, Pterodactyl panel."
            href="/minecraft"
            tag="From $2.50/mo"
          />
          <ProductCard
            icon={<Cloud className="h-6 w-6" />}
            title="Cloud VPS"
            desc="KVM virtualized. Linux flavors, full root, 10 Gbps uplinks, snapshots."
            href="/cloud"
            tag="From $5/mo"
          />
          <ProductCard
            icon={<Monitor className="h-6 w-6" />}
            title="Windows RDP"
            desc="Dedicated Windows desktops. Admin access, GPU options, 1-click setup."
            href="/rdp"
            tag="From $8/mo"
          />
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Why VoxelHost" title="Built for performance, designed for humans" />
        <FeatureGrid
          items={[
            { icon: "Cpu", title: "Ryzen 9 7950X", desc: "Latest-gen CPUs clocked at 5.7 GHz for buttery smooth tick rates." },
            { icon: "HardDrive", title: "Gen4 NVMe SSDs", desc: "7,000 MB/s reads. Worlds load in a blink, databases fly." },
            { icon: "Shield", title: "DDoS Protected", desc: "Always-on enterprise mitigation up to 1.5 Tbps. Sleep easy." },
            { icon: "Zap", title: "Instant Deploy", desc: "From checkout to online in 60 seconds. No waiting room." },
            { icon: "Globe", title: "12+ Regions", desc: "US, EU, Asia, Brazil, Australia. Pick the closest, lowest ping." },
            { icon: "Headphones", title: "Human Support", desc: "Real engineers on chat & ticket 24/7. Avg reply under 5 min." },
          ]}
        />
      </Section>

      <Section>
        <SectionTitle eyebrow="Starter plans" title="Simple pricing, serious power" subtitle="Upgrade or scale anytime. No lock-in, no surprises." />
        <div className="grid gap-6 md:grid-cols-3">
          <PlanCard name="Pebble" price="$2.50" tagline="Tiny realms & test boxes" features={["1 GB RAM", "10 GB NVMe", "Unmetered traffic", "Free subdomain", "Basic DDoS"]} />
          <PlanCard name="Diamond" price="$9" tagline="Most popular for SMPs" popular features={["6 GB RAM", "60 GB NVMe", "Ryzen 9 7950X", "Free MySQL DB", "Premium DDoS", "Daily backups"]} />
          <PlanCard name="Netherite" price="$24" tagline="Big communities & studios" features={["16 GB RAM", "200 GB NVMe", "Dedicated CPU cores", "Unlimited slots", "Priority support", "Hourly backups"]} />
        </div>
        <div className="mt-10 text-center">
          <Link to="/pricing" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
            See all plans <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section>
        <div className="overflow-hidden rounded-3xl border border-border/60 bg-[var(--gradient-card)] p-10 text-center md:p-16">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Ready to <span className="gradient-text">build something epic?</span></h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Join thousands of creators running their projects on VoxelHost. 7-day money-back guarantee, no questions asked.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/pricing" className="rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">
              Browse plans
            </Link>
            <Link to="/contact" className="rounded-xl border border-border bg-card/40 px-6 py-3 font-semibold backdrop-blur hover:bg-card/70">
              Contact sales
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

function ProductCard({ icon, title, desc, href, tag }: { icon: React.ReactNode; title: string; desc: string; href: "/minecraft" | "/cloud" | "/rdp"; tag: string }) {
  return (
    <Link
      to={href}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-[var(--gradient-card)] p-7 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]"
    >
      <div className="absolute right-4 top-4 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">{tag}</div>
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
        {icon}
      </div>
      <h3 className="mt-5 font-display text-2xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
