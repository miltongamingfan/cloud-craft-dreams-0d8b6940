import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import { Handshake } from "lucide-react";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Affiliate & Partner Program — TigerHost" },
      { name: "description", content: "Earn 25% recurring commission on every customer you refer to TigerHost. Custom tiers available for creators and communities." },
    ],
  }),
  component: () => (
    <InfoPage
      icon={<Handshake className="h-7 w-7 text-primary-foreground" />}
      eyebrow="Partner Program"
      title={<>Earn <span className="gradient-text">25% recurring</span> on every referral.</>}
      intro="Built for content creators, community owners, and Discord admins. Real-time dashboard, monthly PayPal/crypto/bank payouts, and dedicated partner support."
      body={[
        { heading: "Industry-leading commissions", text: "25% recurring on every active subscription — for as long as the customer stays. No caps, no claw-backs after the first month." },
        { heading: "Custom creator tiers", text: "YouTubers, streamers, and community owners over 5,000 subscribers get custom coupon codes, co-branded landing pages, and bumped commission tiers." },
        { heading: "Real-time dashboard", text: "Track clicks, signups, conversions, MRR, and payouts in real time. Export reports any time." },
      ]}
      bullets={["25% recurring commission", "60-day cookie window", "Monthly payouts (PayPal, crypto, bank)", "Custom coupon codes", "Co-branded landing pages", "Dedicated partner manager"]}
      ctaPrimary={{ label: "Apply now", to: "/contact" }}
      ctaSecondary={{ label: "Talk to partnerships", to: "/contact" }}
    />
  ),
});
