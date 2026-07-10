const nodemailer = require("nodemailer");
require("dotenv").config();

const verifyemail = async (token, email) => {
  try {
    console.log("verifyemail function called");

    // If Resend API Key is provided, use Resend HTTP API
    if (process.env.RESEND_API_KEY) {
      const { Resend } = require("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM || "onboarding@resend.dev";
      
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Email Verification",
        html: `<p>Click the link below to verify your email:</p><p><a href="${process.env.CLIENT_URL}/verify/${token}">${process.env.CLIENT_URL}/verify/${token}</a></p>`
      });

      if (error) {
        throw new Error(error.message);
      }
      console.log("Verification mail sent via Resend:", data);
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
      subject: "Email Verification",
      text: `
Click below link to verify your email:

${process.env.CLIENT_URL}/verify/${token}
      `,
    };

    const info = await transporter.sendMail(mailConfiguration);
    console.log("Verification mail sent via SMTP:", info.response);

  } catch (error) {
    console.log("Verification mail error:", error);
    throw new Error("Failed to send verification email: " + error.message);
  }
};

module.exports = { verifyemail };