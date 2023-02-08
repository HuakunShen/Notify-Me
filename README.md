# Notify Me

- [Notify Me](#notify-me)
  - [Use Cases](#use-cases)
    - [Send Automatic Message to Yourself](#send-automatic-message-to-yourself)
    - [Upload to Notion or Database](#upload-to-notion-or-database)
  - [Supported Platforms](#supported-platforms)
  - [API Documentation](#api-documentation)
  - [.env](#env)
  - [Third Party API](#third-party-api)
    - [Telegram](#telegram)
      - [How to create a Telegram Bot](#how-to-create-a-telegram-bot)
      - [Telegram API to Send Message](#telegram-api-to-send-message)
      - [Get Chat ID](#get-chat-id)
    - [Notion API](#notion-api)
    - [Email](#email)


> Click to deploy to Netlify. Don't forget to add environment variables and redeploy, otherwise the webpage will have no service. Read [.env](#env) and [Third Party API](#third-party-api) for more details.

[![](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/HuakunShen/notify-me)


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

### Notion API

Notion Database template: https://huakunshen.notion.site/283649af328f4d429e44d75b41f3c06a?v=4961d433abc8473abe1afcb3e5621350

Duplicate the notion database in your own workspace and continue.

1. Go to https://www.notion.so/my-integrations
2. Click on **"Create new integration**
3. Give "Read", "Update", "Insert" capabilities.
4. Integration Type should be "Internal"
5. Make a copy of the API Key, save it to `.env` file, `notionSecret=<api key>`
6. Go to the notion table/database, click "Add connection" and select the integration.


### Email

- Set email, password and SMPT server address+port in `.env`.
- For example, for example, if you want to use gmail
  - You may have to use [App Password](https://support.google.com/accounts/answer/185833?hl=en)
  - The smtp server is `smtp.gmail.com:587`
    - [Read More](https://support.google.com/mail/answer/7126229?hl=en#zippy=%2Cstep-change-smtp-other-settings-in-your-email-client)
