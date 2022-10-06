import { parseArrayBody, queryVarToString } from "~~/src/util";

export default defineEventHandler(async (event) => {
  if (event.req.method === "GET") {
    const query = useQuery(event);
    query.name = queryVarToString(query.name);
    query.email = queryVarToString(query.email);
    query.message = queryVarToString(query.message) || "no message";
    event.context.query = query;
  } else if (event.req.method === "POST") {
    const body = await useBody(event);
    body.name = queryVarToString(body.name);
    body.email = queryVarToString(parseArrayBody(body.email));
    body.message = queryVarToString(body.message) || "no message";
    if (body.tags) {
      if (typeof body.tags === "string") {
        body.tags = body.tags.split(",").map((x: string) => x.trim());
      } else {
        // is array, leave it as is
      }
    } else {
      body.tags = [];
    }
    event.context.body = body;
  }
});
