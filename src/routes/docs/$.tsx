import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { createServerFn } from "@tanstack/react-start";
import { getDocPageMarkdownUrl, docSource } from "@/lib/source";
import browserCollections from "collections/browser";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { baseOptions } from "@/lib/layout.shared";
import { parseSlugs } from "@/lib/shared";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import { Suspense } from "react";
import { DocsMDX } from "@/components/mdx";
import { PageAuthors } from "@/components/github-contributor";

const clientLoader = browserCollections.docs.createClientLoader({
  component(
    { toc, frontmatter, default: MDX },
    // you can define props for the component
  ) {
    return (
      <DocsPage
        toc={toc}
        footer={{
          className: "[&>a]:rounded-2xl",
          enabled: frontmatter.footer,
        }}
      >
        <DocsTitle className="text-4xl leading-12">{frontmatter.title}</DocsTitle>
        <PageAuthors authors={frontmatter.authors} />
        <DocsDescription>{frontmatter.description}</DocsDescription>
        {frontmatter.toc && (
          <InlineTOC className="rounded-3xl" items={toc}>
            Table of Contents
          </InlineTOC>
        )}
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
    const page = docSource.getPage(slugs);
    if (!page) {
      throw notFound();
    }

    return {
      markdownUrl: getDocPageMarkdownUrl(page).url,
      pageTree: await docSource.serializePageTree(docSource.getPageTree()),
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

export const Route = createFileRoute("/docs/$")({
  component: Page,
  loader: async ({ params }) => {
    const slugs = parseSlugs(params._splat);
    const data = await serverLoader({ data: slugs });
    await clientLoader.preload(data.path);
    return data;
  },
});
