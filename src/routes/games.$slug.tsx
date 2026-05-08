import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { gameBySlug } from "@/lib/games-data";
import { Section, SectionTitle } from "@/components/site/Sections";
import { ArrowLeft, ArrowRight, Check, Star, Shield, Zap, Globe } from "lucide-react";

export const Route = createFileRoute("/games/$slug")({
  loader: ({ params }) => {
    const game = gameBySlug(params.slug);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.game.name} Server Hosting — HexoraCloud` },
      { name: "description", content: loaderData?.game.tagline ?? "" },
      { property: "og:title", content: `${loaderData?.game.name} Hosting — HexoraCloud` },
      { property: "og:description", content: loaderData?.game.intro ?? "" },
    ],
  }),
  errorComponent: ({ error }) => <div className="px-6 py-24 text-center text-muted-foreground">{error.message}</div>,
  notFoundComponent: () => (
    <div className="px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Game not found</h1>
      <Link to="/" className="mt-4 inline-block text-accent hover:underline">Back home</Link>
    </div>
  ),
  component: GamePage,
});

function GamePage() {
  const { game } = Route.useLoaderData();
  const Icon = game.icon;

  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur">
              {game.category}
            </span>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] md:text-6xl">
              {game.name} <span className="gradient-text">Server Hosting</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">{game.tagline}</p>
            <p className="mt-6 max-w-2xl text-muted-foreground">{game.intro}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/buy" className="rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">
                Order {game.name}
              </Link>
              <Link to="/pricing" className="rounded-xl border border-border bg-card/40 px-6 py-3 font-semibold backdrop-blur hover:bg-card/70">
                See plans
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> DDoS protected</span>
              <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" /> Instant deploy</span>
              <span className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> 12+ regions</span>
              <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /> 99.99% uptime</span>
            </div>
          </div>

          <div className="animate-rise rounded-3xl border border-border/60 bg-[var(--gradient-card)] p-8 shadow-[var(--shadow-elevated)]" style={{ animationDelay: "0.1s" }}>
            <div className={`grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br ${game.color} text-white shadow-lg`}>
              <Icon className="h-10 w-10" />
            </div>
            <div className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">Starting at</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-display text-5xl font-extrabold gradient-text">{game.startingAt}</span>
              <span className="text-muted-foreground">/mo</span>
            </div>
            <Link to="/buy" className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[var(--gradient-primary)] px-6 py-3.5 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Section>
        <SectionTitle eyebrow={`${game.name} hosting`} title={`Built specifically for ${game.name}`} />
        <div className="mx-auto grid max-w-4xl gap-4">
          {game.body.map((b: { heading: string; text: string }) => (
            <div key={b.heading} className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur">
              <h3 className="font-display text-xl font-bold">{b.heading}</h3>
              <p className="mt-2 text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="What's included" title="Every plan ships with" />
        <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
          {game.bullets.map((b) => (
            <div key={b} className="flex items-start gap-2 rounded-xl border border-border/60 bg-card/40 p-4">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span className="text-sm">{b}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-border/60 bg-[var(--gradient-card)] p-10 text-center md:p-12">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">Launch your {game.name} server today</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Online in under 60 seconds. 7-day money-back guarantee.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/buy" className="rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">
              Get Started
            </Link>
            <Link to="/contact" className="rounded-xl border border-border bg-card/40 px-6 py-3 font-semibold backdrop-blur hover:bg-card/70">
              Talk to sales
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
