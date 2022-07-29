import { uploadNotionMessage } from "~~/src/notion";
import { composeMessage, queryVarToString } from "~~/src/util";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  if (!config.notionSecret || !config.notionDatabaseId)
    throw new Error("Notion not Enabled");
  const query = useQuery(event);
  const message =
    query.message instanceof Array ? query.message[0] : query.message;
  const tags = query.tag
    ? query.tag instanceof Array
      ? query.tag
      : [query.tag]
    : [];

  return uploadNotionMessage(
    queryVarToString(query.message),
    tags as string[],
    queryVarToString(query.name),
    queryVarToString(query.email),
    config.notionDatabaseId,
    config.notionSecret
  ).then((res) => {
    return { ok: true };
  });
});
