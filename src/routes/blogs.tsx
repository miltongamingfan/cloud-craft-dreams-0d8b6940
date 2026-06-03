import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionTitle } from "@/components/site/Sections";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Blog — TigerHost" },
      { name: "description", content: "Tutorials, server-owner guides, and behind-the-scenes infrastructure deep-dives from the TigerHost team." },
    ],
  }),
  component: BlogsPage,
});

const posts = [
  { slug: "minecraft-1-21-update", title: "Surviving the Minecraft 1.21 update without losing your SMP", date: "May 02, 2026", category: "Minecraft", read: "6 min read", excerpt: "What changed under the hood in 1.21, which plugins broke, and how to upgrade Paper / Purpur safely without losing world data." },
  { slug: "fivem-vs-redm", title: "FiveM vs RedM in 2026 — what's the right pick for your RP server?", date: "Apr 18, 2026", category: "FiveM", read: "8 min read", excerpt: "Player counts, framework maturity, and the hardware you need for each. Plus: how to host both at once on a single dedicated box." },
  { slug: "rust-carbon-vs-oxide", title: "Carbon vs Oxide: we benchmarked 200-pop wipe day", date: "Apr 02, 2026", category: "Rust", read: "5 min read", excerpt: "We ran identical Rust servers on Carbon and Oxide for a week. Carbon won by 41% on tick rate. Here's the methodology and raw numbers." },
  { slug: "ddos-mitigation-explained", title: "How DDoS mitigation actually works (and why most hosts oversell it)", date: "Mar 21, 2026", category: "Infrastructure", read: "10 min read", excerpt: "Anycast, scrubbing centers, GRE tunnels — explained with diagrams. Plus what 'unlimited DDoS protection' really means in fine print." },
  { slug: "cloud-vps-buyers-guide", title: "Cloud VPS in 2026 — the no-nonsense buyer's guide", date: "Mar 04, 2026", category: "Cloud VPS", read: "12 min read", excerpt: "vCPU vs dedicated cores, NVMe vs SATA SSD, KVM vs LXC — what actually matters and what's just marketing." },
  { slug: "palworld-server-tuning", title: "Tuning a 32-player Palworld server — settings that matter", date: "Feb 12, 2026", category: "Palworld", read: "7 min read", excerpt: "WorldOption.sav explained line-by-line. Spawn rate tweaks, save intervals, and why the default Pal cap will tank your CPU." },
];

function BlogsPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur">
          <Newspaper className="h-3.5 w-3.5" /> Blog
        </span>
        <h1 className="mt-5 font-display text-5xl font-extrabold md:text-6xl">Notes from <span className="gradient-text">the team</span></h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Server-owner guides, infrastructure deep-dives, and the occasional rant. Updated weekly.
        </p>
      </section>

      <Section>
        <Link to="/blogs" className="group block overflow-hidden rounded-3xl border border-border/60 bg-[var(--gradient-card)] p-8 md:p-10 transition-all hover:border-primary/60 hover:shadow-[var(--shadow-glow)]">
          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-full bg-[var(--gradient-primary)] px-3 py-1 font-semibold uppercase tracking-wide text-primary-foreground">Featured</span>
            <span className="text-muted-foreground">{featured.category}</span>
            <span className="text-muted-foreground">·</span>
            <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" /> {featured.date}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{featured.read}</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold md:text-4xl">{featured.title}</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{featured.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
            Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </Section>

      <Section>
        <SectionTitle eyebrow="Latest articles" title="More from the blog" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} to="/blogs" className="group flex flex-col rounded-2xl border border-border/60 bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-secondary/60 px-2.5 py-0.5 font-semibold">{p.category}</span>
                <span>{p.read}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" /> {p.date}
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
