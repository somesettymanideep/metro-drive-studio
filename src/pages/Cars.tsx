import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, Fuel, Gauge, Cog, X, SlidersHorizontal, ArrowRight, Palette, Calendar } from "lucide-react";
import { MetroHeader } from "@/components/MetroHeader";
import { MetroFooter } from "@/components/MetroSections";
import { cars, type Car } from "@/data/cars";
import bannerImg from "@/assets/cars-page-banner.jpg";

const parsePrice = (p: string) => {
  // e.g. "₹7.80 L" -> 780000
  const num = parseFloat(p.replace(/[^\d.]/g, ""));
  if (/cr/i.test(p)) return num * 10000000;
  if (/l/i.test(p)) return num * 100000;
  return num;
};

const priceMin = 0;
const priceMax = Math.max(...cars.map((c) => parsePrice(c.price))) + 50000;

export default function Cars() {
  const [q, setQ] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const [fuels, setFuels] = useState<string[]>([]);
  const [trans, setTrans] = useState<string[]>([]);
  const [max, setMax] = useState(priceMax);
  const [sort, setSort] = useState("newest");
  const [openMobile, setOpenMobile] = useState(false);

  const brandList = useMemo(
    () => Array.from(new Set(cars.map((c) => c.brand || c.name.split(" ")[0]))).sort(),
    []
  );
  const fuelList = useMemo(() => Array.from(new Set(cars.map((c) => c.fuel))).sort(), []);
  const transList = useMemo(() => Array.from(new Set(cars.map((c) => c.trans))).sort(), []);

  const toggle = (arr: string[], v: string, set: (x: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    let out = cars.filter((c) => {
      const brand = c.brand || c.name.split(" ")[0];
      if (q && !`${c.name} ${brand}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (brands.length && !brands.includes(brand)) return false;
      if (fuels.length && !fuels.includes(c.fuel)) return false;
      if (trans.length && !trans.includes(c.trans)) return false;
      if (parsePrice(c.price) > max) return false;
      return true;
    });
    if (sort === "price-asc") out = [...out].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (sort === "price-desc") out = [...out].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    else if (sort === "newest") out = [...out].sort((a, b) => b.year - a.year);
    return out;
  }, [q, brands, fuels, trans, max, sort]);

  const clearAll = () => {
    setQ("");
    setBrands([]);
    setFuels([]);
    setTrans([]);
    setMax(priceMax);
  };

  const fmt = (n: number) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(2)} L` : `₹${n.toLocaleString("en-IN")}`;

  const Sidebar = (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="lg:sticky lg:top-24 space-y-6 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-black uppercase tracking-wide">Filters</h2>
          <button onClick={clearAll} className="text-xs text-[var(--brand-orange)] hover:underline">
            Clear all
          </button>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-black/60 mb-2 block">Search</label>
          <div className="relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search cars…"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#fafafa] border border-black/10 text-sm text-black placeholder:text-black/40 focus:border-[var(--brand-orange)] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-black/60 mb-2 block">
            Max Price: <span className="text-black font-semibold">{fmt(max)}</span>
          </label>
          <input
            type="range"
            min={priceMin}
            max={priceMax}
            step={50000}
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="w-full accent-[var(--brand-orange)]"
          />
          <div className="flex justify-between text-[10px] text-black/50 mt-1">
            <span>{fmt(priceMin)}</span>
            <span>{fmt(priceMax)}</span>
          </div>
        </div>

        <FilterGroup label="Brand" options={brandList} selected={brands} onToggle={(v) => toggle(brands, v, setBrands)} />
        <FilterGroup label="Fuel" options={fuelList} selected={fuels} onToggle={(v) => toggle(fuels, v, setFuels)} />
        <FilterGroup label="Transmission" options={transList} selected={trans} onToggle={(v) => toggle(trans, v, setTrans)} />
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Helmet>
        <title>All Cars — Metro Cars Vijayawada</title>
        <meta name="description" content="Browse our complete inventory of certified pre-owned cars. Filter by brand, fuel, transmission and price range." />
      </Helmet>
      <MetroHeader />

      {/* Sub-page banner */}
      <section className="relative pt-28 lg:pt-32 h-[280px] lg:h-[360px] overflow-hidden">
        <img
          src={bannerImg}
          alt="Metro Cars Vijayawada premium inventory showroom"
          width={1920}
          height={720}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute -bottom-24 -right-24 size-[420px] rounded-full bg-[var(--brand-orange)]/25 blur-3xl" />
        <div className="relative container mx-auto px-4 lg:px-8 h-full flex flex-col justify-end pb-8 lg:pb-12">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white">Certified Pre-Owned</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold uppercase text-white leading-[0.95]">
            Explore All Cars
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-white/80 text-sm">
            <Link to="/" className="hover:text-[var(--brand-orange)]">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-[var(--brand-orange)] font-semibold">Inventory</span>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block">{Sidebar}</div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5 gap-3">
              <button
                onClick={() => setOpenMobile(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-black/10 text-black text-sm bg-white shadow-sm"
              >
                <SlidersHorizontal className="size-4" /> Filters
              </button>
              <div className="text-sm text-black/60 hidden sm:block">
                Showing <span className="text-black font-semibold">{filtered.length}</span> of {cars.length}
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white border border-black/10 text-sm text-black outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-black/10 bg-white p-16 text-center">
                <p className="text-black/70">No cars match your filters.</p>
                <button onClick={clearAll} className="mt-4 text-[var(--brand-orange)] hover:underline">
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((c) => (
                  <CarCard key={c.slug} car={c} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {openMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpenMobile(false)} />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-white border-r border-black/10 overflow-y-auto p-4">
            <div className="flex justify-end mb-2">
              <button onClick={() => setOpenMobile(false)} className="text-black/70">
                <X className="size-5" />
              </button>
            </div>
            {Sidebar}
          </div>
        </div>
      )}

      <MetroFooter />
    </div>
  );
}

function FilterGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-black/60 mb-2 block">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = selected.includes(o);
          return (
            <button
              key={o}
              onClick={() => onToggle(o)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                active
                  ? "bg-[var(--brand-orange)] border-[var(--brand-orange)] text-white"
                  : "border-black/15 text-black/70 hover:border-black/40"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CarCard({ car }: { car: Car }) {
  return (
    <Link
      to={`/car/${car.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all shadow-sm hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={car.img}
          alt={car.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur text-[10px] uppercase tracking-wider text-white/90 border border-white/10">
          <span className="inline-flex items-center gap-1"><Calendar className="size-3" />{car.year}</span>
        </div>
        {car.bodyType && (
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-[10px] uppercase tracking-wider font-semibold">
            {car.bodyType}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="text-base font-bold text-card-foreground line-clamp-1">{car.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{car.variant || `${car.brand} ${car.model}`}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <CarSpec icon={<Fuel className="size-3" />} label={car.fuel} />
          <CarSpec icon={<Cog className="size-3" />} label={car.trans} />
          <CarSpec icon={<Gauge className="size-3" />} label={car.km} />
          {car.color && <CarSpec icon={<Palette className="size-3" />} label={car.color} />}
        </div>

        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-primary">{car.price}</span>
            <span className="block text-[10px] text-muted-foreground">On-road price</span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
            View Details <ArrowRight className="size-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function CarSpec({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-lg px-2 py-1.5">
      <span className="text-primary">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}
