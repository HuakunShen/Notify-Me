import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    // telegram
    telegramBotToken: "5339185966:AAE46f1_Kv1d0bjji08mi8jrCcTat1RmHjE",
    telegramChatId: "1963357333",
    // email
    emailHost: "mail.privateemail.com",
    emailPort: 587,
    emailFromAddress: "noreply@crosscopy.io",
    emailFromPassword: "crosscopy-9559",
    emailDefaultToAddress: "huakun.shen@gmail.com",
    emailFromName: "Huakun 💻 Notification System",
    // notion
    notionSecret: "secret_VqrNI1P2e5lQhMiDs7ge435ux5uArNxCK9VNZF6sqth",
    notionDatabaseId: "fffc10fbe57d491db4cab2a693fe8f30",

    public: {},
  },
});
