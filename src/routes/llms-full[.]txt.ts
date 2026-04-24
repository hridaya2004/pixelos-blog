import { createFileRoute } from "@tanstack/react-router";
import { blogSource, getLLMText } from "@/lib/source";

export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      GET: async () => {
        const scan = blogSource.getPages().map(getLLMText);
        const scanned = await Promise.all(scan);
        return new Response(scanned.join("\n\n"));
      },
    },
  },
});
