import { Image } from "fumadocs-core/framework";
import Link from "fumadocs-core/link";

export const LandingPage = () => (
  <div className="group relative rounded-3xl grayscale-75 transition-all duration-300 hover:grayscale-0">
    <Image
      src="https://raw.githubusercontent.com/PixelOS-CI/blog_assets/refs/heads/main/assets/pixelos_landing.webp"
      alt="PixelOS Landing Page Screenshot"
    />
    <div className="bg-fd-secondary/30 absolute inset-0 flex items-center justify-center rounded-3xl opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
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
