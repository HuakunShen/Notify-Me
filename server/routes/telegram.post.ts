import { sendTelegramMessage } from "~~/src/telegram";
import { composeMessage } from "~~/src/util";

export default defineEventHandler((event) => {
  setResponseHeader(event, "Access-Control-Allow-Origin", "*");
  setResponseHeader(event, "Access-Control-Allow-Methods", "*");
  setResponseHeader(event, "Access-Control-Allow-Headers", "*");
  setResponseHeader(event, "Access-Control-Max-Age", "2592000");


  if (!event.context.auth)
    return {
      ok: false,
      error: "Not Authenticated, Please Include Correct Password",
    };
  const config = useRuntimeConfig();
  if (!config.telegramBotToken || !config.telegramChatId)
    throw new Error("Telegram not Enabled");
  return useBody(event)
    .then((body) => {
      return sendTelegramMessage(
        composeMessage(body.name, body.email, body.message || "no message"),
        config.telegramBotToken,
        config.telegramChatId
      );
    })
    .then((ret: { [key: string]: string | boolean | number }) => {
      return { ok: ret.ok };
    });
});
