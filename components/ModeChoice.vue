<template>
  <div>
    <div class="form-control" v-for="(mode, idx) in props.modes">
      <label class="label cursor-pointer">
        <span class="label-text">{{ mode }}</span>
        <input
          type="radio"
          name="mode"
          class="radio checked:bg-red-500"
          @click="onClick(mode)"
          :checked="idx === 0"
        />
      </label>
    </div>
  </div>
</template>
<script setup lang="ts">
import {modeChoices} from '~~/src/types';

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  modes: {
    type: Array<modeChoices>,
    default: ["Telegram", "Notion", "Email"],
  },
});
const emit = defineEmits(["update:modelValue"]);
const onClick = (mode: modeChoices) => {
  emit("update:modelValue", mode);
};
onMounted(() => {
  if (props.modes.length > 0) emit("update:modelValue", props.modes[0]);

})
</script>
