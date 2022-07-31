import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    // telegram
    telegramBotToken: process.env.telegramBotToken,
    telegramChatId: process.env.telegramChatId,
    // email
    emailHost: process.env.emailHost,
    emailPort: process.env.emailPort ? parseInt(process.env.emailPort) : undefined,
    emailFromAddress: process.env.emailFromAddress,
    emailFromPassword: process.env.emailFromPassword,
    emailDefaultToAddress: process.env.emailDefaultToAddress,
    emailFromName: process.env.emailFromName,
    // notion
    notionSecret: process.env.notionSecret,
    notionDatabaseId: process.env.notionDatabaseId,

    password: process.env.password,
    public: {},
  },
});
