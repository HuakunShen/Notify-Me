<template>
  <div class="px-10 mx-auto 2xl:w-1/2 xl:w-2/3">
    <div>
      <h1 class="text-3xl mb-2">Send Message</h1>
      <form class="grid grid-cols-3 gap-4" @submit="sendMessage">
        <mode-choice class="col-span-1" v-model="mode" />
        <textarea
          class="textarea textarea-info w-full col-span-2"
          v-model="messageContent"
        ></textarea>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Your Name</span>
          </label>
          <input type="text" v-model="name" class="input input-bordered" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Your Email</span>
          </label>
          <input type="text" v-model="email" class="input input-bordered" />
        </div>
        <br />
        <button type="submit" class="btn btn-info mt-2">Send</button>
      </form>
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
const name = ref("");
const email = ref("");

const mode = ref<"Telegram" | "Notion" | "Email">("Telegram");
const messageContent = ref("");

const sendTelegramMsg = (message: string, name: string, email: string) => {
  return $fetch("/telegram", { method: "post", body: { message, email, name } });
};
const sendEmail = (message: string, name: string, email: string) => {
  return $fetch("/email", { method: "post", body: { message, email, name } });
};
const uploadNotion = (message, name: string, email: string) => {
  return $fetch("/notion", {
    method: "post",
    body: { message, email, name, tags: ["Web"] },
  });
};

const sendMessage = async (e: SubmitEvent) => {
  e.preventDefault();
  responseText.value = "";
  if (messageContent.value.length > maxMsgLen) {
    setErrAlert(`Message is too long, cannot be longer than ${maxMsgLen}.`);
  } else if (!mode.value) {
    setErrAlert("Choose A Mode");
  } else {
    let res;
    switch (mode.value) {
      case "Telegram":
        res = await sendTelegramMsg(messageContent.value, name.value, email.value);
        break;
      case "Notion":
        res = await uploadNotion(messageContent.value, name.value, email.value);
        break;
      case "Email":
        res = await sendEmail(messageContent.value, name.value, email.value);
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
