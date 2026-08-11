import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MetroHeader } from "@/components/MetroHeader";
import { MetroFooter, StickyContact } from "@/components/MetroSections";
import { Ban, ArrowLeft } from "lucide-react";

export default function RefundPolicy() {
  const title = "Refund Policy | Metro Cars Vijayawada";
  const description =
    "All vehicle sales at Metro Cars Vijayawada are final. Review our no-return, no-refund policy, booking terms and finance cancellation guidelines.";
  return (
    <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href="https://metro-auto-bloom.lovable.app/refund-policy" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://metro-auto-bloom.lovable.app/refund-policy" />
      <meta name="robots" content="index,follow" />
    </Helmet>
    <main className="min-h-screen bg-white">
      <MetroHeader />

      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-black text-white overflow-hidden">
        <div className="absolute -top-32 -right-32 size-[500px] rounded-full bg-[var(--brand-orange)]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 size-[500px] rounded-full bg-[var(--brand-orange)]/10 blur-3xl" />
        <div className="container mx-auto px-4 lg:px-8 relative text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Ban className="size-4 text-[var(--brand-orange)]" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold">No Return · No Refund</span>
          </div>
          <h1 className="text-3xl lg:text-5xl uppercase leading-[0.95]">
            Refund <span className="text-gradient-orange">Policy</span>
          </h1>
          <p className="mt-5 text-white/70 text-lg">
            Last updated: January 2026 — Metro Cars Vijayawada
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="mb-10 p-6 lg:p-8 rounded-2xl border-2 border-[var(--brand-orange)] bg-[var(--brand-orange)]/5">
            <div className="flex items-start gap-4">
              <Ban className="size-8 text-[var(--brand-orange)] shrink-0 mt-1" />
              <div>
                <h2 className="text-xl lg:text-2xl font-extrabold uppercase text-black mb-2">
                  No Return &amp; No Refund Policy
                </h2>
                <p className="text-black/70 leading-relaxed">
                  All vehicle sales at Metro Cars Vijayawada are <strong>final</strong>. Once a car has been
                  purchased and the transaction is completed, <strong>no returns, exchanges, or refunds</strong> will
                  be entertained under any circumstances.
                </p>
              </div>
            </div>
          </div>

          <article className="space-y-8">
            <Block title="1. Final Sale">
              Every vehicle sold by Metro Cars Vijayawada is treated as a final sale. Once payment is received
              (in full or as booking amount) and delivery/documentation is initiated, the sale cannot be
              reversed and no refund will be issued.
            </Block>
            <Block title="2. Inspection Before Purchase">
              Customers are strongly encouraged to thoroughly inspect the vehicle, take a test drive, and
              verify all documents (RC, insurance, service history) before making the payment. Our team is
              happy to assist with a detailed walkthrough at the showroom.
            </Block>
            <Block title="3. Booking Amount">
              Any booking or token amount paid to reserve a vehicle is strictly <strong>non-refundable</strong>.
              If the buyer cancels the booking or does not complete the purchase, the booking amount will be
              forfeited.
            </Block>
            <Block title="4. No Exchange After Delivery">
              Once the vehicle has been delivered and the ownership transfer process has started, we do not
              accept returns or offer exchanges. Any exchange offer discussed prior to purchase must be
              agreed upon in writing before payment.
            </Block>
            <Block title="5. Warranty & After-Sales Support">
              While there are no refunds, eligible vehicles may come with a limited warranty or assured
              after-sales support as communicated at the time of purchase. Please refer to your invoice and
              warranty document for exact terms.
            </Block>
            <Block title="6. Finance & Loan Cancellations">
              If the purchase is being made via a bank/NBFC loan and the loan is rejected after booking, any
              refund of the booking amount will be at the sole discretion of Metro Cars Vijayawada and may
              be subject to processing charges.
            </Block>
            <Block title="7. Contact Us">
              For any clarifications regarding this policy, please contact Metro Cars Vijayawada at{" "}
              <strong>+91 90599 87777</strong> or email <strong>metrocarsusedcars@gmail.com</strong> before making
              a purchase.
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
