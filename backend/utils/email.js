import { Resend } from "resend";
import getVerificationEmailTemplate from "./verificationEmailTemplate.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (email, subject, otpCode) => {
  try {
    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM, // e.g., "Pricemaart <noreply@yourdomain.com>"
      to: email,
      subject: subject,
      html: getVerificationEmailTemplate(otpCode, subject),
    });

    console.log("Verification email sent successfully! ID:", response.id);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};

export default sendEmail;
