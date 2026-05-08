import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Ticket, ArrowLeft, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "How to Buy — HexoraCloud" },
      { name: "description", content: "To buy services join our Discord servers and create a ticket." },
    ],
  }),
  component: BuyPage,
});

const discords = [
  { label: "HexoraCloud Main Discord", url: "https://discord.gg/tsAHsJFB" },
  { label: "HexoraCloud Community", url: "https://discord.gg/7Dr7PgpqJ" },
];

function BuyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-20 pb-24">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back home
      </Link>

      <div className="animate-rise mt-8 rounded-3xl border border-border/60 bg-[var(--gradient-card)] p-10 text-center shadow-[var(--shadow-elevated)] backdrop-blur md:p-14">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--gradient-primary)] shadow-[var(--shadow-glow)]">
          <Ticket className="h-7 w-7 text-primary-foreground" />
        </div>

        <h1 className="mt-6 font-display text-4xl font-extrabold md:text-5xl">
          Almost there — <span className="gradient-text">one quick step</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg text-foreground/90">
          To buy services, join our Discord servers and create a ticket.
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Our staff will set up your server, take payment, and have you online within minutes.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {discords.map((d) => (
            <a
              key={d.url}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card/60 px-5 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#5865F2]/20 text-[#8b94f7]">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold">{d.label}</div>
                  <div className="text-xs text-muted-foreground">{d.url.replace("https://", "")}</div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            </a>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border/60 bg-card/40 p-5 text-left text-sm text-muted-foreground">
          <div className="font-semibold text-foreground">How it works</div>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>Click one of the Discord links above and join the server.</li>
            <li>Open the <span className="font-semibold text-foreground">#create-ticket</span> channel.</li>
            <li>Tell us the plan you want — we'll handle the rest.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
