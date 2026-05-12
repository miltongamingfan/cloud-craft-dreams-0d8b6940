import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Section } from "@/components/site/Sections";
import { Box, Check, MapPin, Star } from "lucide-react";
import { fetchCategoryBySlug, fetchPlansByCategory, type Plan } from "@/lib/api/plans";

export const Route = createFileRoute("/services/minecraft")({
  head: () => ({ meta: [
    { title: "Minecraft Server Plans — HexoraCloud" },
    { name: "description", content: "Premium Minecraft hosting for Java, Bedrock, modpacks, and large networks. India & Singapore regions." },
  ] }),
  component: MinecraftPlansPage,
});

function fmt(p: Plan) {
  const sym = p.currency === "INR" ? "₹" : "$";
  return `${sym}${Number(p.price).toFixed(0)}`;
}

function PlanCard({ p }: { p: Plan }) {
  return (
    <div className={`relative flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 ${p.is_popular ? "border-primary bg-[var(--gradient-card)] shadow-[var(--shadow-glow)]" : "border-border/60 bg-card/50 hover:border-primary/50"}`}>
      {p.is_popular && (
        <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[var(--gradient-primary)] px-3 py-1 text-xs font-semibold text-primary-foreground">
          <Star className="h-3 w-3 fill-current" /> Most Popular
        </span>
      )}
      <h3 className="font-display text-xl font-bold">{p.name} Plan</h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-4xl font-extrabold">{fmt(p)}</span>
        <span className="text-sm text-muted-foreground">/month</span>
      </div>
      <ul className="mt-5 flex-1 space-y-2 text-sm">
        {p.ram && <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{p.ram} RAM</li>}
        {p.cpu && <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{p.cpu} CPU</li>}
        {p.storage && <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{p.storage} Disk</li>}
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{f}</li>
        ))}
      </ul>
      <Link to="/buy" className={`mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02] ${p.is_popular ? "bg-[var(--gradient-primary)] text-primary-foreground" : "border border-border bg-card hover:bg-secondary"}`}>
        Order now
      </Link>
    </div>
  );
}

function MinecraftPlansPage() {
  const { data: category } = useQuery({ queryKey: ["category", "minecraft"], queryFn: () => fetchCategoryBySlug("minecraft") });
  const { data: plans = [] } = useQuery({
    queryKey: ["plans", category?.id],
    queryFn: () => fetchPlansByCategory(category!.id),
    enabled: !!category?.id,
  });

  const indiaPlans = plans.filter((p) => p.locations.includes("India"));
  const singaporePlans = plans.filter((p) => p.locations.includes("Singapore") && !p.locations.includes("India"));

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
              {indiaPlans.map((p) => <PlanCard key={p.id} p={p} />)}
            </div>
          </div>

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
            {singaporePlans.length > 0 ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {singaporePlans.map((p) => <PlanCard key={p.id} p={p} />)}
              </div>
            ) : (
              <div className="mt-10 grid place-items-center rounded-2xl border border-dashed border-border/60 bg-secondary/30 p-12 text-center">
                <div className="font-display text-3xl font-extrabold gradient-text">Coming Soon</div>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Our Singapore region is launching shortly. Join our Discord to get notified the moment it goes live.
                </p>
                <Link to="/buy" className="mt-5 inline-flex rounded-xl bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
                  Notify me
                </Link>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
