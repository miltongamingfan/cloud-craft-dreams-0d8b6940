import { supabase } from "@/integrations/supabase/client";

export type Category = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  icon: string;
  accent_color: string;
  sort_order: number;
  is_active: boolean;
};

export type Plan = {
  id: string;
  category_id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  price: number;
  currency: string;
  billing_period: string;
  ram: string | null;
  cpu: string | null;
  storage: string | null;
  bandwidth: string | null;
  locations: string[];
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
};

export async function fetchCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function fetchAllCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function fetchCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error) throw error;
  return data as Category | null;
}

export async function fetchPlansByCategory(categoryId: string) {
  const { data, error } = await supabase
    .from("plans")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as Plan[];
}

export async function fetchAllPlans() {
  const { data, error } = await supabase
    .from("plans")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as Plan[];
}

export async function fetchPlan(categorySlug: string, planSlug: string) {
  const cat = await fetchCategoryBySlug(categorySlug);
  if (!cat) return null;
  const { data, error } = await supabase
    .from("plans")
    .select("*")
    .eq("category_id", cat.id)
    .eq("slug", planSlug)
    .eq("is_active", true)
    .maybeSingle();
  if (error) throw error;
  return data ? { plan: data as Plan, category: cat } : null;
}
