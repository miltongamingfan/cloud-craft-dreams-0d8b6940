import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories, fetchAllPlans } from "@/lib/api/plans";
import { Package, Layers, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/")({ component: AdminHome });

function AdminHome() {
  const { data: cats = [] } = useQuery({ queryKey: ["admin-cats"], queryFn: fetchAllCategories });
  const { data: plans = [] } = useQuery({ queryKey: ["admin-plans"], queryFn: fetchAllPlans });

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Overview</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your hosting catalog.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat icon={<Layers className="h-5 w-5" />} label="Categories" value={cats.length} />
        <Stat icon={<Package className="h-5 w-5" />} label="Plans" value={plans.length} />
        <Stat icon={<TrendingUp className="h-5 w-5" />} label="Active plans" value={plans.filter((p) => p.is_active).length} />
      </div>

      <div className="mt-8 rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur">
        <h2 className="font-display text-lg font-bold">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/admin/plans" className="rounded-xl bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">Manage plans</Link>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur">
        <h2 className="font-display text-lg font-bold">Categories</h2>
        <div className="mt-3 divide-y divide-border/60">
          {cats.map((c) => (
            <div key={c.id} className="flex items-center justify-between py-3">
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-xs text-muted-foreground">/{c.slug} · {plans.filter((p) => p.category_id === c.id).length} plans</div>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${c.is_active ? "bg-emerald-500/15 text-emerald-400" : "bg-muted text-muted-foreground"}`}>
                {c.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-[var(--gradient-card)] p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">{icon} {label}</div>
      <div className="mt-2 font-display text-3xl font-extrabold gradient-text">{value}</div>
    </div>
  );
}
