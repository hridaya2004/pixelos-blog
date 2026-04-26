import { use, useMemo, Suspense } from "react";

import { createCompiler } from "@fumadocs/mdx-remote";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { HomeLayout } from "fumadocs-ui/layouts/home";

import { DocsMDX } from "@/components/mdx";
import { baseOptions, linkItems, menuMappedLinkItems } from "@/lib/layout.shared";

const CHANGELOG_URL =
  "https://raw.githubusercontent.com/PixelOS-AOSP/changelogs_generator/refs/heads/main/changelogs.mdx";

const compiler = createCompiler();

interface Frontmatter {
  title?: string;
  description?: string;
  [key: string]: string | number | boolean | null | undefined;
}

interface LoaderData {
  source: string;
  frontmatter: Frontmatter;
}

const fetchChangelogs = createServerFn({ method: "GET" }).handler(async (): Promise<LoaderData> => {
  const res = await fetch(CHANGELOG_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch changelogs: ${res.status}`);
  }
  const source = await res.text();
  const compiled = await compiler.compile({ source });
  return {
    frontmatter: compiled.frontmatter as Frontmatter,
    source,
  };
});

const MDXContent = ({ source }: { source: string }) => {
  const compiled = use(useMemo(() => compiler.compile({ source }), [source]));
  return <DocsMDX MDX={compiled.body} />;
};

const Changelogs = () => {
  // oxlint-disable-next-line no-use-before-define
  const { source, frontmatter } = Route.useLoaderData() as LoaderData;

  return (
    <HomeLayout {...baseOptions()} links={[...(linkItems ?? []), ...menuMappedLinkItems]}>
      <DocsLayout
        tree={{ children: [], name: "Changelogs" }}
        nav={{
          enabled: false,
        }}
        sidebar={{ enabled: false }}
      >
        <DocsPage footer={{ enabled: false }}>
          <DocsTitle className="text-4xl leading-12">{frontmatter.title}</DocsTitle>
          <DocsDescription>{frontmatter.description}</DocsDescription>
          <DocsBody className={`[&_p_a[href^="https://"]]:commit-hash px-2`}>
            <Suspense fallback={<div>Loading...</div>}>
              <MDXContent source={source} />
            </Suspense>
          </DocsBody>
        </DocsPage>
      </DocsLayout>
    </HomeLayout>
  );
};

export const Route = createFileRoute("/changelogs/")({
  component: Changelogs,
  loader: () => fetchChangelogs(),
});
