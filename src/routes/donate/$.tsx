import { useMDXComponents } from "@/components/mdx";
import { baseOptions } from "@/lib/layout.shared";
import { donateSource, getDonateMarkdownUrl } from "@/lib/source";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import browserCollections from "collections/browser";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import type { ImageZoomProps } from "fumadocs-ui/components/image-zoom";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { DocsBody } from "fumadocs-ui/layouts/docs/page";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Suspense } from "react";

// oxlint-disable-next-line typescript/no-explicit-any
const PageMDX = ({ MDX }: { MDX: React.ComponentType<{ components: any }> }) => (
  // oxlint-disable-next-line react/jsx-pascal-case
  <MDX
    components={useMDXComponents({
      img: (props: ImageZoomProps) => <ImageZoom className="w-25 rounded-none!" {...props} />,
      table: ({ children, ...props }) => (
        <div className="relative overflow-auto prose-no-margin my-6">
          <table className="w-auto" {...props}>
            {children}
          </table>
        </div>
      ),
    })}
  />
);

const clientLoader = browserCollections.donate.createClientLoader({
  component(
    { default: MDX },
    // you can define props for the component
  ) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <DocsBody>
          <PageMDX MDX={MDX} />
        </DocsBody>
      </div>
    );
  },
});

const serverLoader = createServerFn({
  method: "GET",
})
  .inputValidator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = donateSource.getPage(slugs);
    if (!page) {
      throw notFound();
    }

    return {
      markdownUrl: getDonateMarkdownUrl(page).url,
      pageTree: await donateSource.serializePageTree(donateSource.getPageTree()),
      path: page.path,
    };
  });

const Donate = () => {
  // oxlint-disable-next-line no-use-before-define
  const { path } = useFumadocsLoader(Route.useLoaderData());

  return (
    <HomeLayout {...baseOptions()}>
      <Suspense>{clientLoader.useContent(path)}</Suspense>
    </HomeLayout>
  );
};
export const Route = createFileRoute("/donate/$")({
  component: Donate,
  loader: async ({ params }) => {
    const slugs = params._splat?.split("/") ?? [];
    const data = await serverLoader({ data: slugs });
    await clientLoader.preload(data.path);
    return data;
  },
});
