import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Sections";
import { Cloud, Check, MapPin, Star, Cpu, Network } from "lucide-react";

export const Route = createFileRoute("/services/vps")({
  head: () => ({ meta: [
    { title: "Cloud VPS Plans — HexoraCloud" },
    { name: "description", content: "High-performance Intel Xeon Cloud VPS with NVMe storage and 2 Gbps network. India & Singapore regions." },
  ] }),
  component: VpsPlansPage,
});

type Plan = {
  name: string;
  ram: string;
  cpu: string;
  disk: string;
  cpuModel: string;
  location: string;
  network: string;
  price: string;
  popular?: boolean;
};

const indiaPlans: Plan[] = [
  { name: "Starter",  ram: "10 GB", cpu: "2 Cores",  disk: "50 GB",  cpuModel: "Intel Xeon", location: "Japan",          network: "2 Gbps", price: "₹250" },
  { name: "Advanced", ram: "20 GB", cpu: "3 Cores",  disk: "70 GB",  cpuModel: "Intel Xeon", location: "Japan",          network: "2 Gbps", price: "₹400", popular: true },
  { name: "Power",    ram: "32 GB", cpu: "4 Cores",  disk: "100 GB", cpuModel: "Intel Xeon", location: "Japan",          network: "2 Gbps", price: "₹550" },
  { name: "Ultra",    ram: "40 GB", cpu: "6 Cores",  disk: "120 GB", cpuModel: "Intel Xeon", location: "India, Singapore", network: "2 Gbps", price: "₹699" },
];

function PlanCard({ p }: { p: Plan }) {
  return (
    <div className={`relative flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 ${p.popular ? "border-primary bg-[var(--gradient-card)] shadow-[var(--shadow-glow)]" : "border-border/60 bg-card/50 hover:border-primary/50"}`}>
      {p.popular && (
        <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[var(--gradient-primary)] px-3 py-1 text-xs font-semibold text-primary-foreground">
          <Star className="h-3 w-3 fill-current" /> Most Popular
        </span>
      )}
      <h3 className="font-display text-xl font-bold">Plan {p.name}</h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-4xl font-extrabold">{p.price}</span>
        <span className="text-sm text-muted-foreground">/month</span>
      </div>
      <ul className="mt-5 flex-1 space-y-2 text-sm">
        <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{p.ram} RAM</li>
        <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{p.cpu} ({p.cpuModel})</li>
        <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{p.disk} NVMe Disk</li>
        <li className="flex items-start gap-2"><Network className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{p.network} Network</li>
        <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{p.location}</li>
      </ul>
      <Link to="/buy" className={`mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02] ${p.popular ? "bg-[var(--gradient-primary)] text-primary-foreground" : "border border-border bg-card hover:bg-secondary"}`}>
        Create a ticket to purchase
      </Link>
    </div>
  );
}

function VpsPlansPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-6 text-center md:pt-28">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--gradient-primary)] shadow-[var(--shadow-glow)]">
          <Cloud className="h-7 w-7 text-primary-foreground" />
        </div>
        <h1 className="mt-6 font-display text-5xl font-extrabold md:text-6xl">Pro <span className="gradient-text">VPS Hosting</span></h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Built for performance, stability, and high-throughput workloads. Intel Xeon power, NVMe storage, 2 Gbps network.
        </p>
      </section>

      <Section className="pt-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* India region */}
          <div className="rounded-3xl border border-border/60 bg-card/40 p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">India 🇮🇳</h2>
                <p className="text-sm text-muted-foreground">INR pricing — Intel Xeon · NVMe · 2 Gbps</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {indiaPlans.map((p) => <PlanCard key={p.name} p={p} />)}
            </div>
            <p className="mt-5 text-xs text-muted-foreground">— Team HexoraCloud · Create a ticket to purchase any plan.</p>
          </div>

          {/* Singapore region */}
          <div className="rounded-3xl border border-border/60 bg-card/40 p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">Singapore 🇸🇬</h2>
                <p className="text-sm text-muted-foreground">Best ping for SEA, AU, and East-Asia workloads</p>
              </div>
            </div>
            <div className="mt-10 grid place-items-center rounded-2xl border border-dashed border-border/60 bg-secondary/30 p-12 text-center">
              <div className="font-display text-3xl font-extrabold gradient-text">Coming Soon</div>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Our Singapore VPS region is launching shortly. Open a ticket to be notified the moment it goes live.
              </p>
              <Link to="/buy" className="mt-5 inline-flex rounded-xl bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
                Notify me
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
