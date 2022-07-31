<template>
  <NuxtLayout>
    <div class="px-5 alert-section w-full absolute">
      <msg-alert :msg="msg" />
      <error-alert :msg="error" />
    </div>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { setTheme } from "~~/src/util";
const msg = useMsg();
const error = useErrorMsg();

onMounted(() => {
  const theme = localStorage.getItem("theme");
  console.log(theme);

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
