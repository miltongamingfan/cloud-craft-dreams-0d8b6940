import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionTitle } from "@/components/site/Sections";
import { Cpu, Shield, Zap, Globe, Heart, Users, MessageCircle, ExternalLink, Server, Award, Headphones } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — HexoraCloud" },
      { name: "description", content: "HexoraCloud powers Minecraft servers, Cloud VPS, and Windows RDP for thousands of creators worldwide. Meet the team and join our Discord." },
      { property: "og:title", content: "About HexoraCloud — Hosting, Redefined" },
      { property: "og:description", content: "We build the fastest, friendliest hosting on the planet. Minecraft, VPS, and RDP that just works." },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { value: "6,500+", label: "Active servers" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "12+", label: "Global regions" },
  { value: "<5 min", label: "Avg support reply" },
];

const values = [
  { icon: Zap, title: "Performance first", desc: "Ryzen 9 CPUs, Gen4 NVMe, and 10 Gbps uplinks. We don't oversell — every plan flies." },
  { icon: Shield, title: "Always protected", desc: "Enterprise-grade DDoS mitigation up to 1.5 Tbps. Always on. Always free." },
  { icon: Heart, title: "Human support", desc: "Real engineers on chat and Discord 24/7. No bots pretending to help — actual humans who play the games you host." },
  { icon: Globe, title: "Truly global", desc: "12+ regions across North America, Europe, Asia, Brazil, and Australia. Pick the closest, get the lowest ping." },
  { icon: Cpu, title: "Built to scale", desc: "From your first 1 GB Minecraft realm to a 64-core dedicated cluster — same dashboard, same support, no migrations." },
  { icon: Award, title: "Earned, not bought", desc: "4.9/5 average across 6,500+ verified reviews. We're proud of every star and we work for the next one." },
];

const discords = [
  { label: "HexoraCloud Main Discord", url: "https://discord.gg/tsAHsJFB", desc: "Announcements, support tickets & order pickup" },
  { label: "HexoraCloud Community", url: "https://discord.gg/7Dr7PgpqJ", desc: "Players, builders, and devs hanging out 24/7" },
];

function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur">
          <Users className="h-3.5 w-3.5" /> About HexoraCloud
        </span>
        <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] md:text-6xl">
          Hosting built by gamers, <span className="gradient-text">for everyone</span> who builds online.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          HexoraCloud started as a side-project to host a Minecraft SMP for a small group of friends. Today we power
          <span className="text-foreground font-semibold"> 6,500+ servers</span> across the planet — Minecraft realms,
          gaming networks, indie startups, forex traders, and Discord bots that never sleep.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          We obsess over three things: raw performance, rock-solid uptime, and support that actually feels human.
          Everything else — the prices, the dashboards, the one-click installers — is built around those.
        </p>
      </section>

      <Section className="pt-4">
        <div className="grid gap-4 rounded-3xl border border-border/60 bg-[var(--gradient-card)] p-6 sm:grid-cols-4 md:p-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-extrabold gradient-text md:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="What we stand for" title="Six promises we keep, every single day." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="group rounded-2xl border border-border/60 bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="overflow-hidden rounded-3xl border border-border/60 bg-[var(--gradient-card)] p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#5865F2]/15 px-3 py-1 text-xs font-semibold text-[#a3acff]">
                <MessageCircle className="h-3.5 w-3.5" /> Join the community
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold md:text-4xl">
                Come hang out on <span className="gradient-text">Discord</span>
              </h2>
              <p className="mt-3 text-muted-foreground">
                Tickets, support, sneak-peeks, sales, giveaways — everything happens on Discord.
                Both servers below are official.
              </p>
              <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                <Headphones className="h-3.5 w-3.5" /> Average ticket reply: under 5 minutes.
              </div>
            </div>
            <div className="grid gap-3">
              {discords.map((d) => (
                <a
                  key={d.url}
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/60 px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#5865F2]/20 text-[#a3acff]">
                      <MessageCircle className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-semibold">{d.label}</div>
                      <div className="text-xs text-muted-foreground">{d.desc}</div>
                      <div className="mt-0.5 text-[11px] text-accent">{d.url.replace("https://", "")}</div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-border/60 bg-card/40 p-10 text-center md:p-14">
          <Server className="mx-auto h-10 w-10 text-accent" />
          <h2 className="mt-4 font-display text-3xl font-extrabold md:text-4xl">Ready to launch?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Browse plans, pick one that fits, and our team will have you online in minutes.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/pricing" className="rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">
              See plans
            </Link>
            <Link to="/buy" className="rounded-xl border border-border bg-card/40 px-6 py-3 font-semibold backdrop-blur hover:bg-card/70">
              How to buy
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
