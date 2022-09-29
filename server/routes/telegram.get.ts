import { sendTelegramMessage } from "~~/src/telegram";
import { composeMessage, queryVarToString } from "~~/src/util";

export default defineEventHandler((event) => {
  setResponseHeader(event, "Access-Control-Allow-Origin", "*");

  if (!event.context.auth)
    return {
      ok: false,
      error: "Not Authenticated, Please Include Correct Password",
    };
  const config = useRuntimeConfig();
  if (!config.telegramBotToken || !config.telegramChatId)
    throw new Error("Telegram not Enabled");
  const query = useQuery(event);
  return sendTelegramMessage(
    composeMessage(
      query.name as string,
      query.email as string,
      query.message as string
    ),
    config.telegramBotToken,
    config.telegramChatId
  ).then((res: { [key: string]: string | boolean | number }) => {
    return { ok: res.ok };
  });
});
