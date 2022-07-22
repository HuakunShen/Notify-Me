import { sendTelegramMessage } from "~~/src/telegram";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  if (!config.telegramBotToken || !config.telegramChatId)
    throw new Error("Telegram not Enabled");
  const query = useQuery(event);
  return sendTelegramMessage(
    query.message as string,
    config.telegramBotToken,
    config.telegramChatId
  ).then((res: { [key: string]: string | boolean | number }) => {
    return { ok: res.ok };
  });
});
