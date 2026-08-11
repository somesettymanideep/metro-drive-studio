import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MetroHeader } from "@/components/MetroHeader";
import { MetroFooter, StickyContact } from "@/components/MetroSections";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  const title = "Privacy Policy | Metro Cars Vijayawada";
  const description =
    "Read how Metro Cars Vijayawada collects, uses and protects your personal information across our website, enquiries and in-store visits.";
  return (
    <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href="https://metro-auto-bloom.lovable.app/privacy-policy" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://metro-auto-bloom.lovable.app/privacy-policy" />
      <meta name="robots" content="index,follow" />
    </Helmet>
    <main className="min-h-screen bg-white">
      <MetroHeader />

      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-black text-white overflow-hidden">
        <div className="absolute -top-32 -right-32 size-[500px] rounded-full bg-[var(--brand-orange)]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 size-[500px] rounded-full bg-[var(--brand-orange)]/10 blur-3xl" />
        <div className="container mx-auto px-4 lg:px-8 relative text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <ShieldCheck className="size-4 text-[var(--brand-orange)]" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold">Your Privacy Matters</span>
          </div>
          <h1 className="text-3xl lg:text-5xl uppercase leading-[0.95]">
            Privacy <span className="text-gradient-orange">Policy</span>
          </h1>
          <p className="mt-5 text-white/70 text-lg">
            Last updated: January 2026 — Metro Cars Vijayawada
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <article className="prose prose-lg max-w-none text-black/80 space-y-8">
            <Block title="1. Introduction">
              Metro Cars Vijayawada ("we", "our", "us") respects your privacy and is committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data when you visit our website or showroom.
            </Block>
            <Block title="2. Information We Collect">
              We may collect your name, phone number, email address, vehicle preferences, budget range, and any details you provide via enquiry forms, calls, WhatsApp, or in-person visits. We also collect technical data such as your IP address and browser type for analytics.
            </Block>
            <Block title="3. How We Use Your Information">
              Your information is used to respond to enquiries, schedule test drives, process financing applications, share vehicle recommendations, and improve our services. We may also contact you with relevant offers if you opt in.
            </Block>
            <Block title="4. Sharing of Information">
              We do not sell your data. We may share necessary information with finance partners (banks/NBFCs), insurance providers, and RTO agents strictly to facilitate your purchase. All partners are bound by confidentiality.
            </Block>
            <Block title="5. Cookies & Analytics">
              Our website uses cookies to enhance browsing experience and analyse traffic. You can disable cookies in your browser settings; some features may not function correctly without them.
            </Block>
            <Block title="6. Data Security">
              We employ industry-standard security measures to protect your data from unauthorised access, alteration, or disclosure. However, no transmission over the internet is 100% secure.
            </Block>
            <Block title="7. Your Rights">
              You can request access, correction, or deletion of your personal data at any time by contacting us at metrocarsusedcars@gmail.com. You may also opt out of marketing communications.
            </Block>
            <Block title="8. Third-Party Links">
              Our website may contain links to third-party sites. We are not responsible for the privacy practices of those external websites.
            </Block>
            <Block title="9. Updates to This Policy">
              We may revise this policy from time to time. The latest version will always be available on this page with the updated revision date.
            </Block>
            <Block title="10. Contact Us">
              For any privacy-related questions, contact Metro Cars Vijayawada at <strong>+91 90599 87777</strong> or email <strong>metrocarsusedcars@gmail.com</strong>. Address: Benz Circle, Vijayawada, Andhra Pradesh.
            </Block>
          </article>

          <div className="mt-14 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-white font-bold uppercase tracking-wide text-sm shadow-[0_15px_40px_-15px_rgba(255,90,0,0.6)] hover:scale-105 transition-transform"
              style={{ background: "var(--gradient-orange)" }}
            >
              <ArrowLeft className="size-4" /> Back to Home
            </Link>
          </div>
        </div>
      </section>

      <MetroFooter />
      <StickyContact />
    </main>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-[var(--brand-orange)] pl-6 py-2">
      <h2 className="text-xl lg:text-2xl font-extrabold uppercase text-black mb-3 tracking-tight">{title}</h2>
      <p className="text-black/70 leading-relaxed">{children}</p>
    </div>
  );
}
