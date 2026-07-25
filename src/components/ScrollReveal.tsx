import { useEffect } from "react";

/**
 * Applies a fade-up reveal animation to all <section> elements and their
 * significant children as they enter the viewport. Non-invasive: works
 * across the whole site without touching individual components.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const revealSelector = [
      "section",
      "section > *",
      "footer",
      "footer > *",
      "[data-reveal]",
    ].join(", ");

    const observed = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        });
      },
      // threshold must stay 0: tall sections (e.g. the mobile 1-column car
      // grid) can never reach a percentage threshold and would stay hidden.
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );

    const attach = () => {
      document.querySelectorAll<HTMLElement>(revealSelector).forEach((el) => {
        if (observed.has(el)) return;
        // Skip fixed/sticky nav/overlays
        const pos = getComputedStyle(el).position;
        if (pos === "fixed" || pos === "sticky") return;
        // Skip opt-outs
        if (el.closest("[data-no-reveal]")) return;
        observed.add(el);
        el.classList.add("reveal-init");
        observer.observe(el);
      });
    };

    attach();

    // Re-scan when route/content changes
    const mo = new MutationObserver(() => attach());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
