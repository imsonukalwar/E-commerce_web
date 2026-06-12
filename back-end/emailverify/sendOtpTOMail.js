


const nodemailer = require("nodemailer");
require("dotenv").config();

const sendotpMail = async (otp, email) => {
  try {
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
    console.log("OTP mail sent:", info.response);

  } catch (error) {
    console.log("OTP mail error:", error);
  }
};

module.exports = { sendotpMail };
