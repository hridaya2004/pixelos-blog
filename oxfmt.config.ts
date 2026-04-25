import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  extends: [ultracite],
  sortImports: {
    customGroups: [
      {
        elementNamePattern: ["react", "react-**"],
        groupName: "react",
      },
    ],
    groups: [
      "react",
      "type-import",
      ["value-builtin", "value-external"],
      "type-internal",
      "value-internal",
      ["type-parent", "type-sibling", "type-index"],
      ["value-parent", "value-sibling", "value-index"],
      "unknown",
    ],
  },
  sortTailwindcss: {
    functions: ["clsx", "cn", "cva", "tw"],
  },
});
