CREATE TABLE public.inventory_cars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL DEFAULT '',
  model TEXT NOT NULL DEFAULT '',
  variant TEXT NOT NULL DEFAULT '',
  year TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '',
  km TEXT NOT NULL DEFAULT '',
  fuel TEXT NOT NULL DEFAULT '',
  trans TEXT NOT NULL DEFAULT '',
  cat TEXT NOT NULL DEFAULT '',
  body_type TEXT NOT NULL DEFAULT '',
  color TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  images TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.inventory_cars TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.inventory_cars TO authenticated;
GRANT ALL ON public.inventory_cars TO service_role;

ALTER TABLE public.inventory_cars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view inventory cars"
ON public.inventory_cars
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Authenticated users can create inventory cars"
ON public.inventory_cars
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update inventory cars"
ON public.inventory_cars
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete inventory cars"
ON public.inventory_cars
FOR DELETE
TO authenticated
USING (true);

CREATE OR REPLACE FUNCTION public.update_inventory_cars_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_inventory_cars_updated_at
BEFORE UPDATE ON public.inventory_cars
FOR EACH ROW
EXECUTE FUNCTION public.update_inventory_cars_updated_at();