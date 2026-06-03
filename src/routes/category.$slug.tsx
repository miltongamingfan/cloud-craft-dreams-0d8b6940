import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoryBySlug, fetchPlansByCategory } from "@/lib/api/plans";
import { Section } from "@/components/site/Sections";
import { Box, Cloud, Monitor, Server, ArrowRight, Check, Star } from "lucide-react";

export const Route = createFileRoute("/category/$slug")({
  component: CategoryPage,
  loader: async ({ params }) => {
    const cat = await fetchCategoryBySlug(params.slug);
    if (!cat) throw notFound();
    return { category: cat };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category.name ?? "Hosting"} — TigerHost` },
      { name: "description", content: loaderData?.category.description ?? "" },
    ],
  }),
});

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Box, Cloud, Monitor, Server,
};

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const Icon = iconMap[category.icon] ?? Server;

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["plans", category.id],
    queryFn: () => fetchPlansByCategory(category.id),
  });

  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 text-center md:pt-24">
        <div className="animate-rise mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--gradient-primary)] shadow-[var(--shadow-glow)]">
          <Icon className="h-7 w-7 text-primary-foreground" />
        </div>
        <h1 className="animate-rise mt-6 font-display text-5xl font-extrabold md:text-6xl" style={{ animationDelay: "0.1s" }}>
          {category.name.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="gradient-text">{category.name.split(" ").slice(-1)}</span>
        </h1>
        {category.tagline && <p className="animate-rise mt-4 text-lg text-muted-foreground" style={{ animationDelay: "0.15s" }}>{category.tagline}</p>}
        {category.description && <p className="animate-rise mx-auto mt-4 max-w-2xl text-muted-foreground" style={{ animationDelay: "0.2s" }}>{category.description}</p>}
      </section>

      <Section className="pt-4">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => <div key={i} className="h-96 animate-pulse rounded-2xl bg-card/40" />)}
          </div>
        ) : plans.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-card/40 p-12 text-center text-muted-foreground">
            No plans available yet. Check back soon.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => (
              <Link
                key={p.id}
                to="/category/$slug/$planSlug"
                params={{ slug: category.slug, planSlug: p.slug }}
                className={`group relative flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 ${p.is_popular ? "border-primary bg-[var(--gradient-card)] shadow-[var(--shadow-glow)]" : "border-border/60 bg-card/50 hover:border-primary/50"}`}
              >
                {p.is_popular && (
                  <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[var(--gradient-primary)] px-3 py-1 text-xs font-semibold text-primary-foreground">
                    <Star className="h-3 w-3 fill-current" /> Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold">{p.name}</h3>
                {p.tagline && <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>}
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-extrabold">${Number(p.price).toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground">/{p.billing_period}</span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                  {p.ram && <Spec label="RAM" value={p.ram} />}
                  {p.cpu && <Spec label="CPU" value={p.cpu} />}
                  {p.storage && <Spec label="Storage" value={p.storage} />}
                  {p.bandwidth && <Spec label="Bandwidth" value={p.bandwidth} />}
                </div>

                <ul className="mt-5 flex-1 space-y-2 text-sm">
                  {p.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                  {p.features.length > 5 && <li className="text-xs text-muted-foreground">+ {p.features.length - 5} more</li>}
                </ul>

                <span className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-transform group-hover:scale-[1.02] ${p.is_popular ? "bg-[var(--gradient-primary)] text-primary-foreground" : "border border-border bg-card group-hover:bg-secondary"}`}>
                  View details <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-secondary/40 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
