<template>
  <div class="px-5">
    <h1 class="text-3xl mb-2">Color Theme</h1>
    <select class="select select-info w-full max-w-xs" @change="chooseTheme">
      <option :selected="theme === curTheme" v-for="theme in themes">
        {{ theme }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
import { themes } from "~~/src/constant";
import { setTheme } from "~~/src/util";

const curTheme = ref("");
onMounted(() => {
  curTheme.value = localStorage.getItem("theme");
});
const chooseTheme = (e) => {
  const theme = e.target.value;
  document.querySelector("html").setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  setTheme(theme);
};
</script>
