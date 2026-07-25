import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Calendar,
  Fuel,
  Settings2,
  Gauge,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  Share2,
  MapPin,
  Award,
} from "lucide-react";
import { getAnyCarBySlug } from "@/lib/allCars";
import { MetroHeader } from "@/components/MetroHeader";
import { MetroFooter, StickyContact } from "@/components/MetroSections";
import bannerImg from "@/assets/car-details-banner.jpg";

export default function CarDetails() {
  const { slug = "" } = useParams();
  const car = getAnyCarBySlug(slug);
  const gallery = car?.gallery && car.gallery.length ? car.gallery : car ? [car.img] : [];
  const [active, setActive] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [car]);

  useEffect(() => {
    if (gallery.length <= 1) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % gallery.length);
    }, 3000);
    return () => clearInterval(id);
  }, [gallery.length]);


  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-extrabold uppercase">Car not found</h1>
        <p className="text-black/60 mt-2">The vehicle you're looking for is no longer available.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black text-white font-bold uppercase text-sm"
        >
          <ArrowLeft className="size-4" /> Back to Inventory
        </Link>
      </div>
    );
  }

  const seoTitle = `${car.name} (${car.year}) for Sale in Vijayawada | Metro Cars`;
  const seoDesc = (car.description || `Buy a certified pre-owned ${car.name} at Metro Cars Vijayawada. ${car.year} model, ${car.fuel}, ${car.trans}, ${car.km}. Transparent price ${car.price} with easy finance.`).slice(0, 158);
  const canonical = `https://metro-auto-bloom.lovable.app/car/${slug}`;
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="product" />
        {car.img && <meta property="og:image" content={car.img} />}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Car",
          name: car.name,
          brand: car.brand,
          vehicleModelDate: car.year,
          fuelType: car.fuel,
          vehicleTransmission: car.trans,
          mileageFromOdometer: car.km,
          offers: { "@type": "Offer", price: car.price, priceCurrency: "INR", availability: "https://schema.org/InStock" },
        })}</script>
      </Helmet>
      <MetroHeader />

      {/* Sub-page banner */}
      <section className="relative pt-28 lg:pt-32 h-[280px] lg:h-[360px] overflow-hidden">
        <img
          src={bannerImg}
          alt="Metro Cars showroom banner"
          width={1920}
          height={720}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute -bottom-24 -right-24 size-[420px] rounded-full bg-[var(--brand-orange)]/25 blur-3xl" />
        <div className="relative container mx-auto px-4 lg:px-8 h-full flex flex-col justify-end pb-8 lg:pb-12">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white">Certified Pre-Owned</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold uppercase text-white leading-[0.95]">
            {car.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-white/80 text-sm">
            <Link to="/" className="hover:text-[var(--brand-orange)]">Home</Link>
            <span className="text-white/40">/</span>
            <Link to="/#inventory" className="hover:text-[var(--brand-orange)]">Inventory</Link>
            <span className="text-white/40">/</span>
            <span className="text-[var(--brand-orange)] font-semibold">{car.name}</span>
          </div>
        </div>
      </section>

      <main className="pt-10 lg:pt-14 pb-24">
        <div className="container mx-auto px-4 lg:px-8">

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Gallery */}
            <div className="lg:col-span-3">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-700 aspect-[4/3]">
                <img
                  src={gallery[active]}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                  style={{ background: "var(--gradient-orange)" }}
                >
                  Certified
                </div>


              </div>

              {gallery.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
                  {gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`shrink-0 snap-start w-24 sm:w-28 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                        active === i ? "border-[var(--brand-orange)]" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={g} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              {car.description && (
                <div className="mt-10 bg-white rounded-3xl p-7 border border-black/5">
                  <h2 className="text-xl font-extrabold uppercase tracking-tight">Overview</h2>
                  <p className="mt-3 text-black/70 leading-relaxed">{car.description}</p>
                </div>
              )}

              {/* Highlights */}
              {car.highlights && (
                <div className="mt-6 bg-white rounded-3xl p-7 border border-black/5">
                  <h2 className="text-xl font-extrabold uppercase tracking-tight flex items-center gap-2">
                    <Award className="size-5 text-[var(--brand-orange)]" /> Highlights
                  </h2>
                  <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                    {car.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-black/80">
                        <CheckCircle2 className="size-5 text-[var(--brand-orange)] shrink-0 mt-0.5" />
                        <span className="font-medium">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features */}
              {car.features && (
                <div className="mt-6 bg-white rounded-3xl p-7 border border-black/5">
                  <h2 className="text-xl font-extrabold uppercase tracking-tight">Features & Equipment</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {car.features.map((f) => (
                      <span
                        key={f}
                        className="px-3 py-1.5 rounded-full bg-[#fafafa] border border-black/10 text-sm font-medium text-black/80"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-7 border border-black/5 shadow-sm lg:sticky lg:top-28">
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-orange)]">
                  {car.brand ?? car.cat}
                </div>
                <h1 className="mt-2 text-2xl lg:text-3xl font-extrabold uppercase leading-tight">
                  {car.name}
                </h1>
                <div className="mt-3 flex items-baseline gap-2">
                  <div className="text-4xl font-extrabold text-[var(--brand-orange)]">{car.price}</div>
                  <div className="text-sm text-black/50 line-through">₹10.50 L</div>
                </div>
                <div className="mt-1 text-sm text-black/60">EMI starts at ₹17,499/mo*</div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <Spec icon={Calendar} label="Year" value={String(car.year)} />
                  <Spec icon={Fuel} label="Fuel" value={car.fuel} />
                  <Spec icon={Settings2} label="Transmission" value={car.trans} />
                  <Spec icon={Gauge} label="Driven" value={car.km} />
                </div>

                {(car.variant || car.color || car.owners || car.registration || car.engine || car.mileage || car.insurance) && (
                  <dl className="mt-6 divide-y divide-black/5 border-y border-black/5">
                    <Row label="Variant" value={car.variant} />
                    <Row label="Color" value={car.color} />
                    <Row label="Ownership" value={car.owners} />
                    <Row label="Registration" value={car.registration} />
                    <Row label="Engine" value={car.engine} />
                    <Row label="Mileage" value={car.mileage} />
                    <Row label="Insurance" value={car.insurance} />
                  </dl>
                )}

                <div className="mt-6 flex items-center gap-2 text-sm text-black/70">
                  <ShieldCheck className="size-4 text-[var(--brand-orange)]" />
                  <span>200+ point quality inspection</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-black/70">
                  <MapPin className="size-4 text-[var(--brand-orange)]" />
                  <span>Available at Metro Cars, Vijayawada</span>
                </div>

                <div className="mt-6 grid gap-3">
                  <a
href="tel:+919059987777"
                    className="inline-flex items-center justify-center gap-2 py-3 rounded-full text-white font-bold uppercase text-sm tracking-wide"
                    style={{ background: "var(--gradient-orange)" }}
                  >
                    <Phone className="size-4" /> Call Dealer
                  </a>
                  <a
                    href={`https://wa.me/919059987777?text=${encodeURIComponent(`Hi, I'm interested in the ${car.name} (${car.year}) listed at ${car.price}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#25D366] text-white font-bold uppercase text-sm tracking-wide hover:bg-[#1ebe57] transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.585 5.955L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp Enquiry
                  </a>
                  <a
                    href="tel:+919059987777"
                    className="inline-flex items-center justify-center gap-2 py-3 rounded-full bg-black text-white font-bold uppercase text-sm tracking-wide hover:bg-[var(--brand-orange)] transition-colors"
                  >
                    Schedule Test Drive
                  </a>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: car.name, url: window.location.href }).catch(() => {});
                      } else {
                        navigator.clipboard?.writeText(window.location.href);
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 py-2 text-sm font-semibold text-black/60 hover:text-[var(--brand-orange)]"
                  >
                    <Share2 className="size-4" /> Share this car
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <MetroFooter />
      <StickyContact />
    </div>
  );
}

function Spec({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#fafafa] border border-black/5">
      <Icon className="size-5 text-[var(--brand-orange)]" />
      <div>
        <div className="text-[11px] uppercase tracking-wider text-black/50 font-semibold">{label}</div>
        <div className="font-bold text-black text-sm">{value}</div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between py-3 text-sm">
      <dt className="text-black/60">{label}</dt>
      <dd className="font-semibold text-black text-right">{value}</dd>
    </div>
  );
}
