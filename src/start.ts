import { createMiddleware, createStart } from "@tanstack/react-start";
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { redirect } from "@tanstack/react-router";
import { blogsContentRoute, blogsRoute } from "@/lib/shared";

const { rewrite: rewriteBlogs } = rewritePath(
  `${blogsRoute}{/*path}`,
  `${blogsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteBlogSuffix } = rewritePath(
  `${blogsRoute}{/*path}.mdx`,
  `${blogsContentRoute}{/*path}/content.md`,
);

const llmMiddleware = createMiddleware().server(({ next, request }) => {
  const url = new URL(request.url);
  const path = rewriteBlogSuffix(url.pathname);

  if (path) {
    throw redirect(new URL(path, url));
  }

  if (isMarkdownPreferred(request)) {
    const docsPath = rewriteBlogs(url.pathname);
    if (docsPath) {
      throw redirect(new URL(docsPath, url));
    }
  }

  return next();
});

export const startInstance = createStart(() => ({
  requestMiddleware: [llmMiddleware],
}));
