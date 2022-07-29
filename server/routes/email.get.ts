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
  const query = useQuery(event);
  let message = query.message as string;
  message += `\n\nName: ${query.name}`
  message += `\nemail: ${query.email}`
  
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
