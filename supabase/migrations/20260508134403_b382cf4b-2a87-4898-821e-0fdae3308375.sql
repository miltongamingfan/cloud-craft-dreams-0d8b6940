-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Updated_at helper
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Categories
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  icon TEXT NOT NULL DEFAULT 'Server',
  accent_color TEXT NOT NULL DEFAULT 'from-indigo-500 to-purple-500',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active categories"
  ON public.categories FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can view all categories"
  ON public.categories FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Plans
CREATE TABLE public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  billing_period TEXT NOT NULL DEFAULT 'month',
  ram TEXT,
  cpu TEXT,
  storage TEXT,
  bandwidth TEXT,
  locations TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  features TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  is_popular BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (category_id, slug)
);

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active plans"
  ON public.plans FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can view all plans"
  ON public.plans FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage plans"
  ON public.plans FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_plans_updated_at
  BEFORE UPDATE ON public.plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_plans_category ON public.plans(category_id);
CREATE INDEX idx_plans_active ON public.plans(is_active);

-- Seed categories
INSERT INTO public.categories (slug, name, tagline, description, icon, accent_color, sort_order) VALUES
  ('minecraft', 'Minecraft Hosting', 'Lag-free Java & Bedrock servers', 'High-performance Minecraft hosting with one-click modpacks, free MySQL, daily backups, and Pterodactyl panel access.', 'Box', 'from-emerald-500 to-lime-400', 1),
  ('vps', 'Cloud VPS', 'KVM virtualized cloud servers', 'Full root access KVM Cloud VPS with NVMe storage, snapshots, 10 Gbps uplinks, and instant deployment.', 'Cloud', 'from-indigo-500 to-purple-500', 2),
  ('rdp', 'Windows RDP', 'Dedicated Windows desktops', 'Windows Server 2019/2022 with admin access, GPU options, dedicated IPs — perfect for forex, trading bots, and rendering.', 'Monitor', 'from-sky-500 to-cyan-400', 3);

-- Seed plans
INSERT INTO public.plans (category_id, slug, name, tagline, description, price, ram, cpu, storage, bandwidth, locations, features, is_popular, sort_order) VALUES
  ((SELECT id FROM public.categories WHERE slug='minecraft'), 'dirt', 'Dirt', 'Tiny realms & test servers', 'Perfect for small SMPs and friends. Run vanilla, Paper, or Purpur with great performance.', 2.50, '2 GB', '2 vCore', '15 GB NVMe', 'Unmetered', ARRAY['US-East','EU-West','India'], ARRAY['Up to 10 players','Free subdomain','Pterodactyl panel','Basic DDoS protection','Daily backups','Modpacks supported'], FALSE, 1),
  ((SELECT id FROM public.categories WHERE slug='minecraft'), 'diamond', 'Diamond', 'Most popular for SMPs', 'Our most popular Minecraft plan. Handles 60+ players with modpacks, plugins, and proxies.', 9.00, '6 GB', '4 vCore Ryzen 9', '60 GB NVMe', 'Unmetered', ARRAY['US-East','US-West','EU-West','EU-Central','India','Singapore'], ARRAY['Up to 60 players','Ryzen 9 7950X cores','Premium DDoS','Free MySQL database','Daily backups','One-click modpacks','Custom JAR support','Free subdomain'], TRUE, 2),
  ((SELECT id FROM public.categories WHERE slug='minecraft'), 'netherite', 'Netherite', 'Networks & 200+ players', 'Big communities and Minecraft networks running BungeeCord/Velocity with multiple sub-servers.', 24.00, '16 GB', '6 vCore Dedicated', '200 GB NVMe', 'Unmetered', ARRAY['US-East','US-West','EU-West','EU-Central','India','Singapore'], ARRAY['Unlimited players','Dedicated CPU cores','BungeeCord/Velocity ready','Hourly backups','Priority 24/7 support','Free dedicated IP','Premium DDoS Layer 7'], FALSE, 3),
  ((SELECT id FROM public.categories WHERE slug='vps'), 'cloud-s', 'Cloud S', 'Side projects & dev', 'Lightweight VPS for personal projects, dev environments, and small services.', 5.00, '2 GB', '1 vCPU', '30 GB NVMe', '1 TB transfer', ARRAY['US-East','EU-West','India'], ARRAY['Full root access','KVM virtualization','Choice of Linux distro','Snapshots','API & Terraform','Basic DDoS'], FALSE, 1),
  ((SELECT id FROM public.categories WHERE slug='vps'), 'cloud-l', 'Cloud L', 'Production workloads', 'Production-grade VPS with priority I/O, snapshots, and private networking.', 28.00, '8 GB', '4 vCPU', '160 GB NVMe', '6 TB transfer', ARRAY['US-East','US-West','EU-West','EU-Central','India','Singapore'], ARRAY['Priority I/O','Encrypted snapshots','Private VLAN','Full root access','Floating IPs','Premium DDoS','API + Terraform'], TRUE, 2),
  ((SELECT id FROM public.categories WHERE slug='vps'), 'cloud-xl', 'Cloud XL', 'Heavy workloads', 'Top-tier VPS with dedicated cores and massive bandwidth.', 58.00, '16 GB', '8 vCPU dedicated', '320 GB NVMe', '10 TB transfer', ARRAY['US-East','US-West','EU-West','EU-Central'], ARRAY['Dedicated CPU cores','Encrypted snapshots','Private VLAN','Premium DDoS','Priority support','API + Terraform'], FALSE, 3),
  ((SELECT id FROM public.categories WHERE slug='rdp'), 'rdp-lite', 'RDP Lite', 'Forex VPS', 'Always-on Windows RDP for MT4/MT5, EAs, and trading bots.', 8.00, '4 GB', '2 vCPU', '50 GB NVMe', 'Unmetered', ARRAY['US-East','EU-West','India'], ARRAY['Windows Server 2019','Admin access','Dedicated public IP','MT4/MT5 ready','Low latency to brokers','24/7 monitoring'], FALSE, 1),
  ((SELECT id FROM public.categories WHERE slug='rdp'), 'rdp-pro', 'RDP Pro', 'Power users & devs', 'High-performance Windows desktop in the cloud with admin access.', 18.00, '8 GB', '4 vCPU', '120 GB NVMe', 'Unmetered', ARRAY['US-East','US-West','EU-West','India','Singapore'], ARRAY['Windows Server 2022','Full admin access','Dedicated public IP','NVMe storage','Premium DDoS','Priority setup help'], TRUE, 2),
  ((SELECT id FROM public.categories WHERE slug='rdp'), 'rdp-gpu', 'RDP GPU', 'Render & AI workloads', 'GPU-accelerated Windows RDP for rendering, AI, and 3D workflows.', 79.00, '16 GB', '8 vCPU', '240 GB NVMe', 'Unmetered', ARRAY['US-East','EU-West'], ARRAY['RTX A4000 8GB GPU','Windows Server 2022','GPU drivers preinstalled','Admin access','Dedicated public IP','Priority support'], FALSE, 3);
