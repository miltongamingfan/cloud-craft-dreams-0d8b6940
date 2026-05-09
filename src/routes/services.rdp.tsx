import { createFileRoute } from "@tanstack/react-router";
import { CategoryPlans } from "@/components/site/CategoryPlans";

export const Route = createFileRoute("/services/rdp")({
  head: () => ({ meta: [
    { title: "Windows RDP Plans — HexoraCloud" },
    { name: "description", content: "Windows RDP servers with dedicated IPs, GPU options, and forex-ready latency." },
  ] }),
  component: () => <CategoryPlans slug="rdp" />,
});
