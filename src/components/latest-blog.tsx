import { cn } from "@/lib/cn";
import { useIsMobile } from "@/lib/use-is-mobile";
import { Link } from "@tanstack/react-router";
import { Image } from "fumadocs-core/framework";

export const LatestBlog = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Link
        to="/blogs/$"
        className="relative overflow-hidden rounded-3xl aspect-video bg-fd-card border border-fd-border"
      >
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          alt="Latest blog"
          src="https://raw.githubusercontent.com/PixelOS-CI/blog_assets/refs/heads/main/banner.webp"
          loading="eager"
        />

        <div className="absolute left-1/2 top-[70%] -translate-x-1/2 z-20 w-full">
          <h2 className="text-white font-bold text-lg leading-snug drop-shadow text-center">
            Latest releases and blogs
          </h2>
        </div>
      </Link>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl group aspect-video bg-fd-card border border-fd-border">
      <Image
        className="absolute inset-0 w-full h-full object-cover"
        alt="Latest blog"
        src="https://raw.githubusercontent.com/PixelOS-CI/blog_assets/refs/heads/main/banner.webp"
        loading="eager"
      />

      <div className="absolute inset-0 z-10 backdrop-blur-md bg-white/10 opacity-0 rounded-3xl group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-between items-end px-6 py-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div>
          <h2 className="text-white font-semibold text-2xl leading-snug drop-shadow">
            Latest releases and blogs
          </h2>
          <p className="text-white/80 text-lg drop-shadow">
            Find latest PixelOS releases and documentation here.
          </p>
        </div>

        <Link
          to="/blogs/$"
          params={{ _splat: "" }}
          className={cn(
            "px-4 py-2 rounded-3xl",
            "bg-fd-background/30 text-white font-medium",
            "transition backdrop-blur-sm",
          )}
        >
          Redirect
        </Link>
      </div>
    </div>
  );
};
