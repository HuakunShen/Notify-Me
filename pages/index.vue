<template>
  <div>
    <h1>Index page</h1>
    <div>{{ config.apiSecret }}</div>
    <div>{{ config.telegramBotToken }}</div>
  </div>
</template>
<script setup lang="ts">
const config = useRuntimeConfig();
</script>
