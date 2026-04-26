import { createFileRoute } from "@tanstack/react-router";
import { ImageResponse } from "takumi-js/response";

import font from "@/assets/font/GoogleSansFlex.ttf?inline";
import { PixelOSLogo } from "@/assets/logo";
import stylesheet from "@/styles/app.css?inline";

export const Route = createFileRoute("/blogs/og")({
  server: {
    handlers: {
      GET() {
        return new ImageResponse(
          <div
            style={{
              fontFamily: "Google Sans Flex",
            }}
            className="relative h-full w-full bg-[#3e5e98] text-white"
          >
            <div className="relative z-20 flex h-full items-center justify-center px-16 text-center">
              <PixelOSLogo className="absolute size-64" fill="rgba(255,255,255,0.5)" />
              <h1 className="text-8xl leading-none tracking-tight">
                <span>pixel</span>
                <span className="font-bold">OS</span>
              </h1>
            </div>
          </div>,
          {
            fonts: [
              {
                data: async () => await fetch(font).then((res) => res.arrayBuffer()),
                name: "Google Sans Flex",
              },
            ],
            height: 630,
            stylesheets: [stylesheet],
            width: 1200,
          },
        );
      },
    },
  },
});
