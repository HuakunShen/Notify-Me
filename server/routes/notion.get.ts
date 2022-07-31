import { uploadNotionMessage } from "~~/src/notion";
import { composeMessage, queryVarToString } from "~~/src/util";

export default defineEventHandler((event) => {
  if (!event.context.auth)
    return {
      ok: false,
      error: "Not Authenticated, Please Include Correct Password",
    };
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
    query.message as string,
    tags as string[],
    query.name as string,
    query.email as string,
    config.notionDatabaseId,
    config.notionSecret
  ).then((res) => {
    return { ok: true };
  });
});
