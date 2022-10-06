<template>
  <NuxtLayout
    v-if="
      config.public.enableUI === undefined || config.public.enableUI === 'true'
    "
  >
    <NuxtPage />
  </NuxtLayout>
  <div v-else class="h-screen flex justify-center items-center">
    <h1 class="text-9xl">404</h1>
  </div>
</template>
<script setup lang="ts">
import { setTheme } from "~~/src/util";

const config = useRuntimeConfig();

onMounted(() => {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "business");
    setTheme("business");
  } else {
    setTheme(theme);
  }
});

useHead({
  title: "Notify Me",
  meta: [
    {
      name: "description",
      content:
        "A notification app to send message to yourself. It may look useless, but take a second to imagine some use cases.",
    },
  ],
});
</script>
