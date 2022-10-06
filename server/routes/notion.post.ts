import { uploadNotionMessage } from "~~/src/notion";

export default defineEventHandler((event) => {
  if (!event.context.auth)
    return {
      ok: false,
      error: "Not Authenticated, Please Include Correct Password",
    };
  const config = useRuntimeConfig();
  if (!config.notionSecret || !config.notionDatabaseId)
    throw new Error("Notion not Enabled");
  const ip = JSON.stringify(
    event.req.headers["x-forwarded-for"] || event.req.socket.remoteAddress
  );
  const body = event.context.body;
  return uploadNotionMessage(
    body.message || "",
    (body.tags || []) as string[],
    body.name || "",
    body.email || "",
    config.notionDatabaseId,
    config.notionSecret,
    ip
  ).then((res) => {
    return { ok: true };
  });
});
