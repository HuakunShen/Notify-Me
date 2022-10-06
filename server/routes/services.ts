export default defineEventHandler((event) => {
  setResponseHeader(event, "Access-Control-Allow-Origin", "*");
  setResponseHeader(event, "Access-Control-Allow-Methods", "*");
  setResponseHeader(event, "Access-Control-Allow-Headers", "*");

  const config = useRuntimeConfig();
  return {
    telegram: Boolean(config.telegramBotToken && config.telegramChatId),
    email: Boolean(
      config.emailHost &&
        config.emailPort &&
        config.emailFromAddress &&
        config.emailFromPassword &&
        config.emailDefaultToAddress &&
        config.emailFromName
    ),
    notion: Boolean(config.notionSecret && config.notionDatabaseId),
    password: Boolean(Boolean(config.password)),
  };
});
