GRANT SELECT ON public.inventory_cars TO anon;
GRANT SELECT ON public.inventory_cars TO authenticated;
GRANT ALL ON public.inventory_cars TO service_role;
REVOKE INSERT, UPDATE, DELETE ON public.inventory_cars FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.inventory_cars FROM authenticated;