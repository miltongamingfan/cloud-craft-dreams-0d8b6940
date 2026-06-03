import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Hexagon } from "lucide-react";

export const Route = createFileRoute("/admin/login")({ component: LoginPage });

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      const email = username.includes("@") ? username.trim() : `${username.trim().toLowerCase()}@hexora.admin`;
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!data.user) throw new Error("Sign in failed");

      // Verify admin role before letting them in
      const { data: roleRow, error: roleErr } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (roleErr) throw roleErr;
      if (!roleRow) {
        await supabase.auth.signOut();
        throw new Error("This account is not an admin.");
      }

      // Hard navigation — avoids any stale auth state in the router/layout.
      window.location.assign("/admin");
    } catch (e: any) {
      setErr(e.message ?? "Invalid username or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-6 py-20">
      <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card/40 p-8 backdrop-blur shadow-[var(--shadow-elevated)]">
        <div className="mb-6 flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--gradient-primary)] shadow-[var(--shadow-glow)]">
            <Hexagon className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </span>
          <div>
            <div className="font-display text-lg font-bold">TigerHost Admin</div>
            <div className="text-xs text-muted-foreground">Sign in to manage plans</div>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Username</label>
            <input required autoFocus value={username} onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="w-full rounded-xl border border-border bg-input/50 px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-xl border border-border bg-input/50 px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          {err && <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground">{err}</div>}
          <button disabled={loading} className="w-full rounded-xl bg-[var(--gradient-primary)] py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.01] disabled:opacity-60">
            {loading ? "…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
