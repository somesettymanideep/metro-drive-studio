import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView, animate, useReducedMotion } from "framer-motion";
import {
  Star,
  Calendar,
  Fuel,
  Settings2,
  Gauge,
  User,
  Wrench,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Phone,
  Zap,
  Cog,
  Droplet,
  BadgeCheck,
  FileCheck2,
  Handshake,
  ChevronRight,
  Accessibility,
} from "lucide-react";
import { MetroHeader } from "@/components/MetroHeader";
import { MetroFooter, StickyContact } from "@/components/MetroSections";
import fortunerImg from "@/assets/featured-fortuner.webp";

const specs = [
  { icon: Calendar, label: "2024 Model" },
  { icon: Fuel, label: "Diesel" },
  { icon: Settings2, label: "Automatic" },
  { icon: Gauge, label: "18,000 KM" },
  { icon: User, label: "Single Owner" },
  { icon: Wrench, label: "Full Service History" },
  { icon: ShieldCheck, label: "Company Warranty" },
  { icon: BadgeCheck, label: "Zero Accidents" },
];

const featureCards = [
  { icon: Cog, label: "Engine", value: "2.8L Turbo Diesel" },
  { icon: Zap, label: "Power", value: "204 HP" },
  { icon: Droplet, label: "Mileage", value: "14 KM/L" },
  { icon: Handshake, label: "Finance", value: "Available" },
  { icon: ShieldCheck, label: "Warranty", value: "Included" },
  { icon: FileCheck2, label: "Insurance", value: "Active" },
];

const hotspots = [
  { x: 22, y: 55, label: "LED Headlamps", desc: "Bi-LED projector with DRLs" },
  { x: 45, y: 40, label: "Sunroof", desc: "Panoramic single-pane" },
  { x: 70, y: 72, label: "Alloy Wheels", desc: "18\" machined alloys" },
  { x: 82, y: 45, label: "Interior", desc: "Premium leather cabin" },
  { x: 15, y: 78, label: "Engine", desc: "2.8L GD Turbo Diesel" },
];

const stats = [
  { end: 250, suffix: "+", label: "Happy Owners" },
  { end: 100, suffix: "%", label: "Verified Cars" },
  { end: 7, suffix: " Days", label: "Return Support" },
  { end: 30, suffix: " Min", label: "Finance Approval" },
];

