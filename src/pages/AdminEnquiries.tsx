import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { Search, Trash2, Mail, MailOpen, Phone, AlertTriangle, Inbox } from "lucide-react";
import {
  isAdminAuthed,
  logoutAdmin,
  listEnquiriesAdmin,
  markEnquiryRead,
  deleteEnquiryAdmin,
  type ContactEnquiry,
} from "@/lib/inventoryStore";
import { AdminTopBar } from "./AddInventory";

export default function AdminEnquiries() {
  const navigate = useNavigate();
  const authed = isAdminAuthed();

  const [items, setItems] = useState<ContactEnquiry[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!authed) {
      setLoading(false);
      return;
    }
    listEnquiriesAdmin()
      .then(setItems)
      .catch((e) => toast.error(e instanceof Error ? e.message : "Unable to load enquiries."))
      .finally(() => setLoading(false));
  }, [authed]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      [i.name, i.phone, i.email, i.vehicle, i.budget, i.message].join(" ").toLowerCase().includes(q)
    );
  }, [items, query]);

  const unread = items.filter((i) => !i.is_read).length;

  if (!authed) return <Navigate to="/login" replace />;

  const toggleRead = async (item: ContactEnquiry) => {
    const next = !item.is_read;
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, is_read: next } : i)));
    try {
      await markEnquiryRead(item.id, next);
    } catch (e) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, is_read: !next } : i)));
      toast.error(e instanceof Error ? e.message : "Unable to update enquiry.");
    }
  };

  const onDelete = async (id: string) => {
    setBusy(true);
    try {
      await deleteEnquiryAdmin(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success("Enquiry deleted.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unable to delete enquiry.");
    } finally {
      setBusy(false);
      setConfirmId(null);
    }
  };

  const exportCsv = () => {
    const head = ["Name", "Phone", "Email", "Vehicle", "Budget", "Message", "Received", "Read"];
    const esc = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = filtered.map((i) =>
      [i.name, i.phone, i.email, i.vehicle, i.budget, i.message, new Date(i.created_at).toLocaleString(), i.is_read ? "Yes" : "No"]
        .map(esc)
        .join(",")
    );
    const blob = new Blob([[head.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `metro-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <Helmet>
        <title>Enquiries | Metro Cars Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <AdminTopBar onLogout={() => { logoutAdmin(); navigate("/login"); }} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 flex items-center gap-2">
              <Inbox className="size-7 text-[var(--brand-orange)]" aria-hidden="true" />
              Get In Touch Enquiries
            </h1>
            <p className="text-neutral-500 mt-1 text-sm">
              {items.length} total · {unread} unread
            </p>
          </div>
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-700 transition"
          >
            Export CSV
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, phone, vehicle..."
            aria-label="Search enquiries"
            className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border border-neutral-200 focus:outline-none focus:border-[var(--brand-orange)] text-neutral-900"
          />
        </div>

        {loading ? (
          <p className="text-neutral-500">Loading enquiries...</p>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center text-neutral-500">
            No enquiries yet.
          </div>
        ) : (
          <ul className="space-y-3">
            {filtered.map((i) => (
              <li
                key={i.id}
                className={`bg-white border rounded-2xl p-5 ${i.is_read ? "border-neutral-200" : "border-[var(--brand-orange)]/50 shadow-sm"}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-neutral-900 flex items-center gap-2">
                      {i.name}
                      {!i.is_read && (
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--brand-orange)] text-white">
                          New
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-neutral-500 mt-0.5">
                      {new Date(i.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleRead(i)}
                      className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition"
                    >
                      {i.is_read ? <Mail className="size-4" /> : <MailOpen className="size-4" />}
                      {i.is_read ? "Mark unread" : "Mark read"}
                    </button>
                    <button
                      onClick={() => setConfirmId(i.id)}
                      aria-label={`Delete enquiry from ${i.name}`}
                      className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-neutral-700">
                  <p className="flex items-center gap-2">
                    <Phone className="size-4 text-neutral-400" />
                    <a href={`tel:${i.phone}`} className="hover:underline">{i.phone || "—"}</a>
                  </p>
                  <p className="flex items-center gap-2 break-all">
                    <Mail className="size-4 text-neutral-400" />
                    {i.email ? <a href={`mailto:${i.email}`} className="hover:underline">{i.email}</a> : "—"}
                  </p>
                  {i.vehicle && <p><span className="text-neutral-500">Vehicle:</span> {i.vehicle}</p>}
                  {i.budget && <p><span className="text-neutral-500">Budget:</span> {i.budget}</p>}
                </div>

                {i.message && (
                  <p className="mt-3 text-sm text-neutral-600 bg-neutral-50 border border-neutral-100 rounded-xl p-3 whitespace-pre-wrap">
                    {i.message}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {confirmId && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <p className="flex items-start gap-2 font-semibold text-neutral-900">
              <AlertTriangle className="size-5 text-red-500 shrink-0" /> Delete this enquiry?
            </p>
            <p className="text-sm text-neutral-500 mt-2">This cannot be undone.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => onDelete(confirmId)}
                disabled={busy}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm disabled:opacity-60"
              >
                {busy ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
