import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionTitle } from "@/components/site/Sections";
import { CreditCard, Wallet, Bitcoin, Banknote, Globe, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "Payment Methods — TigerHost" },
      { name: "description", content: "Pay for your hosting with credit card, PayPal, crypto (BTC, ETH, LTC, USDT), UPI, INR, or local methods. No hidden fees." },
    ],
  }),
  component: PaymentPage,
});

const methods = [
  { icon: CreditCard, title: "Credit & Debit Cards", desc: "Visa, Mastercard, American Express, Discover. Stripe-secured, 3D Secure where required.", region: "Worldwide" },
  { icon: Wallet, title: "PayPal", desc: "One-click PayPal billing. Works as both one-time and recurring subscription.", region: "Worldwide" },
  { icon: Bitcoin, title: "Cryptocurrency", desc: "Bitcoin, Ethereum, Litecoin, USDT (TRC-20 / ERC-20), USDC. Confirmed in 1-3 blocks.", region: "Worldwide" },
  { icon: Banknote, title: "UPI / Indian payments", desc: "GPay, PhonePe, Paytm, NetBanking, RuPay. Auto-mandate for recurring billing.", region: "India" },
  { icon: Globe, title: "Local methods", desc: "iDEAL (NL), Bancontact (BE), SEPA, SOFORT, EPS, Giropay, BLIK, MB WAY, OXXO, and more.", region: "Europe & LATAM" },
  { icon: Wallet, title: "Direct Discord billing", desc: "Pay through our Discord ticket system using any of the methods above. Useful for one-off custom builds.", region: "Anywhere" },
];

function PaymentPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur">
          Billing
        </span>
        <h1 className="mt-5 font-display text-5xl font-extrabold md:text-6xl">Pay <span className="gradient-text">your way</span>, anywhere.</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          We accept every major payment method and a stack of local options. Same price, no card surcharges, no hidden FX fees.
        </p>
      </section>

      <Section>
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {methods.map((m) => (
            <div key={m.title} className="rounded-2xl border border-border/60 bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
                <m.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">{m.title}</h2>
                <span className="rounded-full bg-secondary/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{m.region}</span>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Safe & secure" title="Your money is protected" />
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
          {["PCI DSS Level 1", "3D Secure 2.0", "7-day money-back"].map((s) => (
            <div key={s} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/40 p-5">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-semibold">{s}</span>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <Link to="/buy" className="rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">
            Order via Discord
          </Link>
        </div>
      </Section>
    </>
  );
}
