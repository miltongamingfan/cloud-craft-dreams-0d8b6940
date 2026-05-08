import { createFileRoute } from "@tanstack/react-router";
import { Hero, Section, SectionTitle, FeatureGrid, PlanCard } from "@/components/site/Sections";

export const Route = createFileRoute("/minecraft")({
  head: () => ({
    meta: [
      { title: "Minecraft Hosting — HexoraCloud" },
      { name: "description", content: "High-performance Minecraft Java & Bedrock hosting with Pterodactyl panel, one-click modpacks, and DDoS protection." },
    ],
  }),
  component: MinecraftPage,
});

function MinecraftPage() {
  return (
    <>
      <Hero
        eyebrow="Java • Bedrock • Modded"
        title="Minecraft hosting"
        highlight="without the lag."
        subtitle="One-click modpacks, instant version switching, free MySQL, sub-tick performance on Ryzen 9. Built for SMPs, networks, and creators."
        primaryHref="/pricing"
        primaryLabel="See Minecraft plans"
      />

      <Section>
        <SectionTitle eyebrow="Features" title="Everything you need to run a thriving server" />
        <FeatureGrid
          items={[
            { icon: "Zap", title: "Pterodactyl Panel", desc: "Modern game panel with subusers, schedules, and SFTP." },
            { icon: "Database", title: "1-Click Modpacks", desc: "1,000+ packs from CurseForge & Modrinth. Forge, Fabric, Paper, Purpur." },
            { icon: "Globe", title: "Free Subdomain", desc: "play.yourname.hexoracloud.com included. Custom domains supported." },
            { icon: "Shield", title: "Anti-DDoS Game", desc: "Layer 7 game-aware mitigation. Botters and crashers blocked at the edge." },
            { icon: "HardDrive", title: "Daily Backups", desc: "Automatic snapshots with one-click restore. Never lose your world." },
            { icon: "Headphones", title: "Migration Help", desc: "Free transfer from your old host. We move your world for you." },
          ]}
        />
      </Section>

      <Section>
        <SectionTitle eyebrow="Plans" title="Pick your block tier" />
        <div className="grid gap-6 md:grid-cols-4">
          <PlanCard name="Dirt" price="$2.50" tagline="Up to 10 players" features={["2 GB RAM", "10 GB NVMe", "Vanilla / Paper", "Free subdomain"]} />
          <PlanCard name="Iron" price="$5" tagline="Up to 25 players" features={["4 GB RAM", "30 GB NVMe", "Modpacks supported", "MySQL database"]} />
          <PlanCard name="Diamond" price="$9" popular tagline="Up to 60 players" features={["6 GB RAM", "60 GB NVMe", "Ryzen 9 cores", "Premium DDoS", "Daily backups"]} />
          <PlanCard name="Netherite" price="$24" tagline="Networks & 200+" features={["16 GB RAM", "200 GB NVMe", "Dedicated cores", "BungeeCord/Velocity", "Hourly backups"]} />
        </div>
      </Section>
    </>
  );
}
