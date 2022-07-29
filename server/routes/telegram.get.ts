import { sendTelegramMessage } from "~~/src/telegram";
import { composeMessage, queryVarToString } from "~~/src/util";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  if (!config.telegramBotToken || !config.telegramChatId)
    throw new Error("Telegram not Enabled");
  const query = useQuery(event);
  return sendTelegramMessage(
    composeMessage(
      queryVarToString(query.name),
      queryVarToString(query.email),
      queryVarToString(query.message)
    ),
    config.telegramBotToken,
    config.telegramChatId
  ).then((res: { [key: string]: string | boolean | number }) => {
    return { ok: res.ok };
  });
});
