export default defineEventHandler((event) => {
  setResponseHeader(event, "Access-Control-Allow-Origin", "*");

  const ip =
    event.req.headers["x-forwarded-for"] || event.req.socket.remoteAddress;
  return { online: true, remoteAddress: ip };
});
