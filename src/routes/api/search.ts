import { blogSource } from "@/lib/source";
import { createFileRoute } from "@tanstack/react-router";
import { createFromSource } from "fumadocs-core/search/server";

const server = createFromSource(blogSource, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: "english",
});

export const Route = createFileRoute("/api/search")({
  server: {
    handlers: {
      GET: async ({ request }) => await server.GET(request),
    },
  },
});
