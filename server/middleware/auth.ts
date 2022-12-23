export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  
  if (event.node.req.method === "GET") {
    const query = await getQuery(event)
    // const query = useQuery(event);
    event.context.auth = !!config.password
      ? config.password === query.password
      : true;
  } else if (event.node.req.method === "POST") {
    const body = await readBody(event)
    event.context.auth = !!config.password
      ? config.password === body.password
      : true;
  }
});
