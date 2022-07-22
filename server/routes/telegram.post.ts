import { sendTelegramMessage } from "~~/src/telegram";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  if (!config.telegramBotToken || !config.telegramChatId)
    throw new Error("Telegram not Enabled");
  return useBody(event)
    .then((body) => {
      return sendTelegramMessage(
        body.message,
        config.telegramBotToken,
        config.telegramChatId
      );
    })
    .then((ret: { [key: string]: string | boolean | number }) => {
      return { ok: ret.ok };
    });
});
