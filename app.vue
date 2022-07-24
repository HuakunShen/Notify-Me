<template>
  <NuxtLayout>
    <div class="px-5 alert-section">
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
    localStorage.setItem("theme", "dark");
    setTheme("dark");
  } else {
    setTheme(theme);
  }
});
</script>
