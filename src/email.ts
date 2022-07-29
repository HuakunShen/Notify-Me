import nodemailer from "nodemailer";

export const sendEmail = (
  host: string,
  port: number,
  fromName: string,
  fromEmail: string,
  fromPassword: string,
  toEmail: string,
  message: string,
  subject = "Notify Me Message"
) => {
  let transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user: fromEmail,
      pass: fromPassword,
    },
  });

  // send mail with defined transport object
  return transporter.sendMail({
    from: `"${fromName}" ${fromEmail}`, // sender address
    to: toEmail,
    subject: subject, // Subject line
    text: message, // plain text body
  });
};
