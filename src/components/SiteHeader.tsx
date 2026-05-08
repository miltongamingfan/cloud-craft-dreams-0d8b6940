import { Link } from "@tanstack/react-router";
import { Cloud } from "lucide-react";

const links = [
  { to: "/" as const, label: "Home" },
  { to: "/minecraft" as const, label: "Minecraft" },
  { to: "/cloud" as const, label: "Cloud VPS" },
  { to: "/rdp" as const, label: "RDP" },
  { to: "/pricing" as const, label: "Pricing" },
  { to: "/contact" as const, label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 shadow-[var(--shadow-elevated)]">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-[var(--gradient-primary)] shadow-[var(--shadow-glow)]">
              <Cloud className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="gradient-text">VoxelHost</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-foreground bg-secondary/60" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/pricing"
            className="rounded-lg bg-[var(--gradient-primary)] px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
