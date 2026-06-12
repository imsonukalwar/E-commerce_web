const nodemailer = require("nodemailer");
require("dotenv").config();

const verifyemail = async (token, email) => {
  try {
    console.log("verifyemail function called");

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
    console.log("Verification mail sent:", info.response);

  } catch (error) {
    console.log("Verification mail error:", error);
  }
};

module.exports = { verifyemail };