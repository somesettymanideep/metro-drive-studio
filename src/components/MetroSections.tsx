import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileSearch,
  Wrench,
  Banknote,
  Tag,
  Headphones,
  Car,
  Award,
  Users,
  Star,
  CheckCircle2,
  ChevronDown,
  Play,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Facebook,
  Instagram,
  Youtube,
  Fuel,
  Settings2,
  ChevronUp,
  Gauge,
  Calendar,
  Search,
  ClipboardCheck,
  FileText,
  KeyRound,
  Volume2,
  VolumeX,
} from "lucide-react";
import showroom from "@/assets/showroom.webp";
import founderImg from "@/assets/founder.webp";

import carSedan from "@/assets/car-sedan.jpg";
import soldBaleno from "@/assets/happy-customers/sold-baleno.jpg";
import soldNexon from "@/assets/happy-customers/sold-nexon.jpg";
import soldCreta from "@/assets/happy-customers/sold-creta.jpg";
import soldInnova from "@/assets/happy-customers/sold-innova.jpg";
import soldFortuner from "@/assets/happy-customers/sold-fortuner.jpg";
import soldAlto from "@/assets/happy-customers/sold-alto.jpg";
import soldGrandi10 from "@/assets/happy-customers/sold-grandi10.jpg";
import carSuv from "@/assets/car-suv.jpg";
import carHatch from "@/assets/car-hatch.jpg";
import carLuxury from "@/assets/car-luxury.jpg";
import carInnova from "@/assets/car-innova.jpg";
import carKia from "@/assets/car-kia.jpg";
import logoUrl from "@/assets/metro-cars-logo.png";
import ctaPremium from "@/assets/cta-premium.jpg";
import faqSupportUrl from "@/assets/faq-support.jpg";
import footerBgUrl from "@/assets/footer-bg.jpg";

/* ---------- Counter ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------- Trust Bar ---------- */
const stats = [
  { icon: Car, value: 10000, suffix: "+", label: "Cars Sold" },
  { icon: ShieldCheck, value: 100, suffix: "%", label: "Verified Vehicles" },
  { icon: Users, value: 25000, suffix: "+", label: "Verified Customers" },
  { icon: Star, value: 5, suffix: "★", label: "Customer Satisfaction" },
];

