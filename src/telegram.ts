export const sendTelegramMessage = (message: string, token: string, chatId: string) => {
  return $fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "post",
    body: {
      chat_id: chatId,
      text: message,
    },
  });
};
