import { Link } from "@tanstack/react-router";
import { ChevronDown, Hexagon, Menu } from "lucide-react";
import { useState } from "react";

type AnyRoute = "/" | "/minecraft" | "/cloud" | "/rdp" | "/pricing" | "/contact";

const menus: { label: string; to?: AnyRoute; items?: { label: string; to: AnyRoute; desc: string }[] }[] = [
  { label: "Minecraft", to: "/minecraft" },
  {
    label: "Games",
    items: [
      { label: "Minecraft", to: "/minecraft", desc: "Java + Bedrock, modpacks" },
      { label: "Palworld", to: "/pricing", desc: "Dedicated Palworld servers" },
      { label: "FiveM / GTA V", to: "/pricing", desc: "Roleplay servers, ESX/QBCore" },
      { label: "Rust", to: "/pricing", desc: "High-pop wipes, Oxide ready" },
      { label: "ARK / Valheim", to: "/pricing", desc: "Survival, mods supported" },
      { label: "CS2 / TF2", to: "/pricing", desc: "Source engine games" },
    ],
  },
  {
    label: "Services",
    items: [
      { label: "Cloud VPS", to: "/cloud", desc: "KVM, NVMe, full root" },
      { label: "Windows RDP", to: "/rdp", desc: "Forex VPS, GPU options" },
      { label: "Dedicated Servers", to: "/pricing", desc: "Bare metal Ryzen / EPYC" },
      { label: "Web Hosting", to: "/pricing", desc: "cPanel + LiteSpeed" },
    ],
  },
  {
    label: "Others",
    items: [
      { label: "Domains", to: "/pricing", desc: "Register & transfer" },
      { label: "Storage VPS", to: "/cloud", desc: "Up to 4 TB HDD" },
      { label: "Discord Bots", to: "/cloud", desc: "24/7 bot hosting" },
      { label: "Affiliate Program", to: "/contact", desc: "Earn 25% recurring" },
    ],
  },
  {
    label: "Tools",
    items: [
      { label: "Server Status", to: "/contact", desc: "Live network status" },
      { label: "Looking Glass", to: "/contact", desc: "Network diagnostics" },
      { label: "MC Ping Checker", to: "/contact", desc: "Test your server ping" },
      { label: "Knowledge Base", to: "/contact", desc: "Guides & tutorials" },
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
            {menus.map((m) =>
              m.items ? (
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
                    <div className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3">
                      <div className="glass rounded-2xl p-2 shadow-[var(--shadow-elevated)]">
                        {m.items.map((it) => (
                          <Link
                            key={it.label}
                            to={it.to}
                            className="block rounded-xl px-3 py-2.5 hover:bg-secondary/60"
                          >
                            <div className="text-sm font-semibold">{it.label}</div>
                            <div className="text-xs text-muted-foreground">{it.desc}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={m.label}
                  to={m.to!}
                  activeProps={{ className: "text-foreground bg-secondary/60" }}
                  inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                  className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
                >
                  {m.label}
                </Link>
              ),
            )}
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
              to="/pricing"
              className="rounded-full bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
            >
              Get Started
            </Link>
            <button
              className="grid h-9 w-9 place-items-center rounded-full bg-secondary/60 lg:hidden"
              onClick={() => setMobile((v) => !v)}
              aria-label="Menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobile && (
          <div className="glass mt-2 rounded-2xl p-3 lg:hidden">
            {menus.map((m) => (
              <div key={m.label} className="py-1">
                {m.to ? (
                  <Link to={m.to} className="block rounded-lg px-3 py-2 text-sm font-semibold hover:bg-secondary/60" onClick={() => setMobile(false)}>
                    {m.label}
                  </Link>
                ) : (
                  <>
                    <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{m.label}</div>
                    {m.items!.map((it) => (
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
