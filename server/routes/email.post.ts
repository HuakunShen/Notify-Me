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
    return sendEmail(
      config.emailHost,
      config.emailPort,
      config.emailFromName || config.emailFromAddress,
      config.emailFromAddress,
      config.emailFromPassword,
      body.emails || [config.emailDefaultToAddress],
      body.message,
      "Notify Me Message"
    ).then((res) => {
      return { ok: true };
    });
  });
});
