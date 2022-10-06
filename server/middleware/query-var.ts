import { queryVarToString } from "~~/src/util";

export default defineEventHandler(async (event) => {
  setResponseHeader(event, "Access-Control-Allow-Origin", "*");
  setResponseHeader(event, "Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  setResponseHeader(event, "Access-Control-Allow-Headers", "Content-type,Authorization,Origin,X-Requested-With,X-Language,Accept-Language");
  
  
  if (event.req.method === "GET") {
    const query = useQuery(event);
    query.name = queryVarToString(query.name);
    query.email = queryVarToString(query.email);
    query.message = queryVarToString(query.message) || "no message";
  } else if (event.req.method === "POST") {
    const body = await useBody(event);
    body.name = queryVarToString(body.name);
    body.email = queryVarToString(body.email);
    body.message = queryVarToString(body.message) || "no message";
  }
});
