import { sendEmail } from "~~/src/email";

export default defineEventHandler((event) => {
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
    const emails = body.emails.join(", ")
    let message = body.message as string;
    message += `\n\nName: ${body.name}`;
    message += `\nemail: ${emails}`;
    
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
