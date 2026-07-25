export type InventoryItem = {
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
  bodyType: string;
  color: string;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt?: string;
};

const KEY = "mc_inventory_drafts";
const ADMIN_TOKEN_KEY = "mc_admin_token";

type BackendInventoryRow = {
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

type AdminResponse<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

function rowToInventory(row: BackendInventoryRow): InventoryItem {
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

export function normalizeInventoryItem(r: Partial<InventoryItem>, i = 0): InventoryItem {
  return {
    id: r.id ?? `legacy-${i}-${r.createdAt ?? ""}`,
    name: r.name ?? "",
    brand: r.brand ?? "",
    model: r.model ?? "",
    variant: r.variant ?? "",
    year: r.year ?? "",
    price: r.price ?? "",
    km: r.km ?? "",
    fuel: r.fuel ?? "",
    trans: r.trans ?? "",
    cat: r.cat ?? "",
    bodyType: r.bodyType ?? "",
    color: r.color ?? "",
    description: r.description ?? "",
    images: Array.isArray(r.images) ? r.images : [],
    createdAt: r.createdAt ?? new Date().toISOString(),
    updatedAt: r.updatedAt,
  };
}

function adminToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(ADMIN_TOKEN_KEY) ?? "";
}

function tokenIsValid(token: string): boolean {
  if (!token || !token.includes(".")) return false;
  try {
    const payload = token.split(".")[0];
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "="
    );
    const decoded = JSON.parse(atob(padded)) as { exp?: number };
    return typeof decoded.exp === "number" && decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

/** Admin is only authenticated when a non-expired backend token is present. */
export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("mc_admin") === "1" && tokenIsValid(adminToken());
}

async function callAdmin<T>(payload: Record<string, unknown>): Promise<T> {
  const token = adminToken();
  if (!tokenIsValid(token)) {
    logoutAdmin();
    throw new Error("Your admin session has expired. Please sign in again.");
  }
  const { supabase } = await import("@/integrations/supabase/client");
  const { data, error } = await supabase.functions.invoke<AdminResponse<T>>(
    "admin-inventory",
    { body: { token, ...payload } }
  );
  if (error) throw new Error(error.message);
  if (!data?.ok) {
    if ((data?.error || "").toLowerCase().includes("session")) logoutAdmin();
    throw new Error(data?.error || "Inventory request failed.");
  }
  if (typeof data.data === "undefined") throw new Error("Inventory request returned no data.");
  return data.data;
}

function safeParse(): InventoryItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    // Backfill ids for legacy rows.
    return arr.map((r: Partial<InventoryItem>, i: number) => normalizeInventoryItem(r, i));
  } catch {
    return [];
  }
}

export function listInventory(): InventoryItem[] {
  return safeParse();
}

export async function loginAdmin(username: string, password: string): Promise<void> {
  const { supabase } = await import("@/integrations/supabase/client");
  const { data, error } = await supabase.functions.invoke<AdminResponse<{ token: string }>>(
    "admin-inventory",
    { body: { action: "login", username, password } }
  );
  if (error) throw new Error(error.message);
  if (!data?.ok || !data.data?.token) throw new Error(data?.error || "Invalid credentials.");
  localStorage.setItem(ADMIN_TOKEN_KEY, data.data.token);
  localStorage.setItem("mc_admin", "1");
}

export function logoutAdmin(): void {
  localStorage.removeItem("mc_admin");
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export async function listInventoryRemote(): Promise<InventoryItem[]> {
  const { supabase } = await import("@/integrations/supabase/client");
  const { data, error } = await supabase
    .from("inventory_cars")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return ((data ?? []) as BackendInventoryRow[]).map(rowToInventory);
}

export async function listInventoryAdmin(): Promise<InventoryItem[]> {
  return callAdmin<InventoryItem[]>({ action: "list" });
}

export function getInventoryItem(id: string): InventoryItem | undefined {
  return safeParse().find((r) => r.id === id);
}

export async function getInventoryItemRemote(id: string): Promise<InventoryItem | undefined> {
  const local = getInventoryItem(id);
  if (local) return local;
  const items = await listInventoryAdmin();
  return items.find((r) => r.id === id);
}

export function saveInventoryItem(
  item: Omit<InventoryItem, "id" | "createdAt" | "updatedAt"> & {
    id?: string;
  }
): InventoryItem {
  const all = safeParse();
  const now = new Date().toISOString();
  if (item.id) {
    const idx = all.findIndex((r) => r.id === item.id);
    if (idx >= 0) {
      const updated: InventoryItem = {
        ...all[idx],
        ...item,
        id: item.id,
        updatedAt: now,
      };
      all[idx] = updated;
      localStorage.setItem(KEY, JSON.stringify(all));
      return updated;
    }
  }
  const created: InventoryItem = {
    ...item,
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: now,
  };
  localStorage.setItem(KEY, JSON.stringify([created, ...all]));
  return created;
}

export async function saveInventoryItemRemote(
  item: Omit<InventoryItem, "id" | "createdAt" | "updatedAt"> & {
    id?: string;
  }
): Promise<InventoryItem> {
  const saved = await callAdmin<InventoryItem>({ action: "save", item });
  const all = safeParse().filter((r) => r.id !== saved.id && r.id !== item.id);
  localStorage.setItem(KEY, JSON.stringify([saved, ...all]));
  return saved;
}

export function deleteInventoryItem(id: string): void {
  const all = safeParse().filter((r) => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export async function deleteInventoryItemRemote(id: string): Promise<void> {
  await callAdmin<{ deleted: boolean }>({ action: "delete", id });
  deleteInventoryItem(id);
}

export async function syncLocalInventoryToBackend(): Promise<number> {
  const localItems = safeParse();
  if (!localItems.length || !adminToken()) return 0;
  let synced = 0;
  for (const item of localItems) {
    try {
      await saveInventoryItemRemote(item);
      synced += 1;
    } catch {
      // Keep any failed local rows so they can be retried later.
    }
  }
  if (synced === localItems.length) localStorage.removeItem(KEY);
  return synced;
}