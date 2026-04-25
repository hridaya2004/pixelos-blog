import { blogSource, docSource, donateSource } from "@/lib/source";
import { createFileRoute } from "@tanstack/react-router";
import type { StructuredData } from "fumadocs-core/mdx-plugins";
import { createSearchAPI } from "fumadocs-core/search/server";

interface IndexablePage {
  url: string;
  data: {
    description?: string;
    structuredData: StructuredData;
    title: string;
  };
}

interface IndexableSource<T extends IndexablePage> {
  getPages: () => T[];
}

const indexMap = <T extends IndexablePage>(sources: IndexableSource<T>[]) =>
  sources.flatMap((source) =>
    source.getPages().map((page) => ({
      description: page.data.description,
      id: page.url,
      structuredData: page.data.structuredData,
      title: page.data.title,
      url: page.url,
    })),
  );

const server = createSearchAPI("advanced", {
  indexes: () => indexMap([blogSource, docSource, donateSource]),
  language: "english",
});

export const Route = createFileRoute("/api/search")({
  server: {
    handlers: {
      GET: async ({ request }) => await server.GET(request),
    },
  },
});
