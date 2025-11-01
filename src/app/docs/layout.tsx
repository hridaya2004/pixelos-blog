import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source/docs";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      {...baseOptions()}
      nav={{
        title: "PixelOS Docs",
      }}
      tree={source.pageTree}
    >
      {children}
    </DocsLayout>
  );
}
