import nodemailer from "nodemailer";

export const sendResetEmail = async (email: string, resetUrl: string) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a71899af5ab622",
      pass: "6fc90e1362b7ad",
    },
  });

  const mailOptions = {
    from: 'bhurtsahab786521@gmail.com',
    to: email,
    subject: "Password Reset Request",
    html: `<p>You requested a password reset. Click the link below to reset your password:</p>
           <p><a href="${resetUrl}">${resetUrl}</a></p>
           <p>If you didn't request this, please ignore this email.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