const badges = [
  "Certified Vehicle",
  "RC Verified",
  "Insurance Verified",
  "Service History",
  "Finance Approved",
  "Exchange Available",
];

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, end]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function Product() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const seoTitle = "Toyota Fortuner Legender 2024 for Sale | Metro Cars Vijayawada";
  const seoDesc =
    "Featured this week at Metro Cars Vijayawada: single-owner Toyota Fortuner Legender 2024 with full service history, company warranty and easy finance.";

  // Reduced motion: honor system pref + expose a user toggle
  const systemReduced = useReducedMotion();
  const [userReduced, setUserReduced] = useState(false);
  const reduced = systemReduced || userReduced;

  // Parallax on the car image
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const carY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [40, -80]);
  const glowY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -60]);

  // 3D tilt on hover
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 120, damping: 15 });
  const springRY = useSpring(rotateY, { stiffness: 120, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 12);
    rotateX.set(-(py - 0.5) * 8);
  };
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  // Active hotspot (kept open on focus/click for keyboard users)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveHotspot(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href="https://metro-auto-bloom.lovable.app/product" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content="https://metro-auto-bloom.lovable.app/product" />
        <meta property="og:type" content="product" />
      </Helmet>
      <MetroHeader />

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute top-[10%] left-[5%] size-[500px] rounded-full bg-[#F97316]/10 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[5%] size-[600px] rounded-full bg-[#EA580C]/10 blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating particles (skipped when reduced motion) */}
      {!reduced && (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute size-1 rounded-full bg-[#F97316]/40"
              style={{ left: `${(i * 7) % 100}%`, top: `${(i * 13) % 100}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
          ))}
        </div>
      )}

      {/* Reduce motion toggle */}
      <button
        type="button"
        onClick={() => setUserReduced((v) => !v)}
        aria-pressed={userReduced}
        className="fixed bottom-24 right-4 z-40 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/70 backdrop-blur border border-white/15 text-xs font-semibold text-white/90 hover:border-[#F97316]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/70 transition-colors"
      >
        <Accessibility className="size-4 text-[#F97316]" />
        {reduced ? "Motion reduced" : "Reduce motion"}
      </button>

      <main className="relative z-10 pt-32 lg:pt-40 pb-24 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur mb-5">
              <Sparkles className="size-3.5 text-[#F97316]" />
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/80">
                Featured This Week
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1] max-w-3xl mx-auto">
              The Legend Returns.{" "}
              <span className="bg-gradient-to-r from-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                Own It.
              </span>
            </h1>
            <p className="mt-5 text-white/60 max-w-2xl mx-auto text-base lg:text-lg">
              Hand-picked, fully certified, and ready to drive home. A pristine flagship SUV curated for those who demand nothing less.
            </p>
          </motion.div>

          {/* Hero split */}
          <div ref={heroRef} className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            {/* Left – Car image (60%) */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3 relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 1200 }}
            >
              {/* Glow */}
              <motion.div
                aria-hidden
                style={{ y: glowY }}
                className="absolute inset-x-6 top-16 h-[80%] rounded-[100%] bg-gradient-to-r from-[#F97316]/40 via-[#EA580C]/30 to-[#F97316]/40 blur-[100px]"
              />

              <motion.div
                style={{ y: carY, rotateX: springRX, rotateY: springRY, transformStyle: "preserve-3d" }}
                className="relative"
              >
                <img decoding="async"
                  src={fortunerImg}
                  alt="Toyota Fortuner Legender 2024 featured car"
                  width={1600}
                  height={1024}
                  loading="eager"
                  className="relative w-full h-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:scale-[1.03]"
                />

                {/* Reflection */}
                <div
                  aria-hidden
                  className="mx-auto mt-2 h-8 w-3/4 rounded-[50%] bg-black/60 blur-2xl opacity-70"
                />

                {/* Hotspots */}
                <ul
                  role="list"
                  aria-label="Vehicle feature hotspots. Tab to explore each highlight."
                  className="contents"
                >
                  {hotspots.map((h, i) => {
                    const isOpen = activeHotspot === i;
                    const tipId = `hotspot-tip-${i}`;
                    return (
                      <li
                        key={h.label}
                        className="absolute group"
                        style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%,-50%)" }}
                      >
                        {!reduced && (
                          <motion.span
                            aria-hidden
                            className="absolute inset-0 -m-3 rounded-full bg-[#F97316]/40"
                            animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.35 }}
                          />
                        )}
                        <button
                          type="button"
                          aria-label={`${h.label}: ${h.desc}`}
                          aria-describedby={tipId}
                          aria-expanded={isOpen}
                          onClick={() => setActiveHotspot(isOpen ? null : i)}
                          onFocus={() => setActiveHotspot(i)}
                          onBlur={(e) => {
                            // keep open if focus moved into the tooltip
                            if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                              setActiveHotspot((cur) => (cur === i ? null : cur));
                            }
                          }}
                          onMouseEnter={() => setActiveHotspot(i)}
                          onMouseLeave={() => setActiveHotspot((cur) => (cur === i ? null : cur))}
                          className="relative size-4 rounded-full bg-[#F97316] border-2 border-white shadow-[0_0_20px_rgba(249,115,22,0.8)] hover:scale-125 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                        />
                        <div
                          id={tipId}
                          role="tooltip"
                          className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 min-w-[160px] px-3 py-2 rounded-xl bg-black/90 backdrop-blur border border-white/10 transition-all duration-200 ${
                            isOpen
                              ? "opacity-100 -translate-y-1 pointer-events-auto"
                              : "opacity-0 -translate-y-2 pointer-events-none"
                          }`}
                        >
                          <div className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                            {h.label}
                          </div>
                          <div className="text-[11px] text-white/70 mt-0.5">{h.desc}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <p className="sr-only">
                  Press Tab to move between hotspots, Enter or Space to toggle each tooltip, and Escape to close.
                </p>
              </motion.div>

              {/* Corner badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                <Star className="size-3.5 fill-white" /> Featured Vehicle
              </div>
            </motion.div>

            {/* Right – details (40%) */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2"
            >
              <div className="text-xs uppercase tracking-[0.3em] font-bold text-[#F97316] mb-3">
                Toyota • SUV • Diesel AT
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-[1] tracking-tight">
                Toyota Fortuner<br />
                <span className="text-white/80 font-bold text-2xl md:text-3xl">Legender 2024</span>
              </h2>

              <div className="mt-6 flex items-center gap-1 text-[#F97316]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-[#F97316]" />
                ))}
                <span className="ml-2 text-sm text-white/60">4.9 · 128 reviews</span>
              </div>

              <div className="mt-6">
                <div className="flex items-baseline gap-3">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                    ₹42,90,000
                  </div>
                  <div className="text-sm text-white/40 line-through">₹48,50,000</div>
                </div>
                <div className="mt-2 text-sm text-white/60">
                  Finance starts from{" "}
                  <span className="text-white font-semibold">₹48,999/month</span>
                </div>
              </div>

              <p className="mt-6 text-white/70 leading-relaxed text-sm md:text-base">
                A single-owner flagship in immaculate condition — full company service history,
                active company warranty, verified RC, and comprehensive insurance. Certified,
                inspected on 200+ points, and ready to drive home today.
              </p>

              {/* Spec grid */}
              <div className="mt-8 grid grid-cols-2 gap-2.5">
                {specs.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur hover:border-[#F97316]/40 transition-colors"
                  >
                    <s.icon className="size-4 text-[#F97316] shrink-0" />
                    <span className="text-xs font-semibold text-white/85">{s.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-8 flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to="/car/hyundai-venue-s-o"
                  className="group relative inline-flex flex-1 items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold uppercase text-sm tracking-wide text-white overflow-hidden transition-transform hover:scale-[1.03]"
                  style={{
                    background: "linear-gradient(90deg,#F97316,#EA580C)",
                    boxShadow: "0 15px 40px -10px rgba(249,115,22,0.6)",
                  }}
                >
                  <span className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12" />
                  <span className="relative">View Full Details</span>
                  <ArrowRight className="relative size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="https://wa.me/919059987777?text=I%20would%20like%20to%20book%20a%20test%20drive%20for%20the%20Toyota%20Fortuner%20Legender%202024"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold uppercase text-sm tracking-wide bg-white/[0.06] border border-white/15 text-white hover:bg-white/10 hover:border-[#F97316]/50 transition-all"
                >
                  <Phone className="size-4" /> Book Test Drive
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Feature cards */}
          <div className="mt-24 lg:mt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10 text-center"
            >
              <div className="text-xs uppercase tracking-[0.3em] text-[#F97316] font-bold mb-3">
                Under The Hood
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                Performance & Peace of Mind
              </h3>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 overflow-x-auto md:overflow-visible">
              {featureCards.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6, scale: 1.04 }}
                  className="group relative rounded-3xl p-5 bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-[#F97316]/50 hover:shadow-[0_20px_50px_-15px_rgba(249,115,22,0.4)] transition-all"
                >
                  <div className="size-11 rounded-2xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-lg shadow-[#F97316]/30 mb-4 transition-transform group-hover:rotate-6">
                    <c.icon className="size-5 text-white" />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">
                    {c.label}
                  </div>
                  <div className="text-sm font-bold text-white mt-1">{c.value}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-24 lg:mt-32 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-xl p-8 md:p-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                    <Counter end={s.end} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs md:text-sm uppercase tracking-wider text-white/60 font-semibold">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-14 flex flex-wrap justify-center gap-3"
          >
            {badges.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-white/80 hover:border-[#F97316]/50 transition-colors"
              >
                <BadgeCheck className="size-4 text-[#F97316]" />
                {b}
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom link back */}
          <div className="mt-16 text-center">
            <Link
              to="/#inventory"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#F97316] transition-colors"
            >
              Browse full inventory <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      </main>

      <MetroFooter />
      <StickyContact />
    </div>
  );
}
