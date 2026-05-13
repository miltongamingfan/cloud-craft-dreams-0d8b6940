import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionTitle, FeatureGrid, Stats, PlanCard } from "@/components/site/Sections";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Box, Cloud, Monitor, Gamepad2, Server, Globe } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HexoraCloud — Minecraft, Cloud VPS & RDP Hosting" },
      { name: "description", content: "Premium hosting for Minecraft, game servers, Cloud VPS, and Windows RDP. Instant deploy, NVMe SSDs, DDoS protection." },
    ],
  }),
  component: Index,
});

const services = [
  { name: "Minecraft", tag: "High Performance & Best Ping Hosting.", price: "₹20", color: "from-emerald-500 to-lime-400", icon: <Box className="h-6 w-6" /> },
  { name: "Palworld", tag: "High-performance hosting built for gamers.", price: "$8.50", color: "from-sky-500 to-cyan-400", icon: <Gamepad2 className="h-6 w-6" /> },
  { name: "FiveM", tag: "GTA V roleplay servers, ESX & QBCore ready.", price: "$8.50", color: "from-orange-500 to-amber-400", icon: <Gamepad2 className="h-6 w-6" /> },
  { name: "Rust", tag: "High-pop wipes, Oxide & Carbon supported.", price: "$10", color: "from-red-500 to-rose-400", icon: <Gamepad2 className="h-6 w-6" /> },
  { name: "ARK: Survival", tag: "Mods, clusters, full survival hosting.", price: "$12", color: "from-yellow-500 to-orange-400", icon: <Gamepad2 className="h-6 w-6" /> },
  { name: "Cloud VPS", tag: "KVM, NVMe, full root access.", price: "$5", color: "from-indigo-500 to-purple-400", icon: <Cloud className="h-6 w-6" /> },
  { name: "Windows RDP", tag: "Forex VPS, GPU plans available.", price: "$8", color: "from-blue-500 to-sky-400", icon: <Monitor className="h-6 w-6" /> },
];

function Index() {
  return (
    <>
      <HeroSplit />

      <Section className="py-10">
        <Stats
          items={[
            { value: "99.99%", label: "Uptime SLA" },
            { value: "<1ms", label: "Avg latency" },
            { value: "12+", label: "Global regions" },
            { value: "6500+", label: "Active servers" },
          ]}
        />
      </Section>

      <Section>
        <SectionTitle eyebrow="What we host" title="One platform. Every workload." subtitle="Game servers, cloud compute, Windows desktops — all on the same lightning-fast network." />
        <div className="grid gap-5 md:grid-cols-3">
          <ProductCard icon={<Box className="h-6 w-6" />} title="Minecraft & Games" desc="Java, Bedrock, Palworld, FiveM, Rust, ARK and more. One-click setup." href="/minecraft" tag="From $2.50/mo" />
          <ProductCard icon={<Cloud className="h-6 w-6" />} title="Cloud VPS" desc="KVM virtualized. Full root, snapshots, 10 Gbps uplinks, instant deploy." href="/cloud" tag="From $5/mo" />
          <ProductCard icon={<Monitor className="h-6 w-6" />} title="Windows RDP" desc="Dedicated Windows desktops. Admin access, GPU options, 1-click setup." href="/rdp" tag="From $8/mo" />
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Why HexoraCloud" title="Built for performance, designed for humans" />
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
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Join thousands of creators running their projects on HexoraCloud. 7-day money-back guarantee, no questions asked.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/pricing" className="rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">Browse plans</Link>
            <Link to="/contact" className="rounded-xl border border-border bg-card/40 px-6 py-3 font-semibold backdrop-blur hover:bg-card/70">Contact sales</Link>
          </div>
        </div>
      </Section>
    </>
  );
}

function HeroSplit() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-6 pt-16 pb-12 md:pt-24 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
      {/* Left */}
      <div className="animate-rise">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 backdrop-blur">
          <div className="flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm font-semibold">4.9</span>
          <span className="text-sm text-muted-foreground">(6500+ Reviews)</span>
        </div>

        <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] md:text-6xl lg:text-[64px]">
          Unleash the Power of<br />
          Reliable Game Hosting<br />
          with{" "}
          <span className="relative inline-block">
            <span className="relative z-10 px-3 text-foreground">HexoraCloud</span>
            <span
              aria-hidden
              className="absolute inset-0 -skew-x-6 rounded-md"
              style={{ background: "var(--gradient-primary)", filter: "blur(0.5px)", opacity: 0.7 }}
            />
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
          Game server hosting trusted by creators, Minecraft networks, and large gaming communities since 2019.
          HexoraCloud powers over 6,500 active servers with low-latency infrastructure, DDoS protection, and reliable uptime.
        </p>

        <p className="mt-6 font-semibold text-accent">Deploy Your Game Server in 30 Seconds — Try for Free!</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/pricing" className="rounded-xl bg-[var(--gradient-primary)] px-7 py-3.5 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">
            View Plans
          </Link>
          <Link to="/buy" className="rounded-xl border border-border bg-card/40 px-7 py-3.5 font-semibold backdrop-blur hover:bg-card/70">
            Get Started
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
          <Badge icon={<Server className="h-3.5 w-3.5" />} text="NVMe Gen4" />
          <Badge icon={<Globe className="h-3.5 w-3.5" />} text="12+ Regions" />
          <Badge icon={<Star className="h-3.5 w-3.5" />} text="99.99% Uptime" />
        </div>
      </div>

      {/* Right service carousel */}
      <ServiceCarousel />
    </section>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/30 px-3 py-1.5 font-medium backdrop-blur">
      {icon} {text}
    </span>
  );
}

function ServiceCarousel() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(services.length / perPage);
  const visible = services.slice(page * perPage, page * perPage + perPage);

  return (
    <div className="animate-rise rounded-3xl border border-border/60 bg-card/40 p-4 backdrop-blur shadow-[var(--shadow-elevated)]" style={{ animationDelay: "0.15s" }}>
      <div className="flex items-center justify-between rounded-2xl bg-secondary/60 px-4 py-3">
        <h3 className="font-display text-base font-bold">Our Service</h3>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage((p) => (p - 1 + pages) % pages)} className="grid h-7 w-7 place-items-center rounded-full bg-card/60 hover:bg-card">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => setPage((p) => (p + 1) % pages)} className="grid h-7 w-7 place-items-center rounded-full bg-card/60 hover:bg-card">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="text-sm font-semibold text-accent">#{page + 1} | Gaming Hosting</div>
      </div>

      <div className="mt-3 space-y-3">
        {visible.map((s) => (
          <Link
            key={s.name}
            to="/buy"
            className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-secondary/40 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]"
          >
            <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-lg`}>
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display text-lg font-bold">{s.name}</div>
              <div className="truncate text-xs text-muted-foreground">{s.tag}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Starting at</div>
              <div className="font-display text-xl font-extrabold gradient-text">{s.price}</div>
              <div className="text-[10px] text-muted-foreground">/month</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ icon, title, desc, href, tag }: { icon: React.ReactNode; title: string; desc: string; href: "/minecraft" | "/cloud" | "/rdp"; tag: string }) {
  return (
    <Link to={href} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-[var(--gradient-card)] p-7 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]">
      <div className="absolute right-4 top-4 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">{tag}</div>
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">{icon}</div>
      <h3 className="mt-5 font-display text-2xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
