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

function safeParse(): InventoryItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    // Backfill ids for legacy rows.
    return arr.map((r: Partial<InventoryItem>, i: number) => ({
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
    }));
  } catch {
    return [];
  }
}

export function listInventory(): InventoryItem[] {
  return safeParse();
}

export function getInventoryItem(id: string): InventoryItem | undefined {
  return safeParse().find((r) => r.id === id);
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

export function deleteInventoryItem(id: string): void {
  const all = safeParse().filter((r) => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}