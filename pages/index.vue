<template>
  <div class="px-10 mx-auto 2xl:w-1/2 xl:w-2/3">
    <div>
      <h1 class="text-3xl mb-2">Send Message</h1>
      <form @submit="sendMessage">
        <div class="grid grid-cols-3 gap-4">
          <mode-choice class="col-span-1" v-model="mode" :modes="modes" />
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
          <div class="form-control" v-if="services.password">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <div class="indicator">
              <span class="indicator-item badge">
                <div
                  class="tooltip"
                  data-tip="You may or may not need this depeneding on whether it's enabled in the backend"
                >
                  ?
                </div>
              </span>
              <input
                type="password"
                v-model="password"
                class="input input-bordered"
              />
            </div>
          </div>
        </div>
        <button type="submit" class="block btn btn-info mt-2">Send</button>
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
import { modeChoices } from "~~/src/types";
import { ElNotification } from "element-plus";

const responseText = ref("");
const name = ref("");
const email = ref("");
const password = ref("");

const mode = ref<"Telegram" | "Notion" | "Email">("Telegram");
const messageContent = ref("");
const modes = ref<modeChoices[]>([]);

const sendTelegramMsg = (
  message: string,
  name: string,
  email: string,
  password: string
) => {
  return $fetch("/telegram", {
    method: "post",
    body: { message, email, name, password },
  });
};
const sendEmail = (
  message: string,
  name: string,
  email: string,
  password: string
) => {
  return $fetch("/email", {
    method: "post",
    body: { message, email, name, password },
  });
};
const uploadNotion = (
  message,
  name: string,
  email: string,
  password: string
) => {
  return $fetch("/notion", {
    method: "post",
    body: { message, email, name, password, tags: ["Web"] },
  });
};

const sendMessage = async (e: SubmitEvent) => {
  e.preventDefault();
  responseText.value = "";
  if (messageContent.value.length > maxMsgLen) {
    ElNotification({
      title: "Error",
      message: `Message is too long, cannot be longer than ${maxMsgLen}.`,
      type: "error",
    });
  } else if (messageContent.value.length === 0) {
    ElNotification({
      title: "Error",
      message: `Message Cannot Be Empty.`,
      type: "error",
    });
  } else if (!mode.value) {
    ElNotification({
      title: "Error",
      message: "Choose A Mode",
      type: "error",
    });
  } else {
    let res;
    switch (mode.value) {
      case "Telegram":
        res = await sendTelegramMsg(
          messageContent.value,
          name.value,
          email.value,
          password.value
        );
        break;
      case "Notion":
        res = await uploadNotion(
          messageContent.value,
          name.value,
          email.value,
          password.value
        );
        break;
      case "Email":
        res = await sendEmail(
          messageContent.value,
          name.value,
          email.value,
          password.value
        );
        break;
      default:
        responseText.value = "Wrong Mode";
    }
    responseText.value = JSON.stringify(res, null, 4);
    if (res.ok) {
      ElNotification({
        title: "Success",
        message: `Message sent successfully`,
        type: "success",
      });
    } else {
      ElNotification({
        title: "Success",
        message: "Something went wrong",
        type: "success",
      });
    }
  }
};

const services = await $fetch("/services", {
  method: "get",
});
if (services.telegram) modes.value.push("Telegram");
if (services.notion) modes.value.push("Notion");
if (services.email) modes.value.push("Email");
</script>
