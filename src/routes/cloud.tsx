import { createFileRoute } from "@tanstack/react-router";
import { Hero, Section, SectionTitle, FeatureGrid, PlanCard } from "@/components/site/Sections";

export const Route = createFileRoute("/cloud")({
  head: () => ({
    meta: [
      { title: "Cloud VPS Hosting — HexoraCloud" },
      { name: "description", content: "KVM Cloud VPS with NVMe storage, 10 Gbps uplinks, full root access, and instant deploy." },
    ],
  }),
  component: CloudPage,
});

function CloudPage() {
  return (
    <>
      <Hero
        eyebrow="KVM • NVMe • 10 Gbps"
        title="Cloud VPS that"
        highlight="actually scales."
        subtitle="Full root access, snapshots, private networking, and a panel that doesn't suck. Deploy any Linux distro in seconds."
      />

      <Section>
        <SectionTitle eyebrow="VPS Features" title="Engineered like the big clouds — priced like a startup" />
        <FeatureGrid
          items={[
            { icon: "Server", title: "KVM Virtualization", desc: "True hardware isolation. Your CPU, your RAM, no noisy neighbors." },
            { icon: "HardDrive", title: "Gen4 NVMe", desc: "Up to 7 GB/s I/O. Databases, builds, and games stay snappy." },
            { icon: "Globe", title: "Anycast Network", desc: "Multi-region deploy. Free private VLAN between your VPS." },
            { icon: "Lock", title: "Encrypted Snapshots", desc: "Schedule, restore, and clone in seconds. AES-256 at rest." },
            { icon: "Cpu", title: "Choose your distro", desc: "Ubuntu, Debian, Rocky, AlmaLinux, Arch, FreeBSD, or upload an ISO." },
            { icon: "Gauge", title: "API + Terraform", desc: "Full REST API and Terraform provider for IaC workflows." },
          ]}
        />
      </Section>

      <Section>
        <SectionTitle eyebrow="VPS Plans" title="Pick a size, scale anytime" />
        <div className="grid gap-6 md:grid-cols-4">
          <PlanCard name="Cloud S" price="$5" tagline="Side projects" features={["1 vCPU", "2 GB RAM", "30 GB NVMe", "1 TB transfer"]} />
          <PlanCard name="Cloud M" price="$12" tagline="Production apps" features={["2 vCPU", "4 GB RAM", "80 GB NVMe", "3 TB transfer"]} />
          <PlanCard name="Cloud L" price="$28" popular tagline="Growing teams" features={["4 vCPU", "8 GB RAM", "160 GB NVMe", "6 TB transfer", "Priority I/O"]} />
          <PlanCard name="Cloud XL" price="$58" tagline="Heavy workloads" features={["8 vCPU", "16 GB RAM", "320 GB NVMe", "10 TB transfer", "Dedicated cores"]} />
        </div>
      </Section>
    </>
  );
}
