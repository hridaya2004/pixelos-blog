import { defineConfig, defineDocs, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";

export const blogs = defineDocs({
  dir: "content/blogs",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
    schema: frontmatterSchema.safeExtend({
      authors: z.string().array().optional(),
    }),
  },
});

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
    schema: frontmatterSchema.safeExtend({
      authors: z.string().array().optional(),
      footer: z.boolean().optional().default(true),
      toc: z.boolean().optional().default(true),
    }),
  },
});

export const donate = defineDocs({
  dir: "content/donate",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig();
