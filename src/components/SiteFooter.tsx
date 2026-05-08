import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-background/60 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <h3 className="font-display text-xl font-bold gradient-text">HexoraCloud</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Premium Minecraft, game, Cloud VPS, and Windows RDP hosting powered by NVMe and AMD Ryzen.
          </p>
        </div>
        <FooterCol title="Hosting" items={[["Minecraft", "/minecraft"], ["Cloud VPS", "/cloud"], ["Windows RDP", "/rdp"], ["Pricing", "/pricing"]]} />
        <FooterCol title="Company" items={[["About", "/"], ["Contact", "/contact"], ["Status", "/"], ["Blog", "/"]]} />
        <FooterCol title="Legal" items={[["Terms", "/"], ["Privacy", "/"], ["SLA", "/"], ["Refunds", "/"]]} />
      </div>
      <div className="border-t border-border/60 px-6 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} HexoraCloud. Crafted block by block.
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-foreground">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map(([label, to]) => (
          <li key={label}>
            <Link to={to as "/"} className="hover:text-foreground">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
