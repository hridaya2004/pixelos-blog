import { createMiddleware, createStart } from "@tanstack/react-start";
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { redirect } from "@tanstack/react-router";
import {
  blogsContentRoute,
  blogsRoute,
  docsContentRoute,
  docsRoute,
  donateContentRoute,
  donateRoute,
} from "@/lib/shared";

const { rewrite: rewriteBlogs } = rewritePath(
  `${blogsRoute}{/*path}`,
  `${blogsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteBlogsSuffix } = rewritePath(
  `${blogsRoute}{/*path}.mdx`,
  `${blogsContentRoute}{/*path}/content.md`,
);

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteDocsSuffix } = rewritePath(
  `${docsRoute}{/*path}.mdx`,
  `${docsContentRoute}{/*path}/content.md`,
);

const { rewrite: rewriteDonate } = rewritePath(
  `${donateRoute}{/*path}`,
  `${donateContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteDonateSuffix } = rewritePath(
  `${donateRoute}{/*path}.mdx`,
  `${donateContentRoute}{/*path}/content.md`,
);

const llmBlogsMiddleware = createMiddleware().server(({ next, request }) => {
  const url = new URL(request.url);
  const path = rewriteBlogsSuffix(url.pathname);

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

const llmDocsMiddleware = createMiddleware().server(({ next, request }) => {
  const url = new URL(request.url);
  const path = rewriteDocsSuffix(url.pathname);

  if (path) {
    throw redirect(new URL(path, url));
  }

  if (isMarkdownPreferred(request)) {
    const docsPath = rewriteDocs(url.pathname);
    if (docsPath) {
      throw redirect(new URL(docsPath, url));
    }
  }

  return next();
});

const llmDonateMiddleware = createMiddleware().server(({ next, request }) => {
  const url = new URL(request.url);
  const path = rewriteDonateSuffix(url.pathname);

  if (path) {
    throw redirect(new URL(path, url));
  }

  if (isMarkdownPreferred(request)) {
    const docsPath = rewriteDonate(url.pathname);
    if (docsPath) {
      throw redirect(new URL(docsPath, url));
    }
  }

  return next();
});

export const startInstance = createStart(() => ({
  requestMiddleware: [llmBlogsMiddleware, llmDocsMiddleware, llmDonateMiddleware],
}));
