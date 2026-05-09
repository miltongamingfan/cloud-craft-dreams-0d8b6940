import { createFileRoute } from "@tanstack/react-router";
import { CategoryPlans } from "@/components/site/CategoryPlans";

export const Route = createFileRoute("/services/vps")({
  head: () => ({ meta: [
    { title: "Cloud VPS Plans — HexoraCloud" },
    { name: "description", content: "High-performance KVM Cloud VPS with NVMe storage, full root access, and global locations." },
  ] }),
  component: () => <CategoryPlans slug="vps" />,
});
