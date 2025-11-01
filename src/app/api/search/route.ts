import { createFromSource } from "fumadocs-core/search/server";
import { source as blogSource } from "@/lib/source/blogs";
import { source as docSource } from "@/lib/source/docs";

export const { GET } = createFromSource(docSource && blogSource, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: "english",
});
