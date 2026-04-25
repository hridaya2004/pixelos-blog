import { createFileRoute } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";

import { baseOptions } from "@/lib/layout.shared";

const Changelogs = () => (
  <HomeLayout {...baseOptions()}>
    <div className="container mx-auto grid min-h-0 grid-cols-1 gap-4 px-4 py-8" />
  </HomeLayout>
);

export const Route = createFileRoute("/changelogs/")({
  component: Changelogs,
});
