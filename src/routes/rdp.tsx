import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/rdp")({
  beforeLoad: () => { throw redirect({ to: "/category/$slug", params: { slug: "rdp" } }); },
});
