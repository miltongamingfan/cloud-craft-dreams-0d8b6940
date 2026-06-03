import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { toolBySlug } from "@/lib/tools-data";
import { Section, SectionTitle } from "@/components/site/Sections";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/tools/$slug")({
  loader: ({ params }) => {
    const tool = toolBySlug(params.slug);
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.tool.name} — TigerHost` },
      { name: "description", content: loaderData?.tool.tagline ?? "" },
    ],
  }),
  errorComponent: ({ error }) => <div className="px-6 py-24 text-center text-muted-foreground">{error.message}</div>,
  notFoundComponent: () => (
    <div className="px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Tool not found</h1>
      <Link to="/" className="mt-4 inline-block text-accent hover:underline">Back home</Link>
    </div>
  ),
  component: ToolPage,
});

function ToolPage() {
  const { tool } = Route.useLoaderData();
  const Icon = tool.icon;

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-10 text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
        <div className="animate-rise mx-auto mt-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--gradient-primary)] shadow-[var(--shadow-glow)]">
          <Icon className="h-7 w-7 text-primary-foreground" />
        </div>
        <h1 className="mt-6 font-display text-5xl font-extrabold md:text-6xl">{tool.name}</h1>
        <p className="mt-4 text-lg text-accent font-semibold">{tool.tagline}</p>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{tool.intro}</p>

        <div className="mx-auto mt-8 inline-flex items-baseline gap-2 rounded-2xl border border-border/60 bg-card/40 px-6 py-4 backdrop-blur">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">From</span>
          <span className="font-display text-3xl font-extrabold gradient-text">{tool.price}</span>
          <span className="text-xs text-muted-foreground">· {tool.priceNote}</span>
        </div>
      </section>

      <Section>
        <SectionTitle eyebrow="Toolbox" title="Everything in one place" />
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tool.features.map((f: { title: string; desc: string }) => (
            <div key={f.title} className="group rounded-2xl border border-border/60 bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]">
              <h3 className="font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-border/60 bg-[var(--gradient-card)] p-10 text-center md:p-12">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">Get the full toolkit</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Lifetime access — pay once, use forever. We keep every tool updated as the games we host evolve.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/buy" className="rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">
              Host with us
            </Link>
            <Link to="/contact" className="rounded-xl border border-border bg-card/40 px-6 py-3 font-semibold backdrop-blur hover:bg-card/70">
              Suggest a tool
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
