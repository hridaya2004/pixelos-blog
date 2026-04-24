import { baseOptions } from "@/lib/layout.shared";
import { createFileRoute } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";

const Changelogs = () => (
  <HomeLayout {...baseOptions()}>
    <div className="container px-4 mx-auto grid grid-cols-1 gap-4  min-h-0 py-8" />
  </HomeLayout>
);

export const Route = createFileRoute("/changelogs/")({
  component: Changelogs,
});
