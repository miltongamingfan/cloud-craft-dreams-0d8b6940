import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Sections";
import { Box, Check, MapPin, Star } from "lucide-react";

export const Route = createFileRoute("/services/minecraft")({
  head: () => ({ meta: [
    { title: "Minecraft Server Plans — HexoraCloud" },
    { name: "description", content: "Premium Minecraft hosting for Java, Bedrock, modpacks, and large networks. India & Singapore regions." },
  ] }),
  component: MinecraftPlansPage,
});

type Plan = {
  name: string;
  ram: string;
  cpu: string;
  disk: string;
  backups: string;
  ports: string;
  price: string;
  popular?: boolean;
};

const indiaPlans: Plan[] = [
  { name: "Dirt", ram: "2GB", cpu: "100%", disk: "5GB", backups: "5x Cloud backup", ports: "5x Additional port", price: "₹20" },
  { name: "Coal", ram: "4GB", cpu: "100%", disk: "10GB", backups: "5x Cloud backup", ports: "5x Additional port", price: "₹70" },
  { name: "Redstone", ram: "6GB", cpu: "150%", disk: "15GB", backups: "6x Cloud backup", ports: "6x Additional port", price: "₹100" },
  { name: "Gold", ram: "8GB", cpu: "150%", disk: "25GB", backups: "6x Cloud backup", ports: "6x Additional port", price: "₹150", popular: true },
  { name: "Diamond", ram: "10GB", cpu: "200%", disk: "30GB", backups: "6x Cloud backup", ports: "6x Additional port", price: "₹180" },
  { name: "Netherite", ram: "12GB", cpu: "200%", disk: "40GB", backups: "10x Cloud backup", ports: "10x Additional port", price: "₹250" },
  { name: "Obsidian", ram: "20GB", cpu: "300%", disk: "65GB", backups: "10x Cloud backup", ports: "10x Additional port", price: "₹450" },
  { name: "Husk", ram: "24GB", cpu: "350%", disk: "70GB", backups: "10x Cloud backup", ports: "10x Additional port", price: "₹500" },
  { name: "Bedrock", ram: "30GB", cpu: "600%", disk: "85GB", backups: "10x Cloud backup", ports: "10x Additional port", price: "₹700" },
  { name: "Unlimited", ram: "Unlimited", cpu: "Unlimited", disk: "Unlimited", backups: "15x Cloud backup", ports: "15x Additional port", price: "₹1000" },
];

function PlanCard({ p }: { p: Plan }) {
  return (
    <div className={`relative flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 ${p.popular ? "border-primary bg-[var(--gradient-card)] shadow-[var(--shadow-glow)]" : "border-border/60 bg-card/50 hover:border-primary/50"}`}>
      {p.popular && (
        <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[var(--gradient-primary)] px-3 py-1 text-xs font-semibold text-primary-foreground">
          <Star className="h-3 w-3 fill-current" /> Most Popular
        </span>
      )}
      <h3 className="font-display text-xl font-bold">{p.name} Plan</h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-4xl font-extrabold">{p.price}</span>
        <span className="text-sm text-muted-foreground">/month</span>
      </div>
      <ul className="mt-5 flex-1 space-y-2 text-sm">
        <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{p.ram} RAM</li>
        <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{p.cpu} CPU</li>
        <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{p.disk} Disk</li>
        <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{p.backups}</li>
        <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{p.ports}</li>
      </ul>
      <Link to="/buy" className={`mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02] ${p.popular ? "bg-[var(--gradient-primary)] text-primary-foreground" : "border border-border bg-card hover:bg-secondary"}`}>
        Order now
      </Link>
    </div>
  );
}

function MinecraftPlansPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-6 text-center md:pt-28">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--gradient-primary)] shadow-[var(--shadow-glow)]">
          <Box className="h-7 w-7 text-primary-foreground" />
        </div>
        <h1 className="mt-6 font-display text-5xl font-extrabold md:text-6xl">Minecraft <span className="gradient-text">Hosting</span></h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Lag-free Minecraft servers for Java, Bedrock, modpacks and networks. Choose your closest region for the best ping.
        </p>
      </section>

      <Section className="pt-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* India region */}
          <div className="rounded-3xl border border-border/60 bg-card/40 p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">India 🇮🇳</h2>
                <p className="text-sm text-muted-foreground">Mumbai region — lowest ping for SA players</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {indiaPlans.map((p) => <PlanCard key={p.name} p={p} />)}
            </div>
          </div>

          {/* Singapore region */}
          <div className="rounded-3xl border border-border/60 bg-card/40 p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">Singapore 🇸🇬</h2>
                <p className="text-sm text-muted-foreground">Best ping for SEA, AU, and East-Asia players</p>
              </div>
            </div>
            <div className="mt-10 grid place-items-center rounded-2xl border border-dashed border-border/60 bg-secondary/30 p-12 text-center">
              <div className="font-display text-3xl font-extrabold gradient-text">Coming Soon</div>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Our Singapore region is launching shortly. Join our Discord to get notified the moment it goes live.
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
