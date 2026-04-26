import type { LinkItemType } from "fumadocs-ui/layouts/shared";

import { createFileRoute } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";

import { LandingPage } from "@/components/landing-page";
import { LatestBlog } from "@/components/latest-blog";
import { MaintainershipRedirection } from "@/components/maintainership-redirection-card";
import { baseOptions } from "@/lib/layout.shared";

const Home = () => {
  const options = baseOptions();
  const mappedLinks: LinkItemType[] =
    options.links?.map((link) => (link.on === "nav" ? { ...link, on: "menu" } : link)) ?? [];

  return (
    <HomeLayout {...options} links={[...(options.links ?? []), ...mappedLinks]}>
      <div className="container mx-auto grid min-h-0 grid-cols-1 gap-4 px-4 py-8">
        <LatestBlog />
        <MaintainershipRedirection />
        <LandingPage />
      </div>
    </HomeLayout>
  );
};
export const Route = createFileRoute("/")({
  component: Home,
});
