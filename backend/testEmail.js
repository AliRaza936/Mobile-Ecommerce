import sendEmail from "./utils/email.js";

(async () => {
  try {
    await sendEmail("aliking93644@gmail.com", "Test Email", "123456");
    console.log("Test email sent!");
  } catch (err) {
    console.error("Failed to send test email:", err);
  }
})();
