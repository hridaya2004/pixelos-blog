import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";

import {
  blogsContentRoute,
  blogsRoute,
  docsContentRoute,
  docsRoute,
  donateContentRoute,
  donateRoute,
} from "@/lib/shared";

interface RouteRewrites {
  markdown: ReturnType<typeof rewritePath>["rewrite"];
  suffix: ReturnType<typeof rewritePath>["rewrite"];
}

const createRouteRewrites = (route: string, contentRoute: string): RouteRewrites => ({
  markdown: rewritePath(`${route}{/*path}`, `${contentRoute}{/*path}/content.md`).rewrite,
  suffix: rewritePath(`${route}{/*path}.mdx`, `${contentRoute}{/*path}/content.md`).rewrite,
});

const createLlmMiddleware = (rewrites: RouteRewrites) =>
  createMiddleware().server(({ next, request }) => {
    const url = new URL(request.url);
    const path = rewrites.suffix(url.pathname);
    if (path) {
      throw redirect(new URL(path, url));
    }
    if (isMarkdownPreferred(request)) {
      const docsPath = rewrites.markdown(url.pathname);
      if (docsPath) {
        throw redirect(new URL(docsPath, url));
      }
    }
    return next();
  });

export const startInstance = createStart(() => ({
  requestMiddleware: [
    createLlmMiddleware(createRouteRewrites(blogsRoute, blogsContentRoute)),
    createLlmMiddleware(createRouteRewrites(docsRoute, docsContentRoute)),
    createLlmMiddleware(createRouteRewrites(donateRoute, donateContentRoute)),
  ],
}));
