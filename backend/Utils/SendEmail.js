import { createTransport } from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  var transporter = createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "09db78a9f57698",
      pass: "4533b4b87266db"
    }
  });

  console.log('sending the mail smtp');
  await transporter.sendMail({ to, subject, text })
}