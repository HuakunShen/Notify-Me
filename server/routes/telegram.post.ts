import { sendTelegramMessage } from "~~/src/telegram";
import { composeMessage } from "~~/src/util";

export default defineEventHandler((event) => {
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
