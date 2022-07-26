export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  if (event.req.method === "GET") {
    const query = useQuery(event);
    event.context.auth = !!config.password
      ? config.password === query.password
      : true;
  } else if (event.req.method === "POST") {
    const body = await useBody(event);
    event.context.auth = !!config.password
      ? config.password === body.password
      : true;
  }
});
