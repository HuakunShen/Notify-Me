import { sendTelegramMessage } from "~~/src/telegram";
import { composeMessage } from "~~/src/util";

export default defineEventHandler((event) => {
  if (!event.context.auth)
    return {
      ok: false,
      error: "Not Authenticated, Please Include Correct Password",
    };
  const config = useRuntimeConfig();
  if (!config.telegramBotToken || !config.telegramChatId)
    throw new Error("Telegram not Enabled");
  const body = event.context.body;
  return sendTelegramMessage(
    composeMessage(body.name, body.email, body.message || "no message"),
    config.telegramBotToken,
    config.telegramChatId
  ).then((ret: any) => {
    return { ok: ret.ok };
  });
});
