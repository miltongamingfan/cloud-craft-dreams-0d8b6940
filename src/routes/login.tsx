import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Hexagon } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { title: "Sign in — TigerHost" },
    { name: "description", content: "Sign in or create your TigerHost account." },
  ] }),
  component: LoginPage,
});


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
