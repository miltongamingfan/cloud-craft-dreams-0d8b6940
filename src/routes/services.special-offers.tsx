import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Section } from "@/components/site/Sections";
import { Sparkles, Check, Star, Tag } from "lucide-react";
import { fetchCategoryBySlug, fetchPlansByCategory, type Plan } from "@/lib/api/plans";

export const Route = createFileRoute("/services/special-offers")({
  head: () => ({
    meta: [
      { title: "Special Offers — TigerHost" },
      { name: "description", content: "Limited-time deals, seasonal discounts, and bundles on Minecraft, VPS and RDP hosting." },
    ],
  }),
  component: SpecialOffersPage,
});

function fmt(p: Plan) {
  const sym = p.currency === "INR" ? "₹" : "$";
  return `${sym}${Number(p.price).toFixed(0)}`;
}

function OfferCard({ p }: { p: Plan }) {
  return (
    <div className={`relative flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 ${p.is_popular ? "border-primary bg-[var(--gradient-card)] shadow-[var(--shadow-glow)]" : "border-border/60 bg-card/50 hover:border-primary/50"}`}>
      {p.is_popular && (
        <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[var(--gradient-primary)] px-3 py-1 text-xs font-semibold text-primary-foreground">
          <Star className="h-3 w-3 fill-current" /> Hot Deal
        </span>
      )}
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
        <Tag className="h-3.5 w-3.5" /> Special offer
      </div>
      <h3 className="mt-2 font-display text-xl font-bold">{p.name}</h3>
      {p.tagline && <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>}
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-4xl font-extrabold gradient-text">{fmt(p)}</span>
        <span className="text-sm text-muted-foreground">/{p.billing_period}</span>
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
        Claim offer
      </Link>
    </div>
  );
}

function SpecialOffersPage() {
  const { data: category } = useQuery({ queryKey: ["category", "special-offers"], queryFn: () => fetchCategoryBySlug("special-offers") });
  const { data: plans = [] } = useQuery({
    queryKey: ["plans", category?.id],
    queryFn: () => fetchPlansByCategory(category!.id),
    enabled: !!category?.id,
  });

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-6 text-center md:pt-28">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-amber-400 shadow-[var(--shadow-glow)]">
          <Sparkles className="h-7 w-7 text-white" />
        </div>
        <h1 className="mt-6 font-display text-5xl font-extrabold md:text-6xl">Special <span className="gradient-text">Offers</span></h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {category?.description ?? "Limited-time deals, seasonal discounts and exclusive bundles. Refreshed regularly — grab them before they're gone."}
        </p>
      </section>

      <Section className="pt-6">
        {plans.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => <OfferCard key={p.id} p={p} />)}
          </div>
        ) : (
          <div className="grid place-items-center rounded-3xl border border-dashed border-border/60 bg-card/40 p-16 text-center">
            <Sparkles className="h-10 w-10 text-accent" />
            <div className="mt-4 font-display text-3xl font-extrabold gradient-text">New offers dropping soon</div>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              We're cooking up fresh deals. Check back shortly or join our Discord to be the first to know.
            </p>
            <Link to="/contact" className="mt-6 inline-flex rounded-xl bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
              Get notified
            </Link>
          </div>
        )}
      </Section>
    </>
  );
}
