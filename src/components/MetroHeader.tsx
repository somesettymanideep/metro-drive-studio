import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import logoUrl from "@/assets/metro-cars-logo.webp";

const links = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#about", label: "About Us", id: "about" },
  { href: "#inventory", label: "Inventory", id: "inventory" },
  { href: "#why", label: "Why Choose Us", id: "why" },
  { href: "#testimonials", label: "Testimonials", id: "testimonials" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export function MetroHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("home");
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setOpen(false);
    setActiveSection(sectionId);
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate(`/?section=${sectionId}`);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleIntersection = () => {
      const sections = links.map(l => document.getElementById(l.id)).filter(Boolean);
      
      sections.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleIntersection, { passive: true });
    return () => window.removeEventListener("scroll", handleIntersection);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-white/10 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
        <a
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <img
            src={logoUrl}
            alt="Metro Cars Vijayawada"
            className="h-16 lg:h-20 w-auto drop-shadow-[0_0_20px_rgba(255,90,0,0.4)]"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.id)}
              className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors relative group ${
                activeSection === l.id
                  ? "text-[var(--brand-orange)]"
                  : "text-white/90 hover:text-[var(--brand-orange)]"
              }`}
            >
              {l.label}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[var(--brand-orange)] transition-all ${
                  activeSection === l.id ? "w-2/3" : "w-0 group-hover:w-2/3"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="tel:+919059987777"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-semibold transition-all"
          >
            <Phone className="size-4" /> Call Now
          </a>
          <a
            href="https://wa.me/919059987777"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(255,90,0,0.6)] transition-all hover:scale-105"
            style={{ background: "var(--gradient-orange)" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.585 5.955L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-black border-t border-white/10"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.id)}
                className={`px-3 py-3 font-semibold uppercase text-sm tracking-wide border-b border-white/5 transition-colors ${
                  activeSection === l.id
                    ? "text-[var(--brand-orange)]"
                    : "text-white/90 hover:text-[var(--brand-orange)]"
                }`}
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 mt-3">
              <a
                href="tel:+919059987777"
                className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 rounded-full bg-white/10 text-white font-semibold"
              >
                <Phone className="size-4" /> Call
              </a>
              <a
                href="https://wa.me/919059987777"
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 rounded-full text-white font-semibold"
                style={{ background: "var(--gradient-orange)" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.585 5.955L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}