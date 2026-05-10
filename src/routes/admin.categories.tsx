import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllCategories, type Category } from "@/lib/api/plans";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/categories")({ component: AdminCategories });

type Form = {
  id?: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accent_color: string;
  sort_order: number;
  is_active: boolean;
};

const empty = (): Form => ({
  slug: "", name: "", tagline: "", description: "",
  icon: "Server", accent_color: "from-indigo-500 to-purple-500",
  sort_order: 0, is_active: true,
});

function AdminCategories() {
  const qc = useQueryClient();
  const { data: cats = [] } = useQuery({ queryKey: ["admin-cats"], queryFn: fetchAllCategories });
  const [form, setForm] = useState<Form | null>(null);

  const openEdit = (c: Category) => setForm({
    id: c.id, slug: c.slug, name: c.name,
    tagline: c.tagline ?? "", description: c.description ?? "",
    icon: c.icon, accent_color: c.accent_color,
    sort_order: c.sort_order, is_active: c.is_active,
  });

  const save = async () => {
    if (!form) return;
    const payload = {
      slug: form.slug.trim(),
      name: form.name.trim(),
      tagline: form.tagline || null,
      description: form.description || null,
      icon: form.icon.trim() || "Server",
      accent_color: form.accent_color.trim() || "from-indigo-500 to-purple-500",
      sort_order: Number(form.sort_order) || 0,
      is_active: form.is_active,
    };
    const { error } = form.id
      ? await supabase.from("categories").update(payload).eq("id", form.id)
      : await supabase.from("categories").insert(payload);
    if (error) { toast.error(error.message); return; }
    toast.success(form.id ? "Category updated" : "Category created");
    setForm(null);
    qc.invalidateQueries({ queryKey: ["admin-cats"] });
    qc.invalidateQueries({ queryKey: ["category"] });
  };

  const remove = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? Plans using this category will become unreachable.`)) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Category deleted");
    qc.invalidateQueries({ queryKey: ["admin-cats"] });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Categories</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create, edit, and delete service categories.</p>
        </div>
        <button onClick={() => setForm(empty())} className="inline-flex items-center gap-2 rounded-xl bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
          <Plus className="h-4 w-4" /> New category
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Slug</th>
              <th className="px-4 py-3 text-left">Icon</th>
              <th className="px-4 py-3 text-left">Sort</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {cats.map((c) => (
              <tr key={c.id} className="hover:bg-secondary/30">
                <td className="px-4 py-3 font-semibold">{c.name}<div className="text-xs text-muted-foreground">{c.tagline}</div></td>
                <td className="px-4 py-3 text-muted-foreground">/{c.slug}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.icon}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.sort_order}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${c.is_active ? "bg-emerald-500/15 text-emerald-400" : "bg-muted text-muted-foreground"}`}>
                    {c.is_active ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-1">
                    <button onClick={() => openEdit(c)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary"><Pencil className="h-3.5 w-3.5" /></button>
                    <button onClick={() => remove(c.id, c.name)} className="grid h-8 w-8 place-items-center rounded-lg text-destructive hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {cats.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">No categories yet. Create your first one.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {form && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur" onClick={() => setForm(null)}>
          <div className="my-8 w-full max-w-xl rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-elevated)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{form.id ? "Edit category" : "New category"}</h2>
              <button onClick={() => setForm(null)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Field label="Name"><Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} /></Field>
              <Field label="Slug"><Input value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="vps" /></Field>
              <Field label="Tagline" full><Input value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} /></Field>
              <Field label="Description" full>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-xl border border-border bg-input/50 px-3 py-2.5 text-sm" />
              </Field>
              <Field label="Icon (lucide name)"><Input value={form.icon} onChange={(v) => setForm({ ...form, icon: v })} placeholder="Server" /></Field>
              <Field label="Accent gradient"><Input value={form.accent_color} onChange={(v) => setForm({ ...form, accent_color: v })} placeholder="from-indigo-500 to-purple-500" /></Field>
              <Field label="Sort order"><Input type="number" value={form.sort_order} onChange={(v) => setForm({ ...form, sort_order: Number(v) })} /></Field>
              <label className="flex items-center gap-2 text-sm sm:col-span-1">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setForm(null)} className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-secondary">Cancel</button>
              <button onClick={save} className="rounded-xl bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
                {form.id ? "Save changes" : "Create category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return <div className={full ? "sm:col-span-2" : ""}><label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</label>{children}</div>;
}
function Input(props: { value: string | number; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return <input type={props.type ?? "text"} value={props.value} placeholder={props.placeholder} onChange={(e) => props.onChange(e.target.value)} className="w-full rounded-xl border border-border bg-input/50 px-3 py-2.5 text-sm outline-none focus:border-primary" />;
}
