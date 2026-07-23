import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, Fuel, Gauge, Cog, X, SlidersHorizontal } from "lucide-react";
import { MetroHeader } from "@/components/MetroHeader";
import { MetroFooter } from "@/components/MetroSections";
import { cars, type Car } from "@/data/cars";

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
      <div className="lg:sticky lg:top-24 space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">Filters</h2>
          <button onClick={clearAll} className="text-xs text-[var(--brand-orange)] hover:underline">
            Clear all
          </button>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-white/60 mb-2 block">Search</label>
          <div className="relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search cars…"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-sm text-white placeholder:text-white/40 focus:border-[var(--brand-orange)] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-white/60 mb-2 block">
            Max Price: <span className="text-white font-semibold">{fmt(max)}</span>
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
          <div className="flex justify-between text-[10px] text-white/50 mt-1">
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
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>All Cars — Metro Cars Vijayawada</title>
        <meta name="description" content="Browse our complete inventory of certified pre-owned cars. Filter by brand, fuel, transmission and price range." />
      </Helmet>
      <MetroHeader />

      <section className="relative pt-32 pb-10 border-b border-white/10 bg-gradient-to-b from-[#111] to-black">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--brand-orange)] mb-3">Inventory</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white uppercase">Explore All Cars</h1>
          <p className="mt-3 text-white/60 max-w-2xl">
            {filtered.length} certified vehicles ready for you. Use the filters to find your perfect match.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block">{Sidebar}</div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5 gap-3">
              <button
                onClick={() => setOpenMobile(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white text-sm"
              >
                <SlidersHorizontal className="size-4" /> Filters
              </button>
              <div className="text-sm text-white/60 hidden sm:block">
                Showing <span className="text-white font-semibold">{filtered.length}</span> of {cars.length}
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-sm text-white outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-white/10 p-16 text-center">
                <p className="text-white/70">No cars match your filters.</p>
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
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-[#0a0a0a] border-r border-white/10 overflow-y-auto p-4">
            <div className="flex justify-end mb-2">
              <button onClick={() => setOpenMobile(false)} className="text-white/70">
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
      <label className="text-xs uppercase tracking-wider text-white/60 mb-2 block">{label}</label>
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
                  : "border-white/15 text-white/70 hover:border-white/40"
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
      className="group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-[var(--brand-orange)]/50 transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <img
          src={car.img}
          alt={car.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur text-[10px] uppercase tracking-wider text-white/90 border border-white/10">
          {car.year}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-bold truncate">{car.name}</h3>
        <div className="flex flex-wrap gap-3 mt-2 text-xs text-white/60">
          <span className="inline-flex items-center gap-1"><Fuel className="size-3" />{car.fuel}</span>
          <span className="inline-flex items-center gap-1"><Cog className="size-3" />{car.trans}</span>
          <span className="inline-flex items-center gap-1"><Gauge className="size-3" />{car.km}</span>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-xl font-bold text-[var(--brand-orange)]">{car.price}</span>
          <span className="text-xs text-white/50 group-hover:text-white transition">View →</span>
        </div>
      </div>
    </Link>
  );
}