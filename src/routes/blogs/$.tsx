import { Suspense } from "react";

import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import browserCollections from "collections/browser";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";

import { PageAuthors } from "@/components/github-contributor";
import { DocsMDX } from "@/components/mdx";
import { baseOptions } from "@/lib/layout.shared";
import { parseSlugs } from "@/lib/shared";
import { getBlogPageMarkdownUrl, blogSource } from "@/lib/source";

const clientLoader = browserCollections.blogs.createClientLoader({
  component(
    { toc, frontmatter, default: MDX },
    // you can define props for the component
  ) {
    return (
      <DocsPage
        toc={toc}
        footer={{
          className: "[&>a]:rounded-2xl",
        }}
      >
        <DocsTitle className="text-4xl leading-12">{frontmatter.title}</DocsTitle>
        <PageAuthors authors={frontmatter.authors} />
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <InlineTOC className="rounded-3xl" items={toc}>
          Table of Contents
        </InlineTOC>
        <DocsBody className="border-fd-accent shadow-fd-accent rounded-3xl border p-6 shadow-2xs">
          <DocsMDX MDX={MDX} />
        </DocsBody>
      </DocsPage>
    );
  },
});

const serverLoader = createServerFn({
  method: "GET",
})
  .inputValidator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = blogSource.getPage(slugs);
    if (!page) {
      throw notFound();
    }

    return {
      markdownUrl: getBlogPageMarkdownUrl(page).url,
      pageTree: await blogSource.serializePageTree(blogSource.getPageTree()),
      path: page.path,
    };
  });

const Page = () => {
  // oxlint-disable-next-line no-use-before-define
  const { path, pageTree } = useFumadocsLoader(Route.useLoaderData());

  return (
    <DocsLayout {...baseOptions()} tree={pageTree}>
      <Suspense>{clientLoader.useContent(path)}</Suspense>
    </DocsLayout>
  );
};

export const Route = createFileRoute("/blogs/$")({
  component: Page,
  loader: async ({ params }) => {
    const slugs = parseSlugs(params._splat);
    const data = await serverLoader({ data: slugs });
    await clientLoader.preload(data.path);
    return data;
  },
});
