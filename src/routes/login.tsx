import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Hexagon } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { title: "Sign in — TigerHost" },
    { name: "description", content: "Sign in or create your TigerHost account." },
  ] }),
  component: LoginPage,
});

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1S8.7 6 12 6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.5 14.6 2.5 12 2.5 6.7 2.5 2.5 6.7 2.5 12s4.2 9.5 9.5 9.5c5.5 0 9.1-3.9 9.1-9.4 0-.6-.1-1.1-.2-1.6L12 10.2z"/>
    </svg>
  );
}

function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setInfo(null); setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.navigate({ to: "/" });
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        // Auto-confirm enabled — sign the user straight in.
        const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
        if (signInErr) {
          setInfo("Account created! You can now sign in.");
          setMode("login");
        } else {
          router.navigate({ to: "/" });
        }
      }
    } catch (e: any) {
      setErr(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setErr(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) { setErr(result.error.message ?? "Google sign-in failed"); return; }
    if (result.redirected) return;
    router.navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen grid place-items-center px-6 py-20">
      <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card/40 p-8 backdrop-blur shadow-[var(--shadow-elevated)]">
        <div className="mb-6 flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--gradient-primary)] shadow-[var(--shadow-glow)]">
            <Hexagon className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </span>
          <div>
            <div className="font-display text-lg font-bold">TigerHost</div>
            <div className="text-xs text-muted-foreground">{mode === "login" ? "Welcome back" : "Create your account"}</div>
          </div>
        </div>

        <button
          onClick={google}
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold hover:bg-secondary"
        >
          <GoogleIcon /> Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or use email <div className="h-px flex-1 bg-border" />
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
          {err && <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm">{err}</div>}
          {info && <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm">{info}</div>}
          <button disabled={loading} className="w-full rounded-xl bg-[var(--gradient-primary)] py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.01] disabled:opacity-60">
            {loading ? "…" : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setErr(null); setInfo(null); }} className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground">
          {mode === "login" ? "New to TigerHost? Sign up" : "Have an account? Sign in"}
        </button>

        <div className="mt-6 border-t border-border/60 pt-4 text-center text-xs text-muted-foreground">
          <Link to="/admin/login" className="hover:text-foreground">Admin login →</Link>
        </div>
      </div>
    </div>
  );
}
