export default defineEventHandler((event) => {
  console.log(event.req.socket.remoteAddress);
  return { online: true, remoteAddress: event.req.socket.remoteAddress };
});
