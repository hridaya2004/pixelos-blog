import { Link } from "@tanstack/react-router";
import { Image } from "fumadocs-core/framework";

import { cn } from "@/lib/cn";
import { useIsMobile } from "@/lib/use-is-mobile";

export const LatestBlog = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Link
        to="/blogs/$"
        className="bg-fd-card border-fd-border relative aspect-video overflow-hidden rounded-3xl border"
      >
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          alt="Latest blog"
          src="https://raw.githubusercontent.com/PixelOS-CI/blog_assets/refs/heads/main/banner.webp"
          loading="eager"
        />

        <div className="absolute top-[70%] left-1/2 z-20 w-full -translate-x-1/2">
          <h2 className="text-center text-lg leading-snug font-bold text-white drop-shadow">
            Latest releases and blogs
          </h2>
        </div>
      </Link>
    );
  }

  return (
    <div className="group bg-fd-card border-fd-border relative aspect-video overflow-hidden rounded-3xl border">
      <Image
        className="absolute inset-0 h-full w-full object-cover"
        alt="Latest blog"
        src="https://raw.githubusercontent.com/PixelOS-CI/blog_assets/refs/heads/main/banner.webp"
        loading="eager"
      />

      <div className="absolute inset-0 z-10 rounded-3xl bg-white/10 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute right-0 bottom-0 left-0 z-20 flex items-end justify-between px-6 py-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div>
          <h2 className="text-2xl leading-snug font-semibold text-white drop-shadow">
            Latest releases and blogs
          </h2>
          <p className="text-lg text-white/80 drop-shadow">
            Find latest PixelOS releases and documentation here.
          </p>
        </div>

        <Link
          to="/blogs/$"
          params={{ _splat: "" }}
          className={cn(
            "rounded-3xl px-4 py-2",
            "bg-fd-background/30 font-medium text-white",
            "backdrop-blur-sm transition",
          )}
        >
          Redirect
        </Link>
      </div>
    </div>
  );
};
