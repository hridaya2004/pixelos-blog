import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  extends: [ultracite],
  sortTailwindcss: {
    functions: ["clsx", "cn", "cva", "tw"],
  },
});
