import { createFileRoute } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { LatestBlog } from "@/components/latest-blog";
import { MaintainershipRedirection } from "@/components/maintainership-redirection-card";
import { LandingPage } from "@/components/landing-page";

const Home = () => (
  <HomeLayout {...baseOptions()}>
    <div className="container px-4 mx-auto grid grid-cols-1 gap-4  min-h-0 py-8">
      <LatestBlog />
      <MaintainershipRedirection />
      <LandingPage />
    </div>
  </HomeLayout>
);

export const Route = createFileRoute("/")({
  component: Home,
});
