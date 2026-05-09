import { Link } from "@tanstack/react-router";
import { ChevronDown, Hexagon, Menu, X } from "lucide-react";
import { useState } from "react";

type AnyRoute =
  | "/" | "/minecraft" | "/cloud" | "/rdp" | "/pricing" | "/contact"
  | "/about" | "/buy" | "/partner" | "/legal" | "/payment" | "/branding" | "/blogs"
  | "/services" | "/services/vps" | "/services/rdp" | "/services/minecraft";

type LinkItem = { label: string; to: AnyRoute; desc?: string };
type GameItem = { label: string; slug: string; desc: string };
type ToolItem = { label: string; slug: string; desc: string };

type Menu =
  | { label: "Minecraft"; to: AnyRoute }
  | { label: "Games"; games: GameItem[] }
  | { label: "Services"; items: LinkItem[] }
  | { label: "Others"; items: LinkItem[] }
  | { label: "Tools"; tools: ToolItem[] };

const menus: Menu[] = [
  { label: "Minecraft", to: "/minecraft" },
  {
    label: "Games",
    games: [
      { label: "Minecraft", slug: "minecraft", desc: "Java + Bedrock, modpacks" },
      { label: "Palworld", slug: "palworld", desc: "Catch & build at 60 FPS" },
      { label: "FiveM / GTA V", slug: "fivem", desc: "ESX, QBCore, qb-target" },
      { label: "Rust", slug: "rust", desc: "Carbon-powered, wipe ready" },
      { label: "ARK: Survival", slug: "ark", desc: "ASE + ASA, clusters" },
      { label: "CS2", slug: "cs2", desc: "128-tick, MatchZy ready" },
      { label: "Valheim", slug: "valheim", desc: "Crossplay, BepInEx" },
      { label: "Terraria", slug: "terraria", desc: "tShock, TModLoader" },
      { label: "Garry's Mod", slug: "garrys-mod", desc: "DarkRP, TTT, sandbox" },
      { label: "Satisfactory", slug: "satisfactory", desc: "Factory building" },
      { label: "7 Days to Die", slug: "7-days-to-die", desc: "Horde nights, mods" },
      { label: "Project Zomboid", slug: "project-zomboid", desc: "32-player apocalypse" },
    ],
  },
  {
    label: "Services",
    items: [
      { label: "Minecraft Hosting", to: "/minecraft", desc: "Java + Bedrock, modpacks, networks" },
      { label: "Cloud VPS", to: "/cloud", desc: "KVM, NVMe, full root" },
      { label: "Windows RDP", to: "/rdp", desc: "Forex, GPU, dedicated IP" },
      { label: "All plans", to: "/pricing", desc: "Compare every plan side by side" },
    ],
  },
  {
    label: "Others",
    items: [
      { label: "About Us", to: "/about", desc: "Who we are & why we host" },
      { label: "Affiliate / Partner", to: "/partner", desc: "Earn 25% recurring" },
      { label: "Contact Us", to: "/contact", desc: "Talk to support or sales" },
      { label: "Legal Policies", to: "/legal", desc: "ToS, Privacy, AUP, SLA" },
      { label: "Payment Methods", to: "/payment", desc: "Cards, PayPal, crypto, UPI" },
      { label: "Branding", to: "/branding", desc: "Logos, colors, brand kit" },
      { label: "Blog", to: "/blogs", desc: "Guides, tutorials, deep-dives" },
    ],
  },
  {
    label: "Tools",
    tools: [
      { label: "Minecraft Tools", slug: "minecraft", desc: "Status, MOTD, UUID, skins" },
      { label: "FiveM Tools", slug: "fivem", desc: "Artifacts, recipes, Steam IDs" },
      { label: "Looking Glass", slug: "looking-glass", desc: "Latency from every region" },
    ],
  },
];

const currencies = ["USD ($)", "EUR (€)", "INR (₹)", "GBP (£)"];

