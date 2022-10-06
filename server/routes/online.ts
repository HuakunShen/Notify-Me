export default defineEventHandler((event) => {
  const ip =
    event.req.headers["x-forwarded-for"] || event.req.socket.remoteAddress;
  return { online: true, remoteAddress: ip };
});
