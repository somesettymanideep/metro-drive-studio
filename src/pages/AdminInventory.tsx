import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Car as CarIcon,
  Image as ImageIcon,
  AlertTriangle,
} from "lucide-react";
import {
  listInventory,
  deleteInventoryItem,
  type InventoryItem,
} from "@/lib/inventoryStore";
import { AdminTopBar } from "./AddInventory";

export default function AdminInventory() {
  const navigate = useNavigate();
  const authed =
    typeof window !== "undefined" && localStorage.getItem("mc_admin") === "1";

  const [items, setItems] = useState<InventoryItem[]>([]);
  const [query, setQuery] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setItems(listInventory());
  }, []);

  if (!authed) return <Navigate to="/login" replace />;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      [i.name, i.brand, i.model, i.variant, i.year, i.color]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [items, query]);

  const onDelete = (id: string) => {
    setDeleting(true);
    setTimeout(() => {
      deleteInventoryItem(id);
      setItems(listInventory());
      setDeleting(false);
      setConfirmId(null);
      toast.success("Car removed from inventory.");
    }, 250);
  };

  const logout = () => {
    localStorage.removeItem("mc_admin");
    navigate("/login");
  };

  const target = confirmId ? items.find((i) => i.id === confirmId) : null;

  return (
    <main className="min-h-dvh bg-neutral-50">
      <Helmet>
        <title>Manage Inventory | Metro Cars Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <AdminTopBar onLogout={logout} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 flex items-center gap-2">
              <CarIcon className="size-7 text-[var(--brand-orange)]" aria-hidden="true" />
              Manage Inventory
            </h1>
            <p className="text-neutral-500 mt-1 text-sm">
              {items.length} {items.length === 1 ? "car" : "cars"} saved in this browser.
            </p>
          </div>
          <Link
            to="/admin/add-inventory"
            className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-lg font-semibold text-white shadow transition hover:scale-[1.01]"
            style={{ background: "var(--gradient-orange)" }}
          >
            <Plus className="size-4" aria-hidden="true" /> Add new car
          </Link>
        </div>

        <div className="mb-5">
          <label htmlFor="inv-search" className="sr-only">
            Search inventory
          </label>
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400"
              aria-hidden="true"
            />
            <input
              id="inv-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, brand, model..."
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[var(--brand-orange)] focus:ring-2 focus:ring-[var(--brand-orange)]/20 transition"
            />
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyState />
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-xl p-10 text-center">
            <p className="text-neutral-600">
              No cars match "<span className="font-semibold">{query}</span>".
            </p>
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <caption className="sr-only">Saved inventory</caption>
                <thead className="bg-neutral-50 text-neutral-500 uppercase text-[11px] tracking-wider">
                  <tr>
                    <th scope="col" className="text-left px-4 py-3 font-semibold">Car</th>
                    <th scope="col" className="text-left px-4 py-3 font-semibold hidden md:table-cell">Year</th>
                    <th scope="col" className="text-left px-4 py-3 font-semibold hidden md:table-cell">Fuel / Trans</th>
                    <th scope="col" className="text-left px-4 py-3 font-semibold hidden sm:table-cell">KM</th>
                    <th scope="col" className="text-left px-4 py-3 font-semibold">Price</th>
                    <th scope="col" className="text-right px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-neutral-50/60 transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-400 shrink-0">
                            <ImageIcon className="size-4" aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-neutral-900 truncate">
                              {item.name || `${item.brand} ${item.model}`}
                            </p>
                            <p className="text-xs text-neutral-500 truncate">
                              {item.variant || item.brand}
                              {item.color ? ` • ${item.color}` : ""}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-neutral-700 hidden md:table-cell">{item.year}</td>
                      <td className="px-4 py-3 text-neutral-700 hidden md:table-cell">
                        {item.fuel} / {item.trans}
                      </td>
                      <td className="px-4 py-3 text-neutral-700 hidden sm:table-cell">{item.km}</td>
                      <td className="px-4 py-3 font-semibold text-neutral-900">{item.price}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/add-inventory?edit=${encodeURIComponent(item.id)}`}
                            aria-label={`Edit ${item.name}`}
                            className="inline-flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-lg border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 transition"
                          >
                            <Pencil className="size-3.5" aria-hidden="true" /> Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => setConfirmId(item.id)}
                            aria-label={`Delete ${item.name}`}
                            className="inline-flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                          >
                            <Trash2 className="size-3.5" aria-hidden="true" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {target && (
        <ConfirmDialog
          title="Delete this car?"
          description={`"${target.name || `${target.brand} ${target.model}`}" will be permanently removed from your inventory. This cannot be undone.`}
          confirmLabel={deleting ? "Deleting..." : "Delete"}
          busy={deleting}
          onCancel={() => !deleting && setConfirmId(null)}
          onConfirm={() => onDelete(target.id)}
        />
      )}
    </main>
  );
}

function EmptyState() {
  return (
    <div className="bg-white border border-dashed border-neutral-300 rounded-xl p-10 md:p-14 text-center">
      <div className="mx-auto size-14 rounded-full bg-orange-50 flex items-center justify-center mb-4">
        <CarIcon className="size-7 text-[var(--brand-orange)]" aria-hidden="true" />
      </div>
      <h2 className="text-lg font-bold text-neutral-900">No cars yet</h2>
      <p className="text-sm text-neutral-500 mt-1 max-w-md mx-auto">
        Add your first vehicle to start managing your inventory. Everything you save
        here stays in this browser until you connect a backend.
      </p>
      <Link
        to="/admin/add-inventory"
        className="mt-5 inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-lg font-semibold text-white shadow transition hover:scale-[1.01]"
        style={{ background: "var(--gradient-orange)" }}
      >
        <Plus className="size-4" aria-hidden="true" /> Add new car
      </Link>
    </div>
  );
}

function ConfirmDialog({
  title,
  description,
  confirmLabel,
  busy,
  onCancel,
  onConfirm,
}: {
  title: string;
  description: string;
  confirmLabel: string;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <div className="size-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <AlertTriangle className="size-5 text-red-600" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h2 id="confirm-title" className="text-lg font-bold text-neutral-900">
              {title}
            </h2>
            <p id="confirm-desc" className="text-sm text-neutral-600 mt-1">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            aria-busy={busy}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition disabled:opacity-60"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}