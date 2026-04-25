import { blogSource, docSource, donateSource } from "@/lib/source";
import { createFileRoute } from "@tanstack/react-router";
import { createSearchAPI } from "fumadocs-core/search/server";

const server = createSearchAPI("advanced", {
  indexes: () => [
    ...blogSource.getPages().map((page) => ({
      description: page.data.description,
      id: page.url,
      structuredData: page.data.structuredData,
      title: page.data.title,
      url: page.url,
    })),
    ...docSource.getPages().map((page) => ({
      description: page.data.description,
      id: page.url,
      structuredData: page.data.structuredData,
      title: page.data.title,
      url: page.url,
    })),
    ...donateSource.getPages().map((page) => ({
      description: page.data.description,
      id: page.url,
      structuredData: page.data.structuredData,
      title: page.data.title,
      url: page.url,
    })),
  ],
  language: "english",
});

export const Route = createFileRoute("/api/search")({
  server: {
    handlers: {
      GET: async ({ request }) => await server.GET(request),
    },
  },
});
