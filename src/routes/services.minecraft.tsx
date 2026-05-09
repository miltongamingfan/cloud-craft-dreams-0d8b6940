import { createFileRoute } from "@tanstack/react-router";
import { CategoryPlans } from "@/components/site/CategoryPlans";

export const Route = createFileRoute("/services/minecraft")({
  head: () => ({ meta: [
    { title: "Minecraft Server Plans — HexoraCloud" },
    { name: "description", content: "Premium Minecraft hosting for Java, Bedrock, modpacks, and large networks." },
  ] }),
  component: () => <CategoryPlans slug="minecraft" />,
});
