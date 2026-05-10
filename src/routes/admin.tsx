import { createFileRoute, Outlet, Link, useRouter, useRouterState } from "@tanstack/react-router";
import { useIsAdmin } from "@/lib/use-admin";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, Package, Layers, LogOut, Hexagon, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

function AdminLayout() {
  const { user, isAdmin, loading } = useIsAdmin();
  const router = useRouter();
  const path = useRouterState({ select: (s) => s.location.pathname });

  // Allow login page through
  if (path === "/admin/login") return <Outlet />;

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading admin…</div>;
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center px-6">
        <div className="max-w-md rounded-3xl border border-border/60 bg-card/40 p-8 text-center backdrop-blur">
          <h1 className="font-display text-2xl font-bold">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">{!user ? "Sign in with an admin account to continue." : "Your account doesn't have admin privileges."}</p>
          <Link to="/admin/login" className="mt-6 inline-block rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  const items = [
    { to: "/admin" as const, label: "Overview", icon: LayoutDashboard, exact: true },
    { to: "/admin/categories" as const, label: "Categories", icon: Layers },
    { to: "/admin/plans" as const, label: "Plans", icon: Package },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 pt-8">
        <aside className="hidden w-60 shrink-0 md:block">
          <div className="sticky top-28 rounded-2xl border border-border/60 bg-card/40 p-3 backdrop-blur">
            <Link to="/" className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--gradient-primary)]">
                <Hexagon className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
              </span>
              <span className="text-sm font-bold">Admin</span>
            </Link>
            <nav className="space-y-1">
              {items.map((it) => {
                const active = it.exact ? path === it.to : path.startsWith(it.to);
                return (
                  <Link
                    key={it.to}
                    to={it.to}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active ? "bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"}`}
                  >
                    <it.icon className="h-4 w-4" /> {it.label}
                  </Link>
                );
              })}
              <Link to="/" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary/60 hover:text-foreground">
                <ExternalLink className="h-4 w-4" /> View site
              </Link>
              <button
                onClick={async () => { await supabase.auth.signOut(); router.navigate({ to: "/admin/login" }); }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </nav>
            <div className="mt-3 border-t border-border/60 pt-3 text-xs text-muted-foreground">
              <div className="px-3">Signed in as</div>
              <div className="px-3 truncate font-medium text-foreground">{user.email}</div>
            </div>
          </div>
        </aside>
        <main className="flex-1 pb-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
