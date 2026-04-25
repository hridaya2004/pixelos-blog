import type { InferPageType } from "fumadocs-core/source";

import { blogs, docs, donate } from "collections/server";
import { loader } from "fumadocs-core/source";
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

export type BlogPage = InferPageType<typeof blogSource>;
export type DocPage = InferPageType<typeof docSource>;
export type DonatePage = InferPageType<typeof donateSource>;

const makeMarkdownUrlGetter =
  (contentRoute: string) =>
  <T extends { slugs: string[] }>(page: T) => {
    const segments = [...page.slugs, "content.md"];
    return { segments, url: `${contentRoute}/${segments.join("/")}` };
  };

export const getBlogPageMarkdownUrl = makeMarkdownUrlGetter(blogsContentRoute);
export const getDocPageMarkdownUrl = makeMarkdownUrlGetter(docsContentRoute);
export const getDonateMarkdownUrl = makeMarkdownUrlGetter(donateContentRoute);

export const getLLMText = async (page: InferPageType<typeof blogSource>) => {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
};
