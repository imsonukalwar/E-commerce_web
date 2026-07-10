


const nodemailer = require("nodemailer");
require("dotenv").config();

const sendotpMail = async (otp, email) => {
  try {
    // If Resend API Key is provided, use Resend HTTP API
    if (process.env.RESEND_API_KEY) {
      const { Resend } = require("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM || "onboarding@resend.dev";
      
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Password Reset OTP",
        html: `<p>OTP for password reset is: <b>${otp}</b></p>`
      });

      if (error) {
        throw new Error(error.message);
      }
      console.log("OTP mail sent via Resend:", data);
      return;
    }

    // Fallback to Nodemailer Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailConfiguration = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `<p>OTP for password reset is: <b>${otp}</b></p>`
    };

    const info = await transporter.sendMail(mailConfiguration);
    console.log("OTP mail sent via SMTP:", info.response);

  } catch (error) {
    console.log("OTP mail error:", error);
    throw new Error("Failed to send OTP email: " + error.message);
  }
};

module.exports = { sendotpMail };
