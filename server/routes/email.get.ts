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
  const toEmails = (query.email || [config.emailDefaultToAddress]) as
    | string
    | string[];
  const toEmails2 = (
    toEmails instanceof Array ? toEmails : [toEmails]
  ) as string[];
  return sendEmail(
    config.emailHost,
    config.emailPort,
    config.emailFromName || config.emailFromAddress,
    config.emailFromAddress,
    config.emailFromPassword,
    toEmails2,
    query.message as string,
    "Notify Me Message"
  ).then((res) => {
    return { ok: true };
  });
});
