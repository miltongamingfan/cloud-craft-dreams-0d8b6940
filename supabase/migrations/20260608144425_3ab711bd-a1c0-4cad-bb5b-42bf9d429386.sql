CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Recreate RLS policies to reference private.has_role
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can view all categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can manage plans" ON public.plans;
DROP POLICY IF EXISTS "Admins can view all plans" ON public.plans;

CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can view all categories" ON public.categories FOR SELECT
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can manage plans" ON public.plans FOR ALL
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can view all plans" ON public.plans FOR SELECT
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- Drop the public-facing function now that nothing depends on it
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);