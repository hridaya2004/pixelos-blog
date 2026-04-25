import type React from "react";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export const getMDXComponents = (components?: MDXComponents) => ({
  ...defaultMdxComponents,
  img: (props: typeof ImageZoom) => <ImageZoom {...props} />,
  ...components,
});

export const useMDXComponents = getMDXComponents;

// oxlint-disable-next-line typescript/no-explicit-any
export const DocsMDX = ({ MDX }: { MDX: React.ComponentType<{ components: any }> }) => (
  <MDX components={useMDXComponents()} />
);

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
