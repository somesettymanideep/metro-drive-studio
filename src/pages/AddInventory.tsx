import { useState, FormEvent, ChangeEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Car as CarIcon,
  Upload,
  X,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import logoUrl from "@/assets/metro-cars-logo.png";

type FormState = {
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
};

const initial: FormState = {
  name: "",
  brand: "",
  model: "",
  variant: "",
  year: "",
  price: "",
  km: "",
  fuel: "Petrol",
  trans: "Manual",
  cat: "SUV",
  bodyType: "",
  color: "",
  description: "",
};

export default function AddInventory() {
  const navigate = useNavigate();
  const authed =
    typeof window !== "undefined" && localStorage.getItem("mc_admin") === "1";

  const [form, setForm] = useState<FormState>(initial);
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [saved, setSaved] = useState(false);

  if (!authed) return <Navigate to="/login" replace />;

  const update =
    (k: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [
      ...prev,
      ...files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    ]);
  };

  const removeImage = (i: number) =>
    setImages((prev) => prev.filter((_, idx) => idx !== i));

  const logout = () => {
    localStorage.removeItem("mc_admin");
    navigate("/login");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const draft = {
      ...form,
      images: images.map((i) => i.file.name),
      createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("mc_inventory_drafts") || "[]");
    localStorage.setItem(
      "mc_inventory_drafts",
      JSON.stringify([draft, ...existing])
    );
    setSaved(true);
    setTimeout(() => {
      setForm(initial);
      setImages([]);
      setSaved(false);
    }, 2200);
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <Helmet>
        <title>Add Inventory | Metro Cars Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-black text-white border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Metro Cars" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <p className="text-xs uppercase tracking-widest text-white/50">Admin</p>
              <p className="text-sm font-semibold">Inventory Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              <ArrowLeft className="size-4" /> Site
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-red-500/90 hover:bg-red-500 transition"
            >
              <LogOut className="size-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 flex items-center gap-2">
            <CarIcon className="size-7 text-[var(--brand-orange)]" />
            Add New Car
          </h1>
          <p className="text-neutral-500 mt-1 text-sm">
            Fill in the details below to add a car to the inventory.
          </p>
        </div>

        {saved && (
          <div className="mb-6 flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-3">
            <CheckCircle2 className="size-5" />
            <span className="font-medium">Car saved successfully!</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="grid lg:grid-cols-3 gap-6">
          {/* Left: fields */}
          <div className="lg:col-span-2 space-y-6">
            <Card title="Basic Information">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Car Name / Title" required>
                  <input
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Hyundai Venue S(O)"
                    className={inputCls}
                  />
                </Field>
                <Field label="Brand" required>
                  <input
                    required
                    value={form.brand}
                    onChange={update("brand")}
                    placeholder="Hyundai"
                    className={inputCls}
                  />
                </Field>
                <Field label="Model" required>
                  <input
                    required
                    value={form.model}
                    onChange={update("model")}
                    placeholder="Venue"
                    className={inputCls}
                  />
                </Field>
                <Field label="Variant">
                  <input
                    value={form.variant}
                    onChange={update("variant")}
                    placeholder="S(O) Petrol MT"
                    className={inputCls}
                  />
                </Field>
                <Field label="Year" required>
                  <input
                    required
                    type="number"
                    min="1990"
                    max="2030"
                    value={form.year}
                    onChange={update("year")}
                    placeholder="2022"
                    className={inputCls}
                  />
                </Field>
                <Field label="Price (₹)" required>
                  <input
                    required
                    value={form.price}
                    onChange={update("price")}
                    placeholder="₹7.80 L"
                    className={inputCls}
                  />
                </Field>
              </div>
            </Card>

            <Card title="Specifications">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Kilometres Driven" required>
                  <input
                    required
                    value={form.km}
                    onChange={update("km")}
                    placeholder="1,07,000 km"
                    className={inputCls}
                  />
                </Field>
                <Field label="Fuel Type">
                  <select value={form.fuel} onChange={update("fuel")} className={inputCls}>
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Electric</option>
                    <option>CNG</option>
                    <option>Hybrid</option>
                  </select>
                </Field>
                <Field label="Transmission">
                  <select value={form.trans} onChange={update("trans")} className={inputCls}>
                    <option>Manual</option>
                    <option>Automatic</option>
                  </select>
                </Field>
                <Field label="Category">
                  <select value={form.cat} onChange={update("cat")} className={inputCls}>
                    <option>SUV</option>
                    <option>Sedan</option>
                    <option>Hatchback</option>
                    <option>Luxury</option>
                    <option>MPV</option>
                  </select>
                </Field>
                <Field label="Body Type">
                  <input
                    value={form.bodyType}
                    onChange={update("bodyType")}
                    placeholder="Compact SUV"
                    className={inputCls}
                  />
                </Field>
                <Field label="Color">
                  <input
                    value={form.color}
                    onChange={update("color")}
                    placeholder="White"
                    className={inputCls}
                  />
                </Field>
              </div>
            </Card>

            <Card title="Description">
              <textarea
                value={form.description}
                onChange={update("description")}
                rows={5}
                placeholder="Well-maintained, single owner, full service history..."
                className={inputCls}
              />
            </Card>
          </div>

          {/* Right: images + actions */}
          <div className="space-y-6">
            <Card title="Car Images">
              <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-neutral-300 hover:border-[var(--brand-orange)] rounded-xl px-4 py-8 cursor-pointer bg-neutral-50 hover:bg-orange-50/40 transition">
                <Upload className="size-6 text-neutral-400" />
                <span className="text-sm font-medium text-neutral-700">
                  Click to upload images
                </span>
                <span className="text-xs text-neutral-500">PNG, JPG, WEBP</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onFiles}
                  className="hidden"
                />
              </label>

              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 group"
                    >
                      <img
                        src={img.url}
                        alt={`upload-${i}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        aria-label="Remove image"
                      >
                        <X className="size-3" />
                      </button>
                      {i === 0 && (
                        <span className="absolute bottom-1 left-1 text-[10px] font-semibold bg-[var(--brand-orange)] text-white px-1.5 py-0.5 rounded">
                          MAIN
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {images.length === 0 && (
                <p className="mt-3 text-xs text-neutral-500 flex items-center gap-1">
                  <ImageIcon className="size-3" /> First image is used as main
                  preview.
                </p>
              )}
            </Card>

            <Card title="Actions">
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-semibold text-white shadow-lg transition hover:scale-[1.01]"
                  style={{ background: "var(--gradient-orange)" }}
                >
                  Save Car
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm(initial);
                    setImages([]);
                  }}
                  className="w-full py-3 rounded-lg font-semibold bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition"
                >
                  Reset
                </button>
              </div>
              <p className="text-xs text-neutral-500 mt-3 leading-relaxed">
                Entries are saved locally in this browser. Connect a backend to
                publish cars live.
              </p>
            </Card>
          </div>
        </form>
      </div>
    </main>
  );
}

const inputCls =
  "w-full px-3 py-2.5 rounded-lg border border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[var(--brand-orange)] focus:ring-2 focus:ring-[var(--brand-orange)]/20 transition text-sm";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-neutral-200 rounded-xl p-5 md:p-6 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-neutral-700 mb-1.5">
        {label} {required && <span className="text-[var(--brand-orange)]">*</span>}
      </span>
      {children}
    </label>
  );
}