import { uploadNotionMessage } from "~~/src/notion";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  if (!config.notionSecret || !config.notionDatabaseId)
    throw new Error("Notion not Enabled");

  return useBody(event)
    .then((body) => {
      return uploadNotionMessage(
        body.message,
        body.tags as string[],
        config.notionDatabaseId,
        config.notionSecret
      );
    })
    .then((res) => {
      return { ok: true };
    });
});
