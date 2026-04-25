import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { createServerFn } from "@tanstack/react-start";
import { getDocPageMarkdownUrl, docSource } from "@/lib/source";
import browserCollections from "collections/browser";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { baseOptions } from "@/lib/layout.shared";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import { Suspense } from "react";
import { useMDXComponents } from "@/components/mdx";
import { GithubContributors } from "@/components/github-contributor";

// oxlint-disable-next-line typescript/no-explicit-any
const DocsMDX = ({ MDX }: { MDX: React.ComponentType<{ components: any }> }) => (
  <MDX components={useMDXComponents()} />
);

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
        {frontmatter.authors && (
          <div className="inline-flex items-center gap-2">
            {frontmatter.authors.length > 1 ? <span>Authors: </span> : <span>Author: </span>}
            <GithubContributors users={frontmatter.authors} />
          </div>
        )}
        <DocsDescription>{frontmatter.description}</DocsDescription>
        {frontmatter.toc && (
          <InlineTOC className="rounded-3xl" items={toc}>
            Table of Contents
          </InlineTOC>
        )}
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
    const slugs = params._splat?.split("/") ?? [];
    const data = await serverLoader({ data: slugs });
    await clientLoader.preload(data.path);
    return data;
  },
});
