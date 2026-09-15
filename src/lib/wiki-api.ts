import { createServerFn } from "@tanstack/react-start";
import { fetchWikiSummary, type WikiSummary } from "./live-data";

export const getWikiSummary = createServerFn({ method: "POST" })
  .validator((input: { title: string }) => input)
  .handler(async ({ data }): Promise<WikiSummary | null> => {
    try {
      return await fetchWikiSummary(data.title);
    } catch {
      return null;
    }
  });
