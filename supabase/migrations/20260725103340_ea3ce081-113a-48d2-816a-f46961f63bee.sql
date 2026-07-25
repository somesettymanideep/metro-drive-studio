DROP POLICY IF EXISTS "Authenticated users can create inventory cars" ON public.inventory_cars;
DROP POLICY IF EXISTS "Authenticated users can update inventory cars" ON public.inventory_cars;
DROP POLICY IF EXISTS "Authenticated users can delete inventory cars" ON public.inventory_cars;

REVOKE INSERT, UPDATE, DELETE ON public.inventory_cars FROM authenticated;