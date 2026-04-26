import { Image } from "fumadocs-core/framework";
import Link from "fumadocs-core/link";

import { useIsMobile } from "@/lib/use-is-mobile";

export const LandingPage = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="relative rounded-3xl transition-all duration-300">
        <Image
          src="https://raw.githubusercontent.com/PixelOS-CI/blog_assets/refs/heads/main/assets/pixelos_landing.webp"
          alt="PixelOS Landing Page Screenshot"
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl">
          <Link
            href="https://pixelos.net"
            rel="noopener noreferrer"
            target="_blank"
            className="bg-fd-primary text-fd-secondary hover:bg-fd-primary/80 rounded-3xl px-3 py-2 font-semibold transition-all duration-300 active:translate-y-0.5"
          >
            Download now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative rounded-3xl transition-all duration-300">
      <Image
        src="https://raw.githubusercontent.com/PixelOS-CI/blog_assets/refs/heads/main/assets/pixelos_landing.webp"
        alt="PixelOS Landing Page Screenshot"
      />
      <div className="bg-fd-secondary/30 absolute inset-0 flex items-center justify-center rounded-3xl opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 md:opacity-100 lg:opacity-0">
        <Link
          href="https://pixelos.net"
          rel="noopener noreferrer"
          target="_blank"
          className="bg-fd-primary text-fd-secondary hover:bg-fd-primary/80 rounded-3xl px-5 py-3 font-semibold transition-all duration-300 active:translate-y-0.5"
        >
          Download now
        </Link>
      </div>
    </div>
  );
};
