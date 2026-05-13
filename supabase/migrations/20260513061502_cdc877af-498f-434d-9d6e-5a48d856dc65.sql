INSERT INTO public.categories (slug, name, tagline, description, icon, accent_color, sort_order, is_active)
VALUES ('special-offers', 'Special Offers', 'Limited-time deals & discounts', 'Hand-picked seasonal deals, discounts, and bundles across Minecraft, VPS, and RDP — managed live by our team.', 'Sparkles', 'from-pink-500 to-amber-400', 50, true)
ON CONFLICT (slug) DO NOTHING;