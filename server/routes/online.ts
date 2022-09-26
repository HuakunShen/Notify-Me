export default defineEventHandler((event) => {
  console.log(event.req.headers["x-forwarded-for"]);
  const ip =
    event.req.headers["x-forwarded-for"] || // From proxy headers, can be spoofed if you don't have a proxy in front of your app, so drop it if your app is naked.
    event.req.connection.remoteAddress ||
    event.req.socket.remoteAddress; // socket is an alias to connection, just delete this line
  return { online: true, remoteAddress: ip };
});
