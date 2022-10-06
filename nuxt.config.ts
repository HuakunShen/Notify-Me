const lifecycle = process.env.npm_lifecycle_event;

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  css: ["element-plus/dist/index.css"],
  // build: {transpile: ['element-plus']}
  build: {
    transpile:
      lifecycle === "build" || lifecycle === "generate" ? ["element-plus"] : [],
  },
  vite: {
    server: {
      cors: true,
    },
  },
  runtimeConfig: {
    // telegram
    telegramBotToken: process.env.telegramBotToken,
    telegramChatId: process.env.telegramChatId,
    // email
    emailHost: process.env.emailHost,
    emailPort: process.env.emailPort
      ? parseInt(process.env.emailPort)
      : undefined,
    emailFromAddress: process.env.emailFromAddress,
    emailFromPassword: process.env.emailFromPassword,
    emailDefaultToAddress: process.env.emailDefaultToAddress,
    emailFromName: process.env.emailFromName,
    // notion
    notionSecret: process.env.notionSecret,
    notionDatabaseId: process.env.notionDatabaseId,

    password: process.env.password,
    public: {
      enableUI: process.env.enableUI,
      appName: process.env.appName || "Notify Me",
    },
  },
});
