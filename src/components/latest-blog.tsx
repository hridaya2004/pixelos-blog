import { Link } from "@tanstack/react-router";
import { Image } from "fumadocs-core/framework";

export const LatestBlog = () => (
  <div className="group relative w-full h-full min-h-0 rounded-3xl overflow-clip shadow-xl isolate ring-1 ring-inset ring-white/10 [transform:translateZ(0)]">
    <Image
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-400 ease-out group-hover:scale-105"
      alt="Latest blog"
      src="https://github.com/PixelOS-CI/blog_assets/blob/main/banner.png?raw=True"
    />

    <div className="absolute inset-0 bg-linear-to-t from-fd-foreground/60 via-fd-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none z-0" />

    <div className="absolute inset-0 flex items-end p-6 z-10 text-fd-foreground">
      <div className="flex items-center justify-between w-full px-4 opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
        <div className="flex flex-col gap-2 drop-shadow-md">
          <h2 className="text-3xl font-bold">Checkout latest blog from here</h2>
          <p className="text-xl font-medium text-fd-foreground/80">
            Find changelogs and guidelines for recent releases.
          </p>
        </div>

        <Link
          className="text-fd-foreground bg-fd-background/20 hover:bg-fd-background/40 hover:shadow-xl backdrop-blur-md transition-all duration-300 font-semibold px-8 py-3.5 rounded-full hover:-translate-y-0.5 active:scale-95"
          to="/docs/$"
          params={{ _splat: "" }}
        >
          Redirect
        </Link>
      </div>
    </div>
  </div>
);
