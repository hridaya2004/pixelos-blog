import type { InferPageType } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";
import { blogs, docs, donate } from "collections/server";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import {
  blogsRoute,
  blogsContentRoute,
  docsRoute,
  donateRoute,
  docsContentRoute,
  donateContentRoute,
} from "./shared";

export const blogSource = loader({
  baseUrl: blogsRoute,
  plugins: [lucideIconsPlugin()],
  source: blogs.toFumadocsSource(),
});

export const docSource = loader({
  baseUrl: docsRoute,
  plugins: [lucideIconsPlugin()],
  source: docs.toFumadocsSource(),
});

export const donateSource = loader({
  baseUrl: donateRoute,
  plugins: [lucideIconsPlugin()],
  source: donate.toFumadocsSource(),
});

export const getBlogPageMarkdownUrl = (page: InferPageType<typeof blogSource>) => {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url: `${blogsContentRoute}/${segments.join("/")}`,
  };
};

export const getDocPageMarkdownUrl = (page: InferPageType<typeof docSource>) => {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join("/")}`,
  };
};

export const getDonateMarkdownUrl = (page: InferPageType<typeof donateSource>) => {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url: `${donateContentRoute}/${segments.join("/")}`,
  };
};

export const getLLMText = async (page: InferPageType<typeof blogSource>) => {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
};
