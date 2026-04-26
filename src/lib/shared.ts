export const appName = "PixelOS";

export const blogsRoute = "/blogs";
export const blogsImageRoute = "/og/blogs";
export const blogsContentRoute = "/llms.mdx/blogs";

export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";

export const donateRoute = "/donate";
export const donateImageRoute = "/og/donate";
export const donateContentRoute = "/llms.mdx/donate";

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  branch: "main",
  repo: "blog",
  user: "PixelOS-AOSP",
};

export const parseSlugs = (splat: string | undefined): string[] => splat?.split("/") ?? [];
