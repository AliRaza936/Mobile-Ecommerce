import nodemailer from "nodemailer";
import dotenv from "dotenv";
import getVerificationEmailTemplate from "./verificationEmailTemplate.js";

dotenv.config();

const sendEmail = async (email, subject, otpCode) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: '"Pricemaart" <yourcompany@example.com>',
      to: email,
      subject,
      html: getVerificationEmailTemplate(otpCode, subject),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Verification email sent successfully! Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};

export default sendEmail;
