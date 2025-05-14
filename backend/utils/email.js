import nodemailer from "nodemailer";
import getVerificationEmailTemplate from './verificationEmailTemplate.js'
const sendEmail = async (email, subject, otpCode) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, // Your Gmail address
          pass: process.env.EMAIL_PASS, // Your Gmail App Password (not normal password)
        },
      });
  
      let mailOptions = {
        from: '"Pricemaart" <yourcompany@example.com>',
        to: email,
        subject: subject,
        html: getVerificationEmailTemplate(otpCode,subject), // Use HTML template
      };
  
      await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send verification email");
    }
  };
  


export default sendEmail;