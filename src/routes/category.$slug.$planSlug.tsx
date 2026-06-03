import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { fetchPlan } from "@/lib/api/plans";
import { Section } from "@/components/site/Sections";
import { Check, ArrowLeft, Cpu, HardDrive, Database, Globe, Shield, Zap, Star } from "lucide-react";

export const Route = createFileRoute("/category/$slug/$planSlug")({
  component: PlanPage,
  loader: async ({ params }) => {
    const result = await fetchPlan(params.slug, params.planSlug);
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.plan.name} — ${loaderData?.category.name} | TigerHost` },
      { name: "description", content: loaderData?.plan.description ?? loaderData?.plan.tagline ?? "" },
    ],
  }),
});

function PlanPage() {
  const { plan, category } = Route.useLoaderData();

  return (
    <>
      <Section className="pt-12 pb-6">
        <Link to="/category/$slug" params={{ slug: category.slug }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to {category.name}
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Left: details */}
          <div className="animate-rise">
            {plan.is_popular && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--gradient-primary)] px-3 py-1 text-xs font-semibold text-primary-foreground">
                <Star className="h-3 w-3 fill-current" /> Most Popular
              </span>
            )}
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-accent">{category.name}</p>
            <h1 className="mt-2 font-display text-5xl font-extrabold md:text-6xl">{plan.name}</h1>
            {plan.tagline && <p className="mt-3 text-xl text-muted-foreground">{plan.tagline}</p>}
            {plan.description && <p className="mt-6 max-w-2xl text-muted-foreground">{plan.description}</p>}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {plan.ram && <SpecBlock icon={<Cpu className="h-4 w-4" />} label="Memory" value={plan.ram} />}
              {plan.cpu && <SpecBlock icon={<Cpu className="h-4 w-4" />} label="CPU" value={plan.cpu} />}
              {plan.storage && <SpecBlock icon={<HardDrive className="h-4 w-4" />} label="Storage" value={plan.storage} />}
              {plan.bandwidth && <SpecBlock icon={<Database className="h-4 w-4" />} label="Bandwidth" value={plan.bandwidth} />}
            </div>

            {plan.features.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold">What's included</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {plan.features.map((f: string) => (
                    <li key={f} className="flex items-start gap-2 rounded-xl border border-border/60 bg-card/40 p-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {plan.locations.length > 0 && (
              <div className="mt-10">
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold"><Globe className="h-5 w-5 text-accent" /> Available locations</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {plan.locations.map((l: string) => (
                    <span key={l} className="rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-sm">{l}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <Trust icon={<Shield className="h-4 w-4" />} text="DDoS protected" />
              <Trust icon={<Zap className="h-4 w-4" />} text="Instant deploy" />
              <Trust icon={<Star className="h-4 w-4" />} text="99.99% uptime" />
            </div>
          </div>

          {/* Right: order card */}
          <div className="animate-rise lg:sticky lg:top-28 self-start" style={{ animationDelay: "0.1s" }}>
            <div className="rounded-3xl border border-border/60 bg-[var(--gradient-card)] p-6 shadow-[var(--shadow-elevated)]">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Starting at</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-5xl font-extrabold gradient-text">${Number(plan.price).toFixed(2)}</span>
                <span className="text-muted-foreground">/{plan.billing_period}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Billed in {plan.currency}. Cancel anytime.</p>

              <Link
                to="/buy"
                className="mt-6 block rounded-xl bg-[var(--gradient-primary)] px-6 py-3.5 text-center font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
              >
                Order {plan.name}
              </Link>
              <Link
                to="/buy"
                className="mt-3 block rounded-xl border border-border bg-card/60 px-6 py-3 text-center text-sm font-semibold hover:bg-secondary"
              >
                Talk to sales
              </Link>

              <div className="mt-6 space-y-2 border-t border-border/60 pt-5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" /> 7-day money-back guarantee</div>
                <div className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" /> Setup in under 60 seconds</div>
                <div className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" /> 24/7 human support</div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function SpecBlock({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">{icon} {label}</div>
      <div className="mt-1.5 font-display text-xl font-bold">{value}</div>
    </div>
  );
}

function Trust({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm">
      <span className="text-accent">{icon}</span> {text}
    </div>
  );
}
