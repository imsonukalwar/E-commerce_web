

// const nodemailer=require('nodemailer')
// require('dotenv').config();


// const sendotpMail=async(otp,email)=>{
// const transporter=nodemailer.createTransport({
//     // service:'email',
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth:{
//         user:process.env.MAIL_USER,
//         pass:process.env.MAIL_PASS,
//     }
// })
// const mailConfiguration={
//     from:process.env.MAIL_USER,
//     to:email,
//     subject:'Password Reset OTP',
//     html:`<p>OTP for password reset Is: ${otp}</p>`
// }
// transporter.sendMail(mailConfiguration,function(error,info){
//     if(error){
//         throw new Error(error);
//     }
//     console.log("OTP send sucsessfully !");
//     console.log(info);
// })
// }


// module.exports=sendotpMail;



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
