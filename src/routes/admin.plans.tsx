import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllCategories, fetchAllPlans, type Plan } from "@/lib/api/plans";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/plans")({ component: AdminPlans });

type Form = {
  id?: string;
  category_id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  ram: string;
  cpu: string;
  storage: string;
  bandwidth: string;
  locations: string;
  features: string;
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
};

const empty = (catId: string): Form => ({
  category_id: catId, slug: "", name: "", tagline: "", description: "",
  price: "0", ram: "", cpu: "", storage: "", bandwidth: "",
  locations: "", features: "", is_popular: false, is_active: true, sort_order: 0,
});

function AdminPlans() {
  const qc = useQueryClient();
  const { data: cats = [] } = useQuery({ queryKey: ["admin-cats"], queryFn: fetchAllCategories });
  const { data: plans = [] } = useQuery({ queryKey: ["admin-plans"], queryFn: fetchAllPlans });

  const [filter, setFilter] = useState<string>("all");
  const [form, setForm] = useState<Form | null>(null);

  const filtered = filter === "all" ? plans : plans.filter((p) => p.category_id === filter);

  const openNew = () => setForm(empty(cats[0]?.id ?? ""));
  const openEdit = (p: Plan) => setForm({
    id: p.id, category_id: p.category_id, slug: p.slug, name: p.name,
    tagline: p.tagline ?? "", description: p.description ?? "",
    price: String(p.price), ram: p.ram ?? "", cpu: p.cpu ?? "", storage: p.storage ?? "", bandwidth: p.bandwidth ?? "",
    locations: p.locations.join(", "), features: p.features.join("\n"),
    is_popular: p.is_popular, is_active: p.is_active, sort_order: p.sort_order,
  });

  const save = async () => {
    if (!form) return;
    const payload = {
      category_id: form.category_id,
      slug: form.slug.trim(),
      name: form.name.trim(),
      tagline: form.tagline || null,
      description: form.description || null,
      price: Number(form.price) || 0,
      ram: form.ram || null,
      cpu: form.cpu || null,
      storage: form.storage || null,
      bandwidth: form.bandwidth || null,
      locations: form.locations.split(",").map((s) => s.trim()).filter(Boolean),
      features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
      is_popular: form.is_popular,
      is_active: form.is_active,
      sort_order: Number(form.sort_order) || 0,
    };
    const { error } = form.id
      ? await supabase.from("plans").update(payload).eq("id", form.id)
      : await supabase.from("plans").insert(payload);
    if (error) { toast.error(error.message); return; }
    toast.success(form.id ? "Plan updated" : "Plan created");
    setForm(null);
    qc.invalidateQueries({ queryKey: ["admin-plans"] });
    qc.invalidateQueries({ queryKey: ["plans"] });
    qc.invalidateQueries({ queryKey: ["all-plans"] });
  };

  const remove = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("plans").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Plan deleted");
    qc.invalidateQueries({ queryKey: ["admin-plans"] });
    qc.invalidateQueries({ queryKey: ["plans"] });
    qc.invalidateQueries({ queryKey: ["all-plans"] });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Plans</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create, edit, and delete hosting plans.</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 rounded-xl bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
          <Plus className="h-4 w-4" /> New plan
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Chip active={filter === "all"} onClick={() => setFilter("all")}>All ({plans.length})</Chip>
        {cats.map((c) => (
          <Chip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
            {c.name} ({plans.filter((p) => p.category_id === c.id).length})
          </Chip>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Specs</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filtered.map((p) => {
              const cat = cats.find((c) => c.id === p.category_id);
              return (
                <tr key={p.id} className="hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 font-semibold">
                      {p.is_popular && <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />}
                      {p.name}
                    </div>
                    <div className="text-xs text-muted-foreground">/{p.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{cat?.name ?? "—"}</td>
                  <td className="px-4 py-3 font-display font-bold">${Number(p.price).toFixed(2)}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{[p.ram, p.cpu, p.storage].filter(Boolean).join(" · ")}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.is_active ? "bg-emerald-500/15 text-emerald-400" : "bg-muted text-muted-foreground"}`}>
                      {p.is_active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-1">
                      <button onClick={() => openEdit(p)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary"><Pencil className="h-3.5 w-3.5" /></button>
                      <button onClick={() => remove(p.id, p.name)} className="grid h-8 w-8 place-items-center rounded-lg text-destructive hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">No plans yet. Create your first one.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {form && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur" onClick={() => setForm(null)}>
          <div className="my-8 w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-elevated)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{form.id ? "Edit plan" : "New plan"}</h2>
              <button onClick={() => setForm(null)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary"><X className="h-4 w-4" /></button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Field label="Category">
                <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} className="w-full rounded-xl border border-border bg-input/50 px-3 py-2.5 text-sm">
                  {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
              <Field label="Sort order"><Input type="number" value={form.sort_order} onChange={(v) => setForm({ ...form, sort_order: Number(v) })} /></Field>
              <Field label="Name"><Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} /></Field>
              <Field label="Slug"><Input value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="diamond" /></Field>
              <Field label="Tagline" full><Input value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} /></Field>
              <Field label="Description" full>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-xl border border-border bg-input/50 px-3 py-2.5 text-sm" />
              </Field>
              <Field label="Price (USD)"><Input type="number" step="0.01" value={form.price} onChange={(v) => setForm({ ...form, price: v })} /></Field>
              <Field label="RAM"><Input value={form.ram} onChange={(v) => setForm({ ...form, ram: v })} placeholder="6 GB" /></Field>
              <Field label="CPU"><Input value={form.cpu} onChange={(v) => setForm({ ...form, cpu: v })} placeholder="4 vCore Ryzen 9" /></Field>
              <Field label="Storage"><Input value={form.storage} onChange={(v) => setForm({ ...form, storage: v })} placeholder="60 GB NVMe" /></Field>
              <Field label="Bandwidth"><Input value={form.bandwidth} onChange={(v) => setForm({ ...form, bandwidth: v })} placeholder="Unmetered" /></Field>
              <Field label="Locations (comma separated)" full><Input value={form.locations} onChange={(v) => setForm({ ...form, locations: v })} placeholder="US-East, EU-West, India" /></Field>
              <Field label="Features (one per line)" full>
                <textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={5} className="w-full rounded-xl border border-border bg-input/50 px-3 py-2.5 text-sm font-mono" />
              </Field>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_popular} onChange={(e) => setForm({ ...form, is_popular: e.target.checked })} /> Mark as popular
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active (visible on site)
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setForm(null)} className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-secondary">Cancel</button>
              <button onClick={save} className="rounded-xl bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
                {form.id ? "Save changes" : "Create plan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} className={`rounded-full px-4 py-1.5 text-sm font-medium ${active ? "bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]" : "border border-border bg-card/40 text-muted-foreground hover:text-foreground"}`}>{children}</button>;
}
function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return <div className={full ? "sm:col-span-2" : ""}><label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</label>{children}</div>;
}
function Input(props: { value: string | number; onChange: (v: string) => void; type?: string; step?: string; placeholder?: string }) {
  return <input type={props.type ?? "text"} step={props.step} value={props.value} placeholder={props.placeholder} onChange={(e) => props.onChange(e.target.value)} className="w-full rounded-xl border border-border bg-input/50 px-3 py-2.5 text-sm outline-none focus:border-primary" />;
}
