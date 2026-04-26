import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";

import { PixelOSLogo } from "@/assets/logo";
import { Telegram } from "@/assets/telegram";
import { XformerlyTwitter } from "@/assets/twitter";

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
    {
      external: true,
      icon: <Telegram />,
      on: "nav",
      text: "Telegram",
      type: "icon",
      url: "https://t.me/PixelOSOfficial",
    },
    {
      external: true,
      icon: <XformerlyTwitter />,
      on: "nav",
      text: "X",
      type: "icon",
      url: "https://x.com/PixelOSROM",
    },
  ],
  nav: {
    // JSX supported
    title: <PixelOSLogo />,
    transparentMode: "top",
  },
});

export const linkItems = baseOptions().links;

export const menuMappedLinkItems: LinkItemType[] =
  linkItems?.map((link) => (link.on === "nav" ? { ...link, on: "menu" } : link)) ?? [];
