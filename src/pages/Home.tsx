import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { MetroHeader } from "@/components/MetroHeader";
import { MetroHero } from "@/components/MetroHero";
import {
  TrustBar,
  AboutSection,
  FounderSection,
  ServicesSection,
  InventorySection,
  WhySection,
  TestimonialsSection,
  ProcessSection,
  EnquirySection,
  FAQSection,
  CTASection,
  HappyCustomersSection,
  MetroFooter,
  StickyContact,
} from "@/components/MetroSections";

const SITE = "https://metro-auto-bloom.lovable.app";

export default function Home() {
  const title = "Metro Cars Vijayawada | Buy Certified Pre-Owned Cars";
  const description =
    "Vijayawada's trusted used car showroom. Browse certified pre-owned sedans, SUVs, hatchbacks and luxury cars with transparent pricing, verified history and easy finance.";

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
    const id = params.get("section");
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
      params.delete("section");
      const base = window.location.hash.split("?")[0] || "#/";
      window.history.replaceState(null, "", `${base}${params.toString() ? "?" + params.toString() : ""}`);
    }
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE}/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE}/`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoDealer",
          name: "Metro Cars Vijayawada",
          url: `${SITE}/`,
          telephone: "+91-90599-87777",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Opp Government Hospital, Nagarjuna Nagar, Sri Ramachandra Nagar",
            addressLocality: "Vijayawada",
            addressRegion: "Andhra Pradesh",
            postalCode: "520007",
            addressCountry: "IN",
          },
          openingHours: "Mo-Su 09:00-21:00",
        })}</script>
      </Helmet>
      <MetroHeader />
      <MetroHero />
      <TrustBar />
      <AboutSection />
      <ServicesSection />

      <InventorySection />

      <WhySection />
      <FounderSection />
      <ProcessSection />
      <TestimonialsSection />
      <EnquirySection />
      <FAQSection />
      <CTASection />
      <HappyCustomersSection />
      <MetroFooter />
      <StickyContact />
    </main>
  );
}

