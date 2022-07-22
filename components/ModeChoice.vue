<template>
  <div>
    <div class="form-control" v-for="mode in modes">
      <label class="label cursor-pointer">
        <span class="label-text">{{ mode }}</span>
        <input
          type="radio"
          name="mode"
          class="radio checked:bg-red-500"
          @click="onClick(mode)"
        />
      </label>
    </div>
  </div>
</template>
<script setup lang="ts">
type modeChoices = "Telegram" | "Notion" | "Email";
const modes: modeChoices[] = ["Telegram", "Notion", "Email"];
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);
const onClick = (mode: modeChoices) => {
  emit("update:modelValue", mode);
};
</script>
