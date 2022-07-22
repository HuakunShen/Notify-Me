import { Client } from "@notionhq/client";

export const uploadNotionMessage = (
  message: string,
  tags: string[] = [],
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
        Tags: {
          multi_select: tags.map((tag) => ({ name: tag })),
        },
      },
    })
    .then((res) => {
      return res;
    });
};
