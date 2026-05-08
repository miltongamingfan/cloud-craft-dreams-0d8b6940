import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Hexagon } from "lucide-react";

export const Route = createFileRoute("/admin/login")({ component: LoginPage });

function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setInfo(null); setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setInfo("Account created. Ask the project owner to grant you admin access, then sign in.");
        setMode("login");
      }
    } catch (e: any) {
      setErr(e.message ?? "Something went wrong");
    } finally {
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
            <div className="font-display text-lg font-bold">HexoraCloud Admin</div>
            <div className="text-xs text-muted-foreground">{mode === "login" ? "Sign in to manage plans" : "Create an admin account"}</div>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-input/50 px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Password</label>
            <input required type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-input/50 px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          {err && <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground">{err}</div>}
          {info && <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm">{info}</div>}
          <button disabled={loading} className="w-full rounded-xl bg-[var(--gradient-primary)] py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.01] disabled:opacity-60">
            {loading ? "…" : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setErr(null); setInfo(null); }} className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground">
          {mode === "login" ? "Need an admin account? Sign up" : "Have an account? Sign in"}
        </button>

        <p className="mt-6 border-t border-border/60 pt-4 text-xs text-muted-foreground">
          First time? Sign up, then run this in the database to grant yourself admin:
          <code className="mt-2 block rounded-lg bg-secondary/60 p-2 text-[10px]">INSERT INTO user_roles (user_id, role) SELECT id, 'admin' FROM auth.users WHERE email = 'you@example.com';</code>
        </p>
      </div>
    </div>
  );
}
