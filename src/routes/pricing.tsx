import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchAllPlans } from "@/lib/api/plans";
import { Section, SectionTitle } from "@/components/site/Sections";
import { ArrowRight, Check, Star } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — TigerHost" }, { name: "description", content: "Browse all plans across Minecraft, Cloud VPS, and Windows RDP." }] }),
  component: PricingPage,
});

function PricingPage() {
  const { data: cats = [] } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const { data: plans = [] } = useQuery({ queryKey: ["all-plans"], queryFn: fetchAllPlans });

  return (
    <>
      <div className="px-6 pt-20 text-center">
        <h1 className="font-display text-5xl font-extrabold md:text-6xl">Pricing that <span className="gradient-text">scales with you</span></h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Pay monthly. Cancel anytime. 7-day money-back on every plan.</p>
      </div>

      {cats.map((cat) => {
        const items = plans.filter((p) => p.category_id === cat.id && p.is_active);
        if (items.length === 0) return null;
        return (
          <Section key={cat.id} className="pt-12">
            <SectionTitle eyebrow={cat.name} title={cat.tagline ?? cat.name} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <Link
                  key={p.id}
                  to="/category/$slug/$planSlug"
                  params={{ slug: cat.slug, planSlug: p.slug }}
                  className={`group flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 ${p.is_popular ? "border-primary bg-[var(--gradient-card)] shadow-[var(--shadow-glow)]" : "border-border/60 bg-card/50 hover:border-primary/50"}`}
                >
                  {p.is_popular && (
                    <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-[var(--gradient-primary)] px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                      <Star className="h-3 w-3 fill-current" /> Popular
                    </span>
                  )}
                  <h3 className="font-display text-xl font-bold">{p.name}</h3>
                  {p.tagline && <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>}
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-3xl font-extrabold">${Number(p.price).toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground">/{p.billing_period}</span>
                  </div>
                  <ul className="mt-4 flex-1 space-y-1.5 text-sm">
                    {p.features.slice(0, 4).map((f: string) => (
                      <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /><span>{f}</span></li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">View details <ArrowRight className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </Section>
        );
      })}
    </>
  );
}
