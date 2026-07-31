import { useEffect, useMemo, useState, FormEvent, ChangeEvent } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import {
  Car as CarIcon,
  Upload,
  X,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  List,
} from "lucide-react";
import logoUrl from "@/assets/metro-cars-logo.webp";
import {
  getInventoryItemRemote,
  isAdminAuthed,
  logoutAdmin,
  saveInventoryItemRemote,
  type InventoryItem,
} from "@/lib/inventoryStore";

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

type ImageEntry = { name: string; url: string };

export default function AddInventory() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editId = params.get("edit");
  const authed = isAdminAuthed();

  const [form, setForm] = useState<FormState>(initial);
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!editId) {
      setLoaded(true);
      return;
    }
    getInventoryItemRemote(editId)
      .then((existing) => {
        if (existing) {
          setForm({
            name: existing.name,
            brand: existing.brand,
            model: existing.model,
            variant: existing.variant,
            year: existing.year,
            price: existing.price,
            km: existing.km,
            fuel: existing.fuel || "Petrol",
            trans: existing.trans || "Manual",
            cat: existing.cat || "SUV",
            bodyType: existing.bodyType,
            color: existing.color,
            description: existing.description,
          });
          setImages(existing.images.map((n) => ({ name: n, url: n })));
        } else {
          toast.error("That inventory item couldn't be found.");
          navigate("/admin/inventory", { replace: true });
        }
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Unable to load inventory item.");
        navigate("/admin/inventory", { replace: true });
      })
      .finally(() => setLoaded(true));
  }, [editId, navigate]);

  if (!authed) return <Navigate to="/login" replace />;

  const update =
    (k: keyof FormState) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const value = e.target.value;
      setForm((f) => ({ ...f, [k]: value }));
      if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
    };

  const onFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const url = typeof reader.result === "string" ? reader.result : "";
        if (url) setImages((prev) => [...prev, { name: file.name, url }]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removeImage = (i: number) =>
    setImages((prev) => prev.filter((_, idx) => idx !== i));

  const logout = () => {
    logoutAdmin();
    navigate("/login");
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Car name is required.";
    if (!form.brand.trim()) next.brand = "Brand is required.";
    if (!form.model.trim()) next.model = "Model is required.";
    if (!form.year.trim()) next.year = "Year is required.";
    else {
      const y = Number(form.year);
      if (Number.isNaN(y) || y < 1990 || y > 2030)
        next.year = "Enter a year between 1990 and 2030.";
    }
    if (!form.price.trim()) next.price = "Price is required.";
    if (!form.km.trim()) next.km = "Kilometres driven is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const errorCount = useMemo(
    () => Object.values(errors).filter(Boolean).length,
    [errors]
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      const firstKey = Object.keys(errors)[0];
      if (firstKey) {
        const el = document.getElementById(`field-${firstKey}`);
        el?.focus();
      }
      return;
    }
    setSaving(true);
    setTimeout(() => {
      const payload: Omit<InventoryItem, "id" | "createdAt" | "updatedAt"> & {
        id?: string;
      } = {
        ...form,
        images: images.map((i) => i.url || i.name).filter(Boolean),
      };
      if (editId) payload.id = editId;
      saveInventoryItemRemote(payload)
        .then(() => {
          window.dispatchEvent(new Event("metro-inventory-updated"));
          setSaved(true);
          toast.success(editId ? "Car updated successfully." : "Car saved successfully.");
          if (editId) {
            setTimeout(() => navigate("/admin/inventory"), 800);
          } else {
            setTimeout(() => {
              setForm(initial);
              setImages([]);
              setSaved(false);
            }, 1600);
          }
        })
        .catch((error) => {
          toast.error(error instanceof Error ? error.message : "Unable to save car.");
        })
        .finally(() => setSaving(false));
    }, 350);
  };

  if (!loaded) {
    return (
      <main className="min-h-dvh flex items-center justify-center bg-neutral-50">
        <Loader2 className="size-8 animate-spin text-[var(--brand-orange)]" />
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-neutral-50">
      <Helmet>
        <title>
          {editId ? "Edit Car" : "Add Inventory"} | Metro Cars Admin
        </title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <AdminTopBar onLogout={logout} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 flex items-center gap-2">
              <CarIcon className="size-7 text-[var(--brand-orange)]" aria-hidden="true" />
              {editId ? "Edit Car" : "Add New Car"}
            </h1>
            <p className="text-neutral-500 mt-1 text-sm">
              {editId
                ? "Update the details below and save your changes."
                : "Fill in the details below to add a car to the inventory."}
            </p>
          </div>
          <Link
            to="/admin/inventory"
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-700 hover:text-neutral-900 transition"
          >
            <List className="size-4" aria-hidden="true" /> View inventory
          </Link>
        </div>

        <div aria-live="polite" className="sr-only">
          {saved ? "Car saved successfully." : ""}
        </div>

        {saved && (
          <div
            role="status"
            className="mb-6 flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-3"
          >
            <CheckCircle2 className="size-5" aria-hidden="true" />
            <span className="font-medium">
              {editId ? "Changes saved." : "Car saved successfully!"}
            </span>
          </div>
        )}

        {errorCount > 0 && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-2 bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3"
          >
            <AlertCircle className="size-5 mt-0.5 shrink-0" aria-hidden="true" />
            <div className="text-sm">
              <p className="font-semibold">
                {errorCount} {errorCount === 1 ? "field needs" : "fields need"} attention
              </p>
              <p className="text-red-700/80">
                Please review the highlighted inputs and try again.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} noValidate className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card title="Basic Information">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="field-name" label="Car Name / Title" required error={errors.name}>
                  <input
                    id="field-name"
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Hyundai Venue S(O)"
                    className={inputCls(!!errors.name)}
                    aria-invalid={!!errors.name}
                  />
                </Field>
                <Field id="field-brand" label="Brand" required error={errors.brand}>
                  <input
                    id="field-brand"
                    required
                    value={form.brand}
                    onChange={update("brand")}
                    placeholder="Hyundai"
                    className={inputCls(!!errors.brand)}
                    aria-invalid={!!errors.brand}
                  />
                </Field>
                <Field id="field-model" label="Model" required error={errors.model}>
                  <input
                    id="field-model"
                    required
                    value={form.model}
                    onChange={update("model")}
                    placeholder="Venue"
                    className={inputCls(!!errors.model)}
                    aria-invalid={!!errors.model}
                  />
                </Field>
                <Field id="field-variant" label="Variant">
                  <input
                    id="field-variant"
                    value={form.variant}
                    onChange={update("variant")}
                    placeholder="S(O) Petrol MT"
                    className={inputCls(false)}
                  />
                </Field>
                <Field id="field-year" label="Year" required error={errors.year}>
                  <input
                    id="field-year"
                    required
                    type="number"
                    min={1990}
                    max={2030}
                    value={form.year}
                    onChange={update("year")}
                    placeholder="2022"
                    className={inputCls(!!errors.year)}
                    aria-invalid={!!errors.year}
                  />
                </Field>
                <Field id="field-price" label="Price (₹)" required error={errors.price}>
                  <input
                    id="field-price"
                    required
                    value={form.price}
                    onChange={update("price")}
                    placeholder="₹7.80 L"
                    className={inputCls(!!errors.price)}
                    aria-invalid={!!errors.price}
                  />
                </Field>
              </div>
            </Card>

            <Card title="Specifications">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="field-km" label="Kilometres Driven" required error={errors.km}>
                  <input
                    id="field-km"
                    required
                    value={form.km}
                    onChange={update("km")}
                    placeholder="1,07,000 km"
                    className={inputCls(!!errors.km)}
                    aria-invalid={!!errors.km}
                  />
                </Field>
                <Field id="field-fuel" label="Fuel Type">
                  <select id="field-fuel" value={form.fuel} onChange={update("fuel")} className={inputCls(false)}>
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Electric</option>
                    <option>CNG</option>
                    <option>Hybrid</option>
                  </select>
                </Field>
                <Field id="field-trans" label="Transmission">
                  <select id="field-trans" value={form.trans} onChange={update("trans")} className={inputCls(false)}>
                    <option>Manual</option>
                    <option>Automatic</option>
                  </select>
                </Field>
                <Field id="field-cat" label="Category">
                  <select id="field-cat" value={form.cat} onChange={update("cat")} className={inputCls(false)}>
                    <option>SUV</option>
                    <option>Sedan</option>
                    <option>Hatchback</option>
                    <option>Luxury</option>
                    <option>MPV</option>
                  </select>
                </Field>
                <Field id="field-bodyType" label="Body Type">
                  <input
                    id="field-bodyType"
                    value={form.bodyType}
                    onChange={update("bodyType")}
                    placeholder="Compact SUV"
                    className={inputCls(false)}
                  />
                </Field>
                <Field id="field-color" label="Color">
                  <input
                    id="field-color"
                    value={form.color}
                    onChange={update("color")}
                    placeholder="White"
                    className={inputCls(false)}
                  />
                </Field>
              </div>
            </Card>

            <Card title="Description">
              <Field id="field-description" label="Notes for buyers">
                <textarea
                  id="field-description"
                  value={form.description}
                  onChange={update("description")}
                  rows={5}
                  placeholder="Well-maintained, single owner, full service history..."
                  className={inputCls(false)}
                />
              </Field>
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Car Images">
              <label
                htmlFor="field-images"
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-neutral-300 hover:border-[var(--brand-orange)] focus-within:border-[var(--brand-orange)] rounded-xl px-4 py-8 cursor-pointer bg-neutral-50 hover:bg-orange-50/40 transition"
              >
                <Upload className="size-6 text-neutral-400" aria-hidden="true" />
                <span className="text-sm font-medium text-neutral-700">
                  Click to upload images
                </span>
                <span className="text-xs text-neutral-500">PNG, JPG, WEBP</span>
                <input
                  id="field-images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onFiles}
                  className="sr-only"
                />
              </label>

              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {images.map((img, i) => (
                    <div
                      key={`${img.name}-${i}`}
                      className="relative aspect-square rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 group"
                    >
                      {img.url ? (
                        <img loading="lazy" decoding="async"
                          src={img.url}
                          alt={`Uploaded image ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 text-[10px] px-1 text-center">
                          <ImageIcon className="size-4 mb-1" aria-hidden="true" />
                          <span className="truncate w-full">{img.name}</span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 transition"
                        aria-label={`Remove image ${i + 1}`}
                      >
                        <X className="size-3" aria-hidden="true" />
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
                  <ImageIcon className="size-3" aria-hidden="true" /> First image is used as main preview.
                </p>
              )}
            </Card>

            <Card title="Actions">
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  aria-busy={saving}
                  className="w-full py-3 rounded-lg font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100 inline-flex items-center justify-center gap-2"
                  style={{ background: "var(--gradient-orange)" }}
                >
                  {saving ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      Saving...
                    </>
                  ) : editId ? (
                    "Save Changes"
                  ) : (
                    "Save Car"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (editId) {
                      navigate("/admin/inventory");
                    } else {
                      setForm(initial);
                      setImages([]);
                      setErrors({});
                    }
                  }}
                  disabled={saving}
                  className="w-full py-3 rounded-lg font-semibold bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition disabled:opacity-60"
                >
                  {editId ? "Cancel" : "Reset"}
                </button>
              </div>
              <p className="text-xs text-neutral-500 mt-3 leading-relaxed">
                Entries are saved to the shared inventory and will appear on the public site.
              </p>
            </Card>
          </div>
        </form>
      </div>
    </main>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full px-3 py-2.5 rounded-lg border bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 transition text-sm",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
      : "border-neutral-200 focus:border-[var(--brand-orange)] focus:ring-[var(--brand-orange)]/20",
  ].join(" ");
}

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
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="block">
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-neutral-700 mb-1.5"
      >
        {label}{" "}
        {required && (
          <span className="text-[var(--brand-orange)]" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      <div aria-describedby={error ? errorId : undefined}>{children}</div>
      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="size-3" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

function AdminTopBar({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="sticky top-0 z-40 bg-black text-white border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img loading="lazy" decoding="async" src={logoUrl} alt="Metro Cars" className="h-10 w-auto" />
          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-widest text-white/50">Admin</p>
            <p className="text-sm font-semibold">Inventory Manager</p>
          </div>
        </div>
        <nav className="flex items-center gap-2" aria-label="Admin">
          <Link
            to="/admin/inventory"
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            <List className="size-4" aria-hidden="true" /> Inventory
          </Link>
          <Link
            to="/admin/enquiries"
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            <Inbox className="size-4" aria-hidden="true" /> Enquiries
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Site
          </Link>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-red-500/90 hover:bg-red-500 transition"
          >
            <LogOut className="size-4" aria-hidden="true" /> Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export { AdminTopBar };