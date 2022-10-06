export default defineEventHandler((event) => {
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
