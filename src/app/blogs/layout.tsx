import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source/blogs";

export default function Layout({ children }: LayoutProps<"/blogs">) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      nav={{
        title: "PixelOS Blogs",
      }}
    >
      {children}
    </DocsLayout>
  );
}
