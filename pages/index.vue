<template>
  <div class="px-10 mx-auto 2xl:w-1/2 xl:w-2/3">
    <div class="">
      <h1 class="text-3xl mb-2">Send Message</h1>
      <div class="grid grid-cols-3 gap-4">
        <mode-choice class="col-span-1" v-model="mode" />
        <textarea
          class="textarea textarea-info w-full col-span-2"
          v-model="messageContent"
        ></textarea>
      </div>
      <button class="btn btn-info mt-2" @click="sendMessage">Send</button>
      <div class="response-section mt-5">
        <h1 class="text-3xl mb-2">Response</h1>
        <textarea class="textarea textarea-info w-full" disabled rows="10">{{
          responseText
        }}</textarea>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { maxMsgLen } from "~~/src/constant";
import { setMsgAlert, setErrAlert } from "~~/src/util";

const responseText = ref("");
const mode = ref<"Telegram" | "Notion" | "Email" | undefined>();
const messageContent = ref("");

const sendTelegramMsg = (message: string) => {
  return $fetch("/telegram", { method: "post", body: { message } });
};
const sendEmail = (message: string) => {
  return $fetch("/email", { method: "post", body: { message } });
};
const uploadNotion = (message: string) => {
  return $fetch("/notion", {
    method: "post",
    body: { message, tags: ["Web"] },
  });
};

const sendMessage = async () => {
  responseText.value = "";
  if (messageContent.value.length > maxMsgLen) {
    setErrAlert(`Message is too long, cannot be longer than ${maxMsgLen}.`);
  } else if (!mode.value) {
    setErrAlert("Choose A Mode");
  } else {
    let res;
    switch (mode.value) {
      case "Telegram":
        res = await sendTelegramMsg(messageContent.value);
        break;
      case "Notion":
        res = await uploadNotion(messageContent.value);
        break;
      case "Email":
        res = await sendEmail(messageContent.value);
        break;
      default:
        responseText.value = "Wrong Mode";
    }
    responseText.value = JSON.stringify(res, null, 4);
    if (res.ok) {
      setMsgAlert("Message sent successfully");
    } else {
      setErrAlert("Something went wrong");
    }
  }
};
</script>
