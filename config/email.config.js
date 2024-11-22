import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transport = nodemailer.createTransport({
  host : process.env.mailtrap_host,
  port : process.env.mailtrap_port,
  auth : {
    user : process.env.mailtrap_user,
    pass : process.env.mailtrap_pass
  }
});

export const sendVerificationCode = async (recipientEmail, verificationCode) => {
  const mailOptions = {
    from : `"InstaHealth Group <${process.env.email_sender}>"`,
    to : recipientEmail,
    subject : "Account Verification",
    text : "This is to verify your account. Please here is your verification code, type in the input in your application the hit verify button",
    html : `<html><body><div>${verificationCode}</div></body></html>`
  };
  try {
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.error(error.message);
  }
}