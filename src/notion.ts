import { Client } from "@notionhq/client";

export const uploadNotionMessage = (
  message: string,
  tags: string[] = [],
  name: string,
  email: string,
  databaseId: string,
  token: string
) => {
  const client = new Client({
    auth: token,
  });
  return client.pages
    .create({
      parent: { database_id: databaseId },
      properties: {
        Message: { rich_text: [{ text: { content: message } }] },
        Name: { title: [{ text: { content: name } }] },
        Email: { rich_text: [{ text: { content: email } }] },
        Tags: {
          multi_select: tags.map((tag) => ({ name: tag })),
        },
      },
    })
    .then((res) => {
      return res;
    });
};
