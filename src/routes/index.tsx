import { createFileRoute } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { LatestBlog } from "@/components/latest-blog";

const Home = () => (
  <HomeLayout {...baseOptions()}>
    <div className="container mx-auto grid grid-rows-[1fr_1fr] gap-4 h-[calc(100vh-3.5rem)] min-h-0 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-[7fr_3fr] gap-4 min-h-0">
        <LatestBlog />
        <div className="rounded-3xl bg-fd-card border border-fd-border" />
      </div>
      <div className="rounded-3xl bg-fd-card border border-fd-border w-full flex items-center justify-center">
        Download now
      </div>
    </div>
  </HomeLayout>
);

export const Route = createFileRoute("/")({
  component: Home,
});
