import { createFileRoute } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { LatestBlog } from "@/components/latest-blog";
import { MaintainershipRedirection } from "@/components/maintainership-redirection-card";

const Home = () => (
  <HomeLayout {...baseOptions()}>
    <div className="container px-4 mx-auto grid grid-cols-1 gap-4  min-h-0 py-8">
      <LatestBlog />
      <MaintainershipRedirection />
      <div className="rounded-3xl bg-fd-card border border-fd-border w-full flex items-center justify-center">
        Download now
      </div>
    </div>
  </HomeLayout>
);

export const Route = createFileRoute("/")({
  component: Home,
});
