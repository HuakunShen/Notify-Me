import { sendEmail } from "~~/src/email";

export default defineEventHandler((event) => {
  if (!event.context.auth)
    return {
      ok: false,
      error: "Not Authenticated, Please Include Correct Password",
    };
  const config = useRuntimeConfig();
  if (
    !config.emailHost ||
    !config.emailPort ||
    !config.emailFromAddress ||
    !config.emailFromPassword ||
    !config.emailDefaultToAddress
  )
    throw new Error("Email not Enabled");
  const query = event.context.query;
  let message = query.message as string;
  message += `\n\nName: ${query.name}`;
  message += `\nemail: ${query.email}`;
  const ip = JSON.stringify(
    event.req.headers["x-forwarded-for"] || event.req.socket.remoteAddress
  );
  message += `\nIP: ${ip}`;
  return sendEmail(
    config.emailHost,
    config.emailPort,
    config.emailFromName || config.emailFromAddress,
    config.emailFromAddress,
    config.emailFromPassword,
    query.email as string,
    message,
    "Notify Me Message"
  ).then((res) => {
    return { ok: true };
  });
});
