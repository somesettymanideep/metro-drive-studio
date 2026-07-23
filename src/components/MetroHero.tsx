import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroSedan from "@/assets/hero-sedan.jpg";
import heroSuv from "@/assets/hero-suv.jpg";
import heroHandover from "@/assets/hero-handover.jpg";

const slides = [
  {
    img: heroSedan,
    eyebrow: "Premium Pre-Owned",
    title: "Find Your Perfect Pre-Owned Car",
    desc: "Certified used cars with complete transparency and trusted quality in Vijayawada.",
    cta1: { label: "View Inventory", href: "/cars" },
    cta2: { label: "Book Test Drive", href: "https://wa.me/919059987777?text=Hi%20Metro%20Cars%2C%20I%27d%20like%20to%20book%20a%20test%20drive." },
  },
  {
    img: heroSuv,
    eyebrow: "Inspected. Verified. Trusted.",
    title: "Drive Home With Confidence",
    desc: "Every vehicle is thoroughly inspected and verified before delivery.",
    cta1: { label: "Browse Cars", href: "/cars" },
    cta2: { label: "Get Finance Assistance", href: "https://wa.me/919059987777?text=Hi%20Metro%20Cars%2C%20I%20need%20finance%20assistance." },
  },
  {
    img: heroHandover,
    eyebrow: "Vijayawada's #1 Dealer",
    title: "Trusted Used Car Dealer in Vijayawada",
    desc: "Hundreds of satisfied customers choose Metro Cars for reliability and value.",
    cta1: { label: "Explore Cars", href: "/cars" },
    cta2: { label: "Contact Us", href: "https://wa.me/919059987777?text=Hi%20Metro%20Cars%2C%20I%27d%20like%20to%20know%20more." },
  },
];

export function MetroHero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const s = slides[i];

  return (
    <section id="home" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black">
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={s.img}
            alt={s.title}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full container mx-auto px-4 lg:px-8 flex items-center">
        <div className="max-w-3xl pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6">
                <span className="size-2 rounded-full bg-[var(--brand-orange)] animate-pulse" />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
                  {s.eyebrow}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl text-white leading-[0.95] uppercase">
                {s.title.split(" ").map((w, idx) => (
                  <span key={idx} className={idx === 2 ? "text-gradient-orange" : ""}>
                    {w}{" "}
                  </span>
                ))}
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed">
                {s.desc}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to={s.cta1.href}
                  className="group inline-flex items-center gap-2 px-7 py-4 rounded-full text-white font-bold uppercase tracking-wide text-sm transition-all hover:scale-105 shadow-[0_20px_50px_-15px_rgba(255,90,0,0.7)]"
                  style={{ background: "var(--gradient-orange)" }}
                >
                  {s.cta1.label}
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={s.cta2.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass-card text-white font-bold uppercase tracking-wide text-sm hover:bg-white/15 transition-all"
                >
                  {s.cta2.label}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 inset-x-0 z-10 container mx-auto px-4 lg:px-8 flex items-end justify-between">
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className="h-1 rounded-full bg-white/30 overflow-hidden transition-all"
              style={{ width: idx === i ? 64 : 24 }}
            >
              {idx === i && (
                <motion.span
                  key={i}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="block h-full bg-[var(--brand-orange)]"
                />
              )}
            </button>
          ))}
        </div>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)}
            className="size-12 rounded-full glass-card text-white flex items-center justify-center hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => setI((p) => (p + 1) % slides.length)}
            className="size-12 rounded-full glass-card text-white flex items-center justify-center hover:bg-white/20"
            aria-label="Next"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}