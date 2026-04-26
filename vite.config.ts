import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import mdx from "fumadocs-mdx/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    devtools({
      enhancedLogs: {
        enabled: true,
      },
    }),
    mdx(await import("./source.config")),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
      },
    }),
    react(),
    // please see https://tanstack.com/start/latest/docs/framework/react/guide/hosting#nitro for guides on hosting
  ],
  resolve: {
    // alias: {
    //   tslib: "tslib/tslib.es6.js",
    // },
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
});
