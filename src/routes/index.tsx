import { createFileRoute } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { LatestBlog } from "@/components/latest-blog";
import { MaintainershipRedirection } from "@/components/maintainership-redirection-card";
import { LandingPage } from "@/components/landing-page";

const Home = () => (
  <HomeLayout {...baseOptions()}>
    <div className="container mx-auto grid min-h-0 grid-cols-1 gap-4 px-4 py-8">
      <LatestBlog />
      <MaintainershipRedirection />
      <LandingPage />
    </div>
  </HomeLayout>
);

export const Route = createFileRoute("/")({
  component: Home,
});
