import { uploadNotionMessage } from "~~/src/notion";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  if (!config.notionSecret || !config.notionDatabaseId)
    throw new Error("Notion not Enabled");
  const query = useQuery(event);
  const message =
    query.message instanceof Array ? query.message[0] : query.message;
  const tags = query.tag instanceof String ? [query.tag] : query.tag;
  return uploadNotionMessage(
    message,
    tags as string[],
    config.notionDatabaseId,
    config.notionSecret
  ).then((res) => {
    return { ok: true };
  });
});
