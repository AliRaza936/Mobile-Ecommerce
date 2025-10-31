import nodemailer from "nodemailer";
import dotenv from "dotenv";
import getVerificationEmailTemplate from "./verificationEmailTemplate.js";

dotenv.config();

const mailer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (email, subject, otpCode) => {
  try {
    const mailOptions = {
      from: `"Pricemaart" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      html: getVerificationEmailTemplate(otpCode, subject),
    };

    const info = await mailer.sendMail(mailOptions);
    console.log("✅ Verification email sent successfully!");
    console.log("📦 Full Info:", info);
    console.log("📨 Message ID:", info.messageId || "(not returned by Gmail)");
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw new Error("Failed to send verification email");
  }
};

export default sendEmail;