export function SiteHeader() {
  const [open, setOpen] = useState<string | null>(null);
  const [cur, setCur] = useState("USD ($)");
  const [curOpen, setCurOpen] = useState(false);
  const [mobile, setMobile] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <div className="glass relative flex items-center justify-between gap-2 rounded-full px-3 py-2 shadow-[var(--shadow-elevated)]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 pl-2 pr-3 font-display font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--gradient-primary)] shadow-[var(--shadow-glow)]">
              <Hexagon className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-extrabold tracking-tight">HexoraCloud</span>
              <span className="block text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Hosting Redefined</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {menus.map((m) => {
              if (m.label === "Minecraft") {
                return (
                  <Link
                    key={m.label}
                    to={m.to}
                    activeProps={{ className: "text-foreground bg-secondary/60" }}
                    inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                    className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
                  >
                    {m.label}
                  </Link>
                );
              }
              return (
                <div
                  key={m.label}
                  className="relative"
                  onMouseEnter={() => setOpen(m.label)}
                  onMouseLeave={() => setOpen(null)}
                >
                  <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                    {m.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open === m.label ? "rotate-180" : ""}`} />
                  </button>
                  {open === m.label && (
                    <div className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 ${m.label === "Games" ? "w-[640px]" : "w-80"}`}>
                      <div className={`glass rounded-2xl p-2 shadow-[var(--shadow-elevated)] ${m.label === "Games" ? "grid grid-cols-2 gap-1" : ""}`}>
                        {m.label === "Games" && m.games.map((g) => (
                          <Link
                            key={g.slug}
                            to="/games/$slug"
                            params={{ slug: g.slug }}
                            className="block rounded-xl px-3 py-2.5 hover:bg-secondary/60"
                          >
                            <div className="text-sm font-semibold">{g.label}</div>
                            <div className="text-xs text-muted-foreground">{g.desc}</div>
                          </Link>
                        ))}
                        {m.label === "Tools" && m.tools.map((t) => (
                          <Link
                            key={t.slug}
                            to="/tools/$slug"
                            params={{ slug: t.slug }}
                            className="block rounded-xl px-3 py-2.5 hover:bg-secondary/60"
                          >
                            <div className="text-sm font-semibold">{t.label}</div>
                            <div className="text-xs text-muted-foreground">{t.desc}</div>
                          </Link>
                        ))}
                        {(m.label === "Services" || m.label === "Others") && m.items.map((it) => (
                          <Link
                            key={it.label}
                            to={it.to}
                            className="block rounded-xl px-3 py-2.5 hover:bg-secondary/60"
                          >
                            <div className="text-sm font-semibold">{it.label}</div>
                            {it.desc && <div className="text-xs text-muted-foreground">{it.desc}</div>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Currency + CTA */}
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <button
                onClick={() => setCurOpen((v) => !v)}
                className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {cur}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${curOpen ? "rotate-180" : ""}`} />
              </button>
              {curOpen && (
                <div className="glass absolute right-0 top-full mt-2 w-36 rounded-2xl p-1.5">
                  {currencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => { setCur(c); setCurOpen(false); }}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-secondary/60"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/buy"
              className="rounded-full bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
            >
              Get Started
            </Link>
            <button
              className="grid h-9 w-9 place-items-center rounded-full bg-secondary/60 lg:hidden"
              onClick={() => setMobile((v) => !v)}
              aria-label="Menu"
            >
              {mobile ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobile && (
          <div className="glass mt-2 max-h-[80vh] overflow-y-auto rounded-2xl p-3 lg:hidden">
            {menus.map((m) => (
              <div key={m.label} className="py-1">
                {m.label === "Minecraft" ? (
                  <Link to={m.to} className="block rounded-lg px-3 py-2 text-sm font-semibold hover:bg-secondary/60" onClick={() => setMobile(false)}>
                    {m.label}
                  </Link>
                ) : (
                  <>
                    <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{m.label}</div>
                    {m.label === "Games" && m.games.map((g) => (
                      <Link key={g.slug} to="/games/$slug" params={{ slug: g.slug }} className="block rounded-lg px-3 py-2 text-sm hover:bg-secondary/60" onClick={() => setMobile(false)}>
                        {g.label}
                      </Link>
                    ))}
                    {m.label === "Tools" && m.tools.map((t) => (
                      <Link key={t.slug} to="/tools/$slug" params={{ slug: t.slug }} className="block rounded-lg px-3 py-2 text-sm hover:bg-secondary/60" onClick={() => setMobile(false)}>
                        {t.label}
                      </Link>
                    ))}
                    {(m.label === "Services" || m.label === "Others") && m.items.map((it) => (
                      <Link key={it.label} to={it.to} className="block rounded-lg px-3 py-2 text-sm hover:bg-secondary/60" onClick={() => setMobile(false)}>
                        {it.label}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
