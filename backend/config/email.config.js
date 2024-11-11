// Looking to send emails in production? Check out our Email API/SMTP product!
import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const TOKEN = "658baea98b4ef2596d212b01ddc99116";

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    testInboxId: 3268958,
  })
);

const sender = {
  address: "hello@example.com",
  name: "Mailtrap Test",
};
const recipients = [
  "nelsonprox92@gmail.com",
];

transport
  .sendMail({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
    sandbox: true
  })
  .then(console.log, console.error);