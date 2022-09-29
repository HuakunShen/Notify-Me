import { sendEmail } from "~~/src/email";

export default defineEventHandler((event) => {
  setResponseHeader(event, "Access-Control-Allow-Origin", "*");

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

  return useBody(event).then((body) => {
    const emails = body.emails.join(", ");
    let message = body.message as string;
    message += `\n\nName: ${body.name}`;
    message += `\nemail: ${emails}`;
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
      emails,
      message,
      "Notify Me Message"
    ).then((res) => {
      return { ok: true };
    });
  });
});
