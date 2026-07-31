import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type InventoryItem = {
  id?: string;
  name: string;
  brand: string;
  model: string;
  variant: string;
  year: string;
  price: string;
  km: string;
  fuel: string;
  trans: string;
  cat: string;
  bodyType: string;
  color: string;
  description: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
};

type InventoryRow = {
  id: string;
  name: string;
  brand: string;
  model: string;
  variant: string;
  year: string;
  price: string;
  km: string;
  fuel: string;
  trans: string;
  cat: string;
  body_type: string;
  color: string;
  description: string;
  images: string[];
  created_at: string;
  updated_at: string;
};

const encoder = new TextEncoder();
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function base64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  return atob(padded);
}

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return base64Url(new Uint8Array(signature));
}

async function createToken(secret: string) {
  const payload = base64Url(
    encoder.encode(
      JSON.stringify({ sub: "metro-admin", exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 14 }),
    ),
  );
  return `${payload}.${await sign(payload, secret)}`;
}

async function verifyToken(token: unknown, secret: string) {
  if (typeof token !== "string" || !token.includes(".")) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = await sign(payload, secret);
  if (signature !== expected) return false;
  try {
    const decoded = JSON.parse(decodeBase64Url(payload)) as { exp?: number; sub?: string };
    return decoded.sub === "metro-admin" && typeof decoded.exp === "number" && decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

function rowToItem(row: InventoryRow): InventoryItem {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    model: row.model,
    variant: row.variant,
    year: row.year,
    price: row.price,
    km: row.km,
    fuel: row.fuel,
    trans: row.trans,
    cat: row.cat,
    bodyType: row.body_type,
    color: row.color,
    description: row.description,
    images: Array.isArray(row.images) ? row.images : [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function itemToRow(item: InventoryItem) {
  const row: Record<string, unknown> = {
    name: item.name?.trim() || "Untitled Car",
    brand: item.brand ?? "",
    model: item.model ?? "",
    variant: item.variant ?? "",
    year: item.year ?? "",
    price: item.price ?? "",
    km: item.km ?? "",
    fuel: item.fuel ?? "",
    trans: item.trans ?? "",
    cat: item.cat ?? "",
    body_type: item.bodyType ?? "",
    color: item.color ?? "",
    description: item.description ?? "",
    images: Array.isArray(item.images) ? item.images.filter(Boolean) : [],
  };

  if (item.id && uuidPattern.test(item.id)) row.id = item.id;
  return row;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const adminUsername = Deno.env.get("METRO_ADMIN_USERNAME");
  const adminPassword = Deno.env.get("METRO_ADMIN_PASSWORD");
  const adminSecret = Deno.env.get("METRO_ADMIN_API_SECRET");

  if (!supabaseUrl || !serviceKey || !adminUsername || !adminPassword || !adminSecret) {
    return json({ ok: false, error: "Admin inventory backend is not configured." }, 500);
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  if (body.action === "login") {
    if (body.username === adminUsername && body.password === adminPassword) {
      return json({ ok: true, data: { token: await createToken(adminSecret) } });
    }
    return json({ ok: false, error: "Invalid credentials." }, 401);
  }

  const authorized = await verifyToken(body.token, adminSecret);
  if (!authorized) return json({ ok: false, error: "Admin session expired. Please sign in again." }, 401);

  const client = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (body.action === "list") {
    const { data, error } = await client
      .from("inventory_cars")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return json({ ok: false, error: error.message }, 500);
    return json({ ok: true, data: ((data ?? []) as InventoryRow[]).map(rowToItem) });
  }

  if (body.action === "save") {
    const item = body.item as InventoryItem | undefined;
    if (!item || !item.name?.trim()) return json({ ok: false, error: "Car name is required." }, 400);
    const row = itemToRow(item);
    const query = row.id
      ? client.from("inventory_cars").upsert(row).select("*").single()
      : client.from("inventory_cars").insert(row).select("*").single();
    const { data, error } = await query;
    if (error) return json({ ok: false, error: error.message }, 500);
    return json({ ok: true, data: rowToItem(data as InventoryRow) });
  }

  if (body.action === "delete") {
    const id = typeof body.id === "string" ? body.id : "";
    if (!uuidPattern.test(id)) return json({ ok: true, data: { deleted: true } });
    const { error } = await client.from("inventory_cars").delete().eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 500);
    return json({ ok: true, data: { deleted: true } });
  }

  if (body.action === "enquiries_list") {
    const { data, error } = await client
      .from("contact_enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return json({ ok: false, error: error.message }, 500);
    return json({ ok: true, data: data ?? [] });
  }

  if (body.action === "enquiry_mark") {
    const id = typeof body.id === "string" ? body.id : "";
    if (!uuidPattern.test(id)) return json({ ok: false, error: "Invalid enquiry id." }, 400);
    const { error } = await client
      .from("contact_enquiries")
      .update({ is_read: Boolean(body.isRead) })
      .eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 500);
    return json({ ok: true, data: { updated: true } });
  }

  if (body.action === "enquiry_delete") {
    const id = typeof body.id === "string" ? body.id : "";
    if (!uuidPattern.test(id)) return json({ ok: true, data: { deleted: true } });
    const { error } = await client.from("contact_enquiries").delete().eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 500);
    return json({ ok: true, data: { deleted: true } });
  }

  return json({ ok: false, error: "Unknown action." }, 400);
});