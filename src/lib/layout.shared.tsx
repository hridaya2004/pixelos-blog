import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { PixelOSLogo } from "@/assets/logo";

import { gitConfig } from "./shared";

export const baseOptions = (): BaseLayoutProps => ({
  githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  links: [
    {
      active: "nested-url",
      on: "nav",
      text: "Blogs",
      url: "/blogs/$",
    },
    {
      active: "nested-url",
      on: "nav",
      text: "Changelogs",
      url: "/changelogs",
    },
    {
      active: "nested-url",
      on: "nav",
      text: "For maintainers",
      url: "/docs/maintainers",
    },
    {
      active: "nested-url",
      on: "nav",
      text: "For users",
      url: "/docs/users",
    },
    {
      active: "nested-url",
      on: "nav",
      text: "Donate",
      url: "/donate",
    },
  ],
  nav: {
    // JSX supported
    title: <PixelOSLogo />,
    transparentMode: "top",
  },
});
