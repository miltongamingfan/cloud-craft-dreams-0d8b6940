import { createFileRoute } from "@tanstack/react-router";
import { Hero, Section, SectionTitle, FeatureGrid, PlanCard } from "@/components/site/Sections";

export const Route = createFileRoute("/rdp")({
  head: () => ({
    meta: [
      { title: "Windows RDP Hosting — HexoraCloud" },
      { name: "description", content: "Dedicated Windows RDP servers with admin access, GPU options, and instant deployment." },
    ],
  }),
  component: RdpPage,
});

function RdpPage() {
  return (
    <>
      <Hero
        eyebrow="Windows Server 2019/2022 • GPU optional"
        title="Windows RDP, ready in"
        highlight="60 seconds."
        subtitle="Full admin access, dedicated public IP, NVMe storage, and GPU-enabled plans for rendering, trading, and forex."
      />

      <Section>
        <SectionTitle eyebrow="RDP Features" title="A real Windows desktop in the cloud" />
        <FeatureGrid
          items={[
            { icon: "Server", title: "Admin Access", desc: "Install anything: MT4/MT5, Chrome, AnyDesk, your trading bots." },
            { icon: "Cpu", title: "GPU Plans", desc: "RTX A4000 / A5000 options for rendering, AI, and gaming." },
            { icon: "Globe", title: "Multi-region", desc: "US, EU, Asia. Pick the lowest-latency hub for your broker." },
            { icon: "Lock", title: "Private IPv4", desc: "Dedicated public IP. Optional residential IPs on request." },
            { icon: "HardDrive", title: "NVMe Storage", desc: "Boots in seconds, programs launch instantly." },
            { icon: "Headphones", title: "24/7 Setup Help", desc: "We help install MT4, EA bots, and configure your stack." },
          ]}
        />
      </Section>

      <Section>
        <SectionTitle eyebrow="RDP Plans" title="Forex-ready, render-ready, you-ready" />
        <div className="grid gap-6 md:grid-cols-4">
          <PlanCard name="RDP Lite" price="$8" tagline="Forex VPS" features={["2 vCPU", "4 GB RAM", "50 GB NVMe", "Win Server 2019"]} />
          <PlanCard name="RDP Pro" price="$18" popular tagline="Power users" features={["4 vCPU", "8 GB RAM", "120 GB NVMe", "Win Server 2022", "Admin access"]} />
          <PlanCard name="RDP GPU" price="$79" tagline="Render & AI" features={["8 vCPU", "16 GB RAM", "RTX A4000 8GB", "240 GB NVMe", "GPU drivers preinstalled"]} />
          <PlanCard name="RDP Max" price="$149" tagline="Studio grade" features={["16 vCPU", "32 GB RAM", "RTX A5000 24GB", "500 GB NVMe", "Priority support"]} />
        </div>
      </Section>
    </>
  );
}
