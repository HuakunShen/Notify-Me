# Notify Me

[![Netlify Status](https://api.netlify.com/api/v1/badges/6c35deee-285a-45ff-8f98-c1f5fd83e759/deploy-status)](https://app.netlify.com/sites/notify-huakun/deploys)

This project is for sending notification to oneself.

Seems like a boring useless tool, but I can find some use cases.

The web app has a frontend and backend both written with Nuxt 3.

The frontend is only for development and demo purpose. The useful part is the API.

The API allows you to send message to yourself with both GET and POST requests. With GET request support you can send the message within browser.

The notion integration not only allows you to send message to yourself, but also record the messages in a database.

Think about when you need to send message to yourself using an API.

## Use Cases

### Send Automatic Message to Yourself

1. A monitor app or CRON job can send automatic notification to yourself.
2. Automatic script such as [Wifi Password Thief](https://github.com/HuakunShen/rubber-ducky-toolbox).
3. Web Cralwer Notification.
4. Transfer message from one device to another using only Browser Address Bar.

### Upload to Notion or Database

1. "Leave a Message" or "Contact Form" information can be uploaded to Notion Database (for free).

## Supported Platforms

- [x] Email
- [x] Telegram
- [x] Notion
- [ ] Slack
- [ ] Discord

## API Documentation

https://documenter.getpostman.com/view/18849321/UzXKXKdv

## .env

`.env` file contains the environment variables, sample file is below.

```
telegramBotToken="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
telegramChatId="xxx"

emailHost="mail.privateemail.com"
emailPort=587
emailFromAddress="xxx"
emailFromPassword="xxx"
emailDefaultToAddress="xxx"
emailFromName="Huakun 💻 Notification System"

notionSecret="secret_xxx"
notionDatabaseId="xxx"

password="xxx"
```

All env vars needs to be set to enable a service.

For example,

- not setting `password` will disable password checking feature.
- not setting `emailFromAddress` will disable email sending feature.

Disabled features will not be displayed in frontend.

## Third Party API

### Telegram

How to create a Telegram bot to send yourself messages?


https://learn.microsoft.com/en-us/azure/bot-service/bot-service-channel-connect-telegram?view=azure-bot-service-4.0

#### How to create a Telegram Bot

https://core.telegram.org/bots#how-do-i-create-a-bot

Send `/newbot` to `@BotFater`, and follow the instructions.

#### Telegram API to Send Message

Requires a token and a chat id.

https://core.telegram.org/bots/api#sendmessage

```js
fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "post",
    body: {
        chat_id: chatId,
        text: message,
    },
});
```

#### Get Chat ID

Send a message to the bot first, then go to `https://api.telegram.org/bot<YOUR BOT TOKEN HERE>/getUpdates` to find the chat id.

Later, telegram messages will be sent to this chat.