const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: "Test Email",
  text: "This is a test email from Nodemailer"
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error("❌ Email sending error:", error);
  }
  console.log("✅ Email sent successfully:", info.response);
});
