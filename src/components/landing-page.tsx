import { Image } from "fumadocs-core/framework";
import Link from "fumadocs-core/link";

export const LandingPage = () => (
  <div className="relative rounded-3xl grayscale-75 hover:grayscale-0 transition-all duration-300 group">
    <Image
      src="https://raw.githubusercontent.com/PixelOS-CI/blog_assets/refs/heads/main/assets/pixelos_landing.webp"
      alt="PixelOS Landing Page Screenshot"
    />
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm bg-fd-secondary/30 rounded-3xl">
      <Link
        href="https://pixelos.net"
        rel="noopener noreferrer"
        target="_blank"
        className="bg-fd-primary text-fd-secondary px-5 py-3 font-semibold hover:bg-fd-primary/80 transition-all duration-300 rounded-3xl active:translate-y-0.5"
      >
        Download now
      </Link>
    </div>
  </div>
);