export function TrustBar() {
  return (
    <section className="relative -mt-16 z-20 container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 bg-black rounded-2xl p-4 lg:p-6 border border-white/10 shadow-2xl">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 lg:gap-4 px-3 py-2 lg:px-4 lg:py-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div
              className="size-12 lg:size-14 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "var(--gradient-orange)" }}
            >
              <s.icon className="size-6 text-white" />
            </div>
            <div>
              <div className="text-2xl lg:text-4xl font-extrabold text-white leading-none">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs lg:text-sm text-white/60 mt-1 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- About ---------- */
const aboutFeatures = [
  "Certified Used Cars",
  "Vehicle History Reports",
  "Quality Inspection",
  "Easy Financing",
  "Transparent Pricing",
  "Customer Support",
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-[var(--brand-orange)]/10 rounded-3xl -rotate-2" />
          <img
            src={showroom}
            alt="Metro Cars Vijayawada showroom"
            loading="lazy"
            width={1400}
            height={1000}
            className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
          />
          <div className="absolute -bottom-6 -right-4 lg:-right-8 glass-light rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3">
            <div className="size-12 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-orange)" }}>
              <Award className="size-6 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-2xl">14+</div>
              <div className="text-xs uppercase tracking-wide text-black/60">Years of Experience</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-[var(--brand-orange)] font-bold uppercase tracking-[0.25em] text-sm mb-3">
            About Us
          </div>
          <h2 className="text-2xl lg:text-4xl uppercase leading-[0.95] text-black">
            About <span className="text-gradient-orange">Metro Cars</span> Vijayawada
          </h2>
          <p className="mt-6 text-black/70 text-lg leading-relaxed">
            Metro Cars is a leading used car dealer in Vijayawada, offering a wide range of
            thoroughly inspected and certified pre-owned vehicles. Our mission is to provide
            customers with reliable cars, transparent pricing, and exceptional service throughout
            their buying journey.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {aboutFeatures.map((f) => (
              <div key={f} className="flex items-center gap-2.5">
                <CheckCircle2 className="size-5 text-[var(--brand-orange)] shrink-0" />
                <span className="font-semibold text-black/90">{f}</span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Inventory ---------- */
import { cars } from "@/data/cars";
import { useAllCars } from "@/lib/allCars";
const tabs = ["All", "Venue", "WagonR"];

/* ---------- Services ---------- */
const services = [
  {
    icon: Car,
    emoji: "🚗",
    title: "Buy Used Cars",
    features: ["Certified pre-owned vehicles", "Quality inspection", "Warranty support"],
    cta: { label: "Explore Inventory", href: "/cars" },
  },
  {
    icon: Tag,
    emoji: "💰",
    title: "Sell Your Car",
    features: ["Instant valuation", "Best market price", "Same-day payment"],
    cta: { label: "Sell My Car", href: "#contact" },
  },
  {
    icon: KeyRound,
    emoji: "🔄",
    title: "Exchange Your Car",
    features: ["Upgrade to your dream car", "Fair exchange valuation", "Hassle-free documentation"],
    cta: { label: "Get Exchange Quote", href: "#contact" },
  },
  {
    icon: Banknote,
    emoji: "🏦",
    title: "Car Finance",
    features: ["Easy EMI options", "Fast loan approvals", "Multiple finance partners"],
    cta: { label: "Check Eligibility", href: "#contact" },
  },
];

export function FounderSection() {
  const highlights = [
    "14+ Years Experience",
    "10000+ Cars Sold",
    "25000+ Verified Customers",
    "Trusted Used Car Dealer",
  ];
  return (
    <section id="founder" className="relative py-24 lg:py-32 bg-neutral-50 overflow-hidden">
      <div className="absolute -top-32 -left-32 size-[420px] rounded-full bg-[var(--brand-orange)]/5 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 size-[420px] rounded-full bg-[var(--brand-orange)]/5 blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-5 gap-12 lg:gap-16 items-center relative">
        {/* Left 40% */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2 relative"
        >
          <div className="absolute -inset-4 bg-[var(--brand-orange)]/10 rounded-3xl rotate-2" />
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-neutral-900">
            <img
              src={founderImg}
              alt="Metro Cars Founder"
              loading="lazy"
              width={912}
              height={1104}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div
                className="italic text-3xl font-semibold tracking-wide"
                style={{ fontFamily: "'Brush Script MT', cursive" }}
              >
                Mahesh Gudipati
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.25em] text-[var(--brand-orange)] font-bold">
                Founder & CEO • Metro Cars
              </div>
            </div>
          </div>
        </motion.div>


        {/* Right 60% */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-orange)]/10 border border-[var(--brand-orange)]/20 mb-5">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--brand-orange)]">
              Meet The Founder
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold uppercase leading-[0.95] tracking-tight">
            Meet Our <span className="text-[var(--brand-orange)]">Founder</span>
          </h2>
          <p className="mt-4 text-lg lg:text-xl font-semibold text-black/70">
            Driven by Trust. Built on Customer Satisfaction.
          </p>

          <div className="mt-6 space-y-4 text-black/70 leading-relaxed">
            <p>
              Metro Cars was founded with a simple vision—to make buying and selling pre-owned cars
              transparent, reliable, and stress-free. Every vehicle is carefully inspected, every
              customer is treated with honesty, and every deal is handled with complete
              professionalism.
            </p>
            <p>
              With years of experience in the automobile industry, our founder has helped thousands
              of customers find the right vehicle at the right price while building lasting
              relationships based on trust.
            </p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {highlights.map((h) => (
              <div
                key={h}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-black/5 hover:border-[var(--brand-orange)]/40 transition-colors"
              >
                <CheckCircle2 className="size-5 text-[var(--brand-orange)] shrink-0" />
                <span className="font-semibold text-black text-sm">{h}</span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}



export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background:
          "radial-gradient(1200px 600px at 85% 0%, rgba(255,90,0,0.10), transparent 60%), radial-gradient(900px 500px at 0% 100%, rgba(255,90,0,0.08), transparent 60%), linear-gradient(180deg, #ffffff 0%, #fafafa 50%, #ffffff 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      <div className="absolute -top-40 -right-40 size-[520px] rounded-full bg-[var(--brand-orange)]/15 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 size-[520px] rounded-full bg-[var(--brand-orange)]/15 blur-3xl" />

      <div className="relative container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-orange)]/10 border border-[var(--brand-orange)]/20 mb-5">
            <span className="size-2 rounded-full bg-[var(--brand-orange)] animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--brand-orange)]">Our Services</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase text-neutral-900 leading-tight max-w-3xl mx-auto">
            Complete Car Solutions <br className="hidden sm:block" /><span className="text-gradient-orange">Under One Roof</span>
          </h2>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
            Whether you're buying, selling, exchanging, or financing a vehicle, Metro Cars provides a seamless experience from start to finish.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="group relative rounded-3xl p-[1.5px] bg-gradient-to-br from-neutral-200 to-neutral-200 hover:from-[var(--brand-orange)] hover:to-[#ff9a4d] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(255,90,0,0.4)]"
              >
                <div className="relative h-full rounded-[calc(1.5rem-1.5px)] bg-white/80 backdrop-blur-xl p-7 flex flex-col overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-neutral-50 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/60 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="size-14 rounded-2xl flex items-center justify-center text-white shadow-[0_10px_30px_-10px_rgba(255,90,0,0.6)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                        style={{ background: "var(--gradient-orange)" }}
                      >
                        <Icon className="size-6" />
                      </div>
                      <span className="text-3xl transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12">
                        {s.emoji}
                      </span>
                    </div>

                    <h3 className="text-2xl uppercase text-neutral-900 mb-4 leading-tight">
                      {s.title}
                    </h3>

                    <ul className="space-y-2.5 mb-7">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-700">
                          <CheckCircle2 className="size-4 text-[var(--brand-orange)] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {s.cta.href === "/cars" ? (
                      <Link
                        to="/cars"
                        className="mt-auto inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full text-white font-bold uppercase tracking-wide text-xs transition-all hover:scale-[1.02]"
                        style={{ background: "var(--gradient-orange)" }}
                      >
                        {s.cta.label}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <a
                        href={`https://wa.me/919059987777?text=${encodeURIComponent(`Hi Metro Cars, I'm interested in "${s.title}" service. ${s.cta.label}.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-auto inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full text-white font-bold uppercase tracking-wide text-xs transition-all hover:scale-[1.02]"
                        style={{ background: "var(--gradient-orange)" }}
                      >
                        {s.cta.label}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


export function InventorySection() {
  const allCars = useAllCars();
  const brands = ["All", ...Array.from(new Set(allCars.map(c => c.brand).filter(Boolean) as string[]))];
  const [tab, setTab] = useState("All");
  const filtered = (tab === "All" ? allCars : allCars.filter(c => c.brand === tab)).slice(0, 9);


  return (
    <section id="inventory" className="py-24 lg:py-32 bg-[#fafafa]">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="text-[var(--brand-orange)] font-bold uppercase tracking-[0.25em] text-sm mb-3">
            Featured Inventory
          </div>
          <h2 className="text-2xl lg:text-4xl uppercase leading-[0.95] text-black">
            Explore Our <span className="text-gradient-orange">Premium</span> Inventory
          </h2>
          <p className="mt-4 text-black/60 text-lg">
            Choose from a wide range of quality pre-owned vehicles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {brands.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm uppercase tracking-wide transition-all ${
                tab === t
                  ? "text-white shadow-[0_10px_25px_-10px_rgba(255,90,0,0.7)]"
                  : "bg-white text-black/70 hover:text-black border border-black/10"
              }`}
              style={tab === t ? { background: "var(--gradient-orange)" } : undefined}
            >
              {t}
            </button>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((c, i) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-neutral-900 to-neutral-700">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white" style={{ background: "var(--gradient-orange)" }}>
                  Certified
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-extrabold text-black uppercase tracking-tight">{c.name}</h3>
                  <div className="text-2xl font-extrabold text-[var(--brand-orange)] shrink-0">{c.price}</div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <Spec icon={Calendar} text={String(c.year)} />
                  <Spec icon={Fuel} text={c.fuel} />
                  <Spec icon={Settings2} text={c.trans} />
                  <Spec icon={Gauge} text={c.km} />
                </div>
                <Link to={`/car/${c.slug}`} className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-black text-white font-bold uppercase text-sm tracking-wide hover:bg-[var(--brand-orange)] transition-colors">
                  View Details <ArrowRight className="size-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold uppercase text-sm tracking-wide text-white hover:shadow-[0_10px_25px_-10px_rgba(255,90,0,0.7)] transition-all"
            style={{ background: "var(--gradient-orange)" }}
          >
            Explore Cars <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Spec({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-2 text-black/70">
      <Icon className="size-4 text-[var(--brand-orange)]" />
      <span className="font-medium">{text}</span>
    </div>
  );
}

/* ---------- Why Choose Us ---------- */
const features = [
  { icon: ShieldCheck, title: "Certified Quality", desc: "All cars inspected by experts." },
  { icon: FileSearch, title: "Vehicle History Verified", desc: "Transparent ownership records." },
  { icon: Tag, title: "Competitive Pricing", desc: "Best market value." },
  { icon: Banknote, title: "Finance Assistance", desc: "Easy loan support." },
  { icon: Award, title: "Trusted Dealership", desc: "Years of customer trust." },
  { icon: Headphones, title: "After-Sales Support", desc: "Continued customer care." },
];

export function WhySection() {
  return (
    <section id="why" className="relative py-24 lg:py-32 bg-black overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[var(--brand-orange)]/10 blur-3xl" />
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[var(--brand-orange)] font-bold uppercase tracking-[0.25em] text-sm mb-3">
            Why Choose Us
          </div>
          <h2 className="text-2xl lg:text-4xl uppercase leading-[0.95] text-white">
            Why Choose <span className="text-gradient-orange">Metro Cars</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative p-8 rounded-3xl glass-card hover:border-[var(--brand-orange)]/50 transition-all overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 size-32 rounded-full bg-[var(--brand-orange)]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div
                  className="size-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ background: "var(--gradient-orange)" }}
                >
                  <f.icon className="size-7 text-white" />
                </div>
                <h3 className="text-lg font-extrabold text-white uppercase tracking-tight mb-2">{f.title}</h3>
                <p className="text-white/60">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
import testimonialVideo1 from "@/assets/testimonial-1.mp4";
import testimonialVideo2 from "@/assets/testimonial-2.mp4";
import testimonialVideo3 from "@/assets/testimonial-3.mp4";

const testimonials = [
  { id: "v1", src: testimonialVideo1 },
  { id: "v2", src: testimonialVideo2 },
  { id: "v3", src: testimonialVideo3 },
];

export function TestimonialsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringRef = useRef(false);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-testimonial-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-testimonial-card]");
    const step = card ? card.offsetWidth + 24 : 1;
    setActive(Math.round(el.scrollLeft / step));
  };

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-testimonial-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollTo({ left: i * step, behavior: "smooth" });
  };

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setAutoPlay(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const start = () => {
      autoPlayRef.current = setInterval(() => {
        if (isHoveringRef.current) return;
        const el = scrollerRef.current;
        if (!el) return;
        const card = el.querySelector<HTMLElement>("[data-testimonial-card]");
        const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 4) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          el.scrollBy({ left: step, behavior: "smooth" });
        }
      }, 4000);
    };
    start();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay]);

  const pauseAutoPlay = () => {
    isHoveringRef.current = true;
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const resumeAutoPlay = () => {
    isHoveringRef.current = false;
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      if (isHoveringRef.current) return;
      const el = scrollerRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>("[data-testimonial-card]");
      const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 4000);
  };

  return (
    <section
      id="testimonials"
      data-no-reveal
      className="py-16 sm:py-20 lg:py-32 bg-[#fafafa] relative overflow-hidden"
    >



      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <div className="text-[var(--brand-orange)] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-xs sm:text-sm mb-3">
            Testimonials
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-4xl uppercase leading-[1.05] text-black">
            What Our <span className="text-gradient-orange">Customers</span> Say
          </h2>
          <p className="mt-4 sm:mt-5 text-black/60 text-sm sm:text-base lg:text-lg px-2">
            Real experiences from happy customers who found their perfect car with Metro Cars Vijayawada.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollerRef}
            onScroll={onScroll}
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
            onTouchStart={pauseAutoPlay}
            onTouchEnd={resumeAutoPlay}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 sm:px-6 scrollbar-hide lg:justify-center"
            style={{ scrollbarWidth: "none" }}
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} src={t.src} index={i} muted={muted} onToggleMute={() => setMuted((m) => !m)} />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous testimonial"
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-black text-white items-center justify-center shadow-xl hover:bg-[var(--brand-orange)] hover:text-white transition-colors"
          >
            <ArrowRight className="size-5 rotate-180" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next testimonial"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-black text-white items-center justify-center shadow-xl hover:bg-[var(--brand-orange)] hover:text-white transition-colors"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                active === i ? "w-8 bg-[var(--brand-orange)]" : "w-2 bg-black/20"
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 sm:mt-12 px-4">
          <a
            href="#enquiry"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold uppercase tracking-wide text-xs sm:text-sm text-white shadow-[0_10px_40px_rgba(255,90,0,0.4)] hover:scale-105 transition-transform"
            style={{ background: "var(--gradient-orange)" }}
          >
            View More Customer Reviews
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  src,
  index,
  muted,
  onToggleMute,
}: {
  src: string;
  index: number;
  muted: boolean;
  onToggleMute: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <motion.article
      data-testimonial-card
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group snap-center shrink-0 w-[80vw] max-w-[300px] sm:w-[300px] md:w-[340px] md:max-w-[340px] rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-black/10 shadow-xl hover:shadow-[0_20px_60px_-15px_rgba(255,90,0,0.3)] hover:-translate-y-1 transition-all duration-500"
    >
      <div className="relative aspect-[9/16] bg-black overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          playsInline
          muted={muted}
          loop
          preload="metadata"
          onClick={togglePlay}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* Mute toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleMute();
          }}
          aria-label={muted ? "Unmute" : "Mute"}
          className="absolute top-4 right-4 size-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-[var(--brand-orange)] transition-colors z-10"
        >
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </button>

        {/* Play overlay */}
        {!playing && (
          <button
            onClick={togglePlay}
            aria-label="Play video"
            className="absolute inset-0 m-auto size-16 rounded-full flex items-center justify-center text-white shadow-[0_10px_40px_rgba(255,90,0,0.6)] group-hover:scale-110 transition-transform"
            style={{ background: "var(--gradient-orange)" }}
          >
            <Play className="size-6 fill-white ml-0.5" />
          </button>
        )}
      </div>
    </motion.article>
  );
}

/* ---------- Process ---------- */
const steps = [
  { n: "01", icon: Search, title: "Browse Inventory", desc: "Explore certified pre-owned cars online or visit our showroom to discover the perfect match." },
  { n: "02", icon: ClipboardCheck, title: "Schedule Inspection", desc: "Book a test drive and a detailed 150-point vehicle inspection at your convenience." },
  { n: "03", icon: FileText, title: "Finance & Documentation", desc: "Get easy financing with transparent paperwork and quick approvals from trusted partners." },
  { n: "04", icon: KeyRound, title: "Drive Home", desc: "Take delivery of your dream car and drive home with complete confidence and warranty." },
];

export function ProcessSection() {
  return (
    <section data-no-reveal className="relative py-24 lg:py-32 bg-[#0a0a0a] text-white overflow-hidden">
      {/* ambient bg */}
      <div className="absolute top-1/4 -left-32 size-[420px] rounded-full bg-[var(--brand-orange)]/15 blur-3xl" />
      <div className="absolute bottom-0 -right-32 size-[420px] rounded-full bg-[var(--brand-orange)]/10 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[var(--brand-orange)] font-bold uppercase tracking-[0.25em] text-sm mb-3">
            Our Process
          </div>
          <h2 className="text-2xl lg:text-4xl uppercase leading-[0.95] text-white">
            Buy Your Dream Car in <span className="text-gradient-orange">4 Easy Steps</span>
          </h2>
          <p className="mt-5 text-white/60 text-lg">
            A simple, transparent journey from browsing to driving home.
          </p>
        </div>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* connector line on lg+ */}
          <div className="hidden lg:block absolute top-[88px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--brand-orange)]/50 to-transparent" />

          {steps.map((s, i) => (
            <div key={s.n} className="group relative">
              <div className="relative h-full rounded-3xl p-7 lg:p-8 bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-[var(--brand-orange)]/60 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden">
                {/* hover glow */}
                <div className="absolute -top-16 -right-16 size-40 rounded-full bg-[var(--brand-orange)]/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* step number watermark */}
                <div className="absolute top-3 right-5 text-6xl lg:text-7xl font-black text-white/[0.06] leading-none select-none group-hover:text-[var(--brand-orange)]/20 transition-colors">
                  {s.n}
                </div>

                {/* icon badge */}
                <div className="relative">
                  <div
                    className="size-16 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(255,90,0,0.7)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                    style={{ background: "var(--gradient-orange)" }}
                  >
                    <s.icon className="size-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-black border-2 border-[var(--brand-orange)] flex items-center justify-center text-[10px] font-extrabold text-[var(--brand-orange)]">
                    {i + 1}
                  </div>
                </div>

                <h3 className="relative mt-6 text-base font-extrabold uppercase tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="relative mt-3 text-white/60 text-sm leading-relaxed">
                  {s.desc}
                </p>

                {/* arrow on hover (not on last) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-[76px] size-6 rounded-full bg-[var(--brand-orange)] items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <ArrowRight className="size-3.5 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ---------- Enquiry ---------- */
export function EnquirySection() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-black relative overflow-hidden">
      <div className="absolute -top-32 -right-32 size-[500px] rounded-full bg-[var(--brand-orange)]/15 blur-3xl" />
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-[var(--brand-orange)] font-bold uppercase tracking-[0.25em] text-sm mb-3">
            Get In Touch
          </div>
          <h2 className="text-2xl lg:text-4xl uppercase leading-[0.95] text-white">
            Visit Our <span className="text-gradient-orange">Showroom</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl overflow-hidden border border-white/10 min-h-[450px]">
            <iframe
              title="Metro Cars Vijayawada Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.2006890229245!2d80.6688701110621!3d16.51596288416441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fabcfe85f329%3A0xee1a1240f0c4bb40!2sMetro%20Cars!5e0!3m2!1sen!2sin!4v1784804705143!5m2!1sen!2sin"
              className="w-full h-full min-h-[450px] grayscale-[0.3] contrast-[1.1]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! We'll call you back shortly.");
            }}
            className="rounded-3xl p-8 lg:p-10 glass-card space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" name="name" required />
              <Field label="Phone Number" name="phone" type="tel" required />
              <Field label="Email" name="email" type="email" />
              <Field label="Interested Vehicle" name="vehicle" placeholder="e.g. Honda City" />
            </div>
            <Field label="Budget Range" name="budget" placeholder="₹5L - ₹10L" />
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/60 font-bold mb-2">Message</label>
              <textarea
                name="message"
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--brand-orange)] focus:bg-white/10 transition-all resize-none"
                placeholder="Tell us what you're looking for..."
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full text-white font-bold uppercase tracking-wide shadow-[0_15px_40px_-15px_rgba(255,90,0,0.7)] hover:scale-[1.02] transition-transform"
              style={{ background: "var(--gradient-orange)" }}
            >
              Request Callback <ArrowRight className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-wider text-white/60 font-bold mb-2">{label}{required && " *"}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--brand-orange)] focus:bg-white/10 transition-all"
      />
    </div>
  );
}

/* ---------- FAQ ---------- */
const faqs = [
  { q: "How do you verify vehicles?", a: "Every vehicle undergoes a 150+ point inspection by certified technicians covering engine, transmission, suspension, electricals, and bodywork." },
  { q: "Do you provide finance assistance?", a: "Yes. We partner with leading banks and NBFCs to offer competitive interest rates and quick loan approvals tailored to your profile." },
  { q: "Can I schedule a test drive?", a: "Absolutely. Book a test drive online, by phone, or WhatsApp and our team will arrange a slot at your convenience." },
  { q: "Do you offer vehicle history reports?", a: "Yes. Every certified car comes with a transparent ownership, service, and accident history report." },
  { q: "Do you buy used cars?", a: "Yes, we purchase pre-owned cars at fair market value. Bring your car for a free evaluation and instant quote." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 lg:py-32 bg-[#fafafa]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left side — sticky info card */}
          <motion.div
            className="lg:col-span-2 lg:sticky lg:top-28"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[var(--brand-orange)] font-bold uppercase tracking-[0.25em] text-sm mb-3">FAQ</div>
            <h2 className="text-2xl lg:text-4xl uppercase leading-[0.95] text-black mb-6">
              Frequently Asked <span className="text-gradient-orange">Questions</span>
            </h2>
            <p className="text-black/60 leading-relaxed mb-8 max-w-md">
              Everything you need to know about buying a certified used car at Metro Cars Vijayawada. Can't find your answer? Reach out to us directly.
            </p>

            <div className="relative rounded-2xl overflow-hidden mb-6 shadow-xl group">
              <img
                src={faqSupportUrl}
                alt="Metro Cars Vijayawada support team helping a customer"
                loading="lazy"
                width={1024}
                height={1280}
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--brand-orange)] font-bold mb-1">We're here to help</p>
                <p className="text-lg font-bold leading-tight">Real people. Real answers.</p>
              </div>
            </div>

          </motion.div>

          {/* Right side — accordion */}
          <motion.div
            className="lg:col-span-3 space-y-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                className="rounded-2xl bg-white border border-black/5 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-bold text-black text-lg">{f.q}</span>
                  <ChevronDown className={`size-5 text-[var(--brand-orange)] shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-black/70 leading-relaxed">{f.a}</div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Premium CTA ---------- */
export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const trustItems = [
    "Certified Vehicles",
    "Transparent Pricing",
    "Easy Financing",
    "Verified History Reports",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[350px] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 -top-[15%] -bottom-[15%]"
        style={{ y: bgY }}
      >
        <img
          src={ctaPremium}
          alt="Luxury car on highway at sunset"
          className="w-full h-full object-cover"
          loading="lazy"
          width={1920}
          height={1080}
        />
      </motion.div>

      {/* Black gradient overlay 70% */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Small Label */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold uppercase tracking-[0.2em] text-xs mb-5">
            Metro Cars Vijayawada
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight uppercase tracking-tight">
            Find Your Perfect{" "}
            <span className="text-[var(--brand-orange)]">Pre-Owned Car</span> Today
          </h2>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto mt-4 text-base md:text-lg text-white/80 leading-relaxed">
            Explore our extensive collection of certified used vehicles and drive home with confidence.
          </p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Link
              to="/cars"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold uppercase text-sm tracking-wider text-black transition-all duration-300 hover:scale-105"
              style={{
                background: "var(--gradient-orange)",
                boxShadow: "0 10px 40px -10px rgba(255,90,0,0.5)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(255,90,0,0.7), 0 10px 40px -10px rgba(255,90,0,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 40px -10px rgba(255,90,0,0.5)";
              }}
            >
              Browse Inventory
              <ArrowRight className="size-5" />
            </Link>
          </motion.div>

          {/* Trust Elements */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8">
            {trustItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                className="flex items-center gap-2 text-white/80 text-sm font-medium"
              >
                <CheckCircle2 className="size-4 text-[var(--brand-orange)] shrink-0" />
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Happy Customers Slider ---------- */
export function HappyCustomersSection() {
  const slides = [
    { src: soldBaleno, label: "Baleno Automatic" },
    { src: soldNexon, label: "Tata Nexon" },
    { src: soldCreta, label: "Hyundai Creta" },
    { src: soldInnova, label: "Toyota Innova" },
    { src: soldFortuner, label: "Toyota Fortuner" },
    { src: soldAlto, label: "Alto 800" },
    { src: soldGrandi10, label: "Grand i10" },
  ];
  const [index, setIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const total = slides.length;

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setSlidesPerView(3);
      else if (window.innerWidth >= 768) setSlidesPerView(2);
      else setSlidesPerView(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1 >= total - slidesPerView + 1 ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(id);
  }, [total, slidesPerView]);

  const prev = () => setIndex((i) => (i - 1 < 0 ? total - slidesPerView : i - 1));
  const next = () => setIndex((i) => (i + 1 >= total - slidesPerView + 1 ? 0 : i + 1));
  const shiftPct = 100 / slidesPerView;

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-neutral-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] text-xs font-bold uppercase tracking-widest mb-4">
            Happy Customers
          </span>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-neutral-900">
            Recently Sold at Metro Cars
          </h2>
          <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
            Real customers, real deliveries. Join thousands who trusted us with their car journey.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-3xl bg-white">
            <div
              className="flex gap-4 transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${index * shiftPct}%)` }}
            >
              {slides.map((s, i) => (
                <div
                  key={i}
                  className="min-w-[calc(100%-1rem)] md:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(33.333%-0.75rem)] flex items-center justify-center bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <img
                    src={s.src}
                    alt={`Sold ${s.label} at Metro Cars Vijayawada`}
                    className="w-full h-auto max-h-[400px] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-2 lg:-left-6 top-1/2 -translate-y-1/2 size-12 rounded-full bg-white shadow-xl text-neutral-900 flex items-center justify-center hover:bg-[var(--brand-orange)] hover:text-white transition-colors"
          >
            <ArrowRight className="size-5 rotate-180" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-2 lg:-right-6 top-1/2 -translate-y-1/2 size-12 rounded-full bg-white shadow-xl text-neutral-900 flex items-center justify-center hover:bg-[var(--brand-orange)] hover:text-white transition-colors"
          >
            <ArrowRight className="size-5" />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: total - slidesPerView + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-[var(--brand-orange)]" : "w-2 bg-neutral-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
export function MetroFooter() {
  return (
    <footer className="relative bg-black text-white pt-12 pb-3 lg:pb-2 border-t border-white/5 overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${footerBgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <img src={logoUrl} alt="Metro Cars" className="h-24 lg:h-28 w-auto mb-4" />
            <p className="text-white/60 text-sm leading-relaxed">
              Vijayawada's trusted destination for certified pre-owned cars, transparent pricing and exceptional service.
            </p>
          </div>
          <div>
            <h4 className="font-extrabold uppercase tracking-wider mb-5 text-[var(--brand-orange)]">Quick Links</h4>
            <ul className="space-y-2.5 text-white/70">
              {["Home", "About Us", "Inventory", "Why Choose Us", "Testimonials", "Contact"].map((l) => (
                <li key={l}><a href="#" className="hover:text-[var(--brand-orange)] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold uppercase tracking-wider mb-5 text-[var(--brand-orange)]">Contact</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex gap-3"><Phone className="size-4 text-[var(--brand-orange)] shrink-0 mt-0.5" /> 90599 87777</li>
              <li className="flex gap-3"><Mail className="size-4 text-[var(--brand-orange)] shrink-0 mt-0.5" /> metrocarsusedcars@gmail.com</li>
              <li className="flex gap-3"><MapPin className="size-4 text-[var(--brand-orange)] shrink-0 mt-0.5" /> Opp Government Hospital, Nagarjuna Nagar, Sri Ramachandra Nagar, Vijayawada, Andhra Pradesh - 520007</li>
              <li className="flex gap-3"><Clock className="size-4 text-[var(--brand-orange)] shrink-0 mt-0.5" /> Mon–Sun: 9:00 AM – 9:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-sm">
            All Rights Reserved © 2026 by Metro Cars. Developed By{" "}
            <a
              href="https://ayrondigitalsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand-orange)] font-bold hover:opacity-80 transition-opacity"
            >
              Ayrondigitalsolutions
            </a>
          </p>
          <div className="flex items-center gap-5 text-sm">
            <Link to="/privacy-policy" className="text-white/60 hover:text-[var(--brand-orange)] transition-colors font-semibold">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/refund-policy" className="text-white/60 hover:text-[var(--brand-orange)] transition-colors font-semibold">
              Refund Policy
            </Link>
          </div>
          <div className="flex gap-2">
            {[
              { Icon: Facebook, href: "https://facebook.com/profile.php?id=100063958086908" },
              { Icon: Instagram, href: "https://instagram.com/metro_cars_vijayawada" },
              { Icon: Youtube, href: "https://www.youtube.com/@METROCARSUSEDCARS" },
              {
                Icon: () => (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.585 5.955L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                ),
                href: "https://wa.me/919059987777",
              },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label="Social link"
                className="size-10 rounded-full bg-white/5 hover:bg-[var(--brand-orange)] flex items-center justify-center transition-colors"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Sticky mobile CTAs ---------- */
export function StickyContact() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="https://wa.me/919059987777"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 size-14 rounded-full flex items-center justify-center text-white shadow-[0_15px_40px_-10px_rgba(34,197,94,0.6)] hover:scale-110 transition-transform"
        style={{ background: "linear-gradient(135deg, #25d366, #128c7e)" }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.585 5.955L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      <a
        href="tel:+919059987777"
        aria-label="Call now"
        className="md:hidden fixed bottom-5 left-5 z-40 size-14 rounded-full flex items-center justify-center text-white shadow-[0_15px_40px_-10px_rgba(255,90,0,0.7)]"
        style={{ background: "var(--gradient-orange)" }}
      >
        <Phone className="size-6" />
      </a>

      {/* Scroll to top — mobile-optimized */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Go to top"
        className={`fixed z-40 flex items-center justify-center rounded-full text-white transition-all duration-500 shadow-lg ${
          showTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        } md:bottom-24 md:right-5 md:pl-3 md:pr-4 md:py-3 md:gap-2 md:w-auto bottom-20 right-3 size-12`}
        style={{
          background: "var(--gradient-orange)",
          boxShadow: "0 10px 30px -10px rgba(255,90,0,0.6)",
        }}
      >
        <ChevronUp className="size-5 md:size-4" />
        <span className="hidden md:inline font-bold uppercase tracking-wider text-xs">Go to Top</span>
      </button>
    </>
  );
}