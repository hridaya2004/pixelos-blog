import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { createServerFn } from "@tanstack/react-start";
import { getBlogPageMarkdownUrl, blogSource } from "@/lib/source";
import browserCollections from "collections/browser";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { baseOptions } from "@/lib/layout.shared";
import { parseSlugs } from "@/lib/shared";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import { Suspense } from "react";
import { DocsMDX } from "@/components/mdx";
import { PageAuthors } from "@/components/github-contributor";

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
        <DocsBody className="border border-fd-accent shadow-2xs shadow-fd-accent rounded-3xl p-6">
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
