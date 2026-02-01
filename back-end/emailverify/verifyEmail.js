

const nodemailer=require('nodemailer')
require('dotenv').config();


const verifyemail=async(token,email)=>{
        console.log("kam to kar raha hau");
const transporter=nodemailer.createTransport({

    
    // service:'email',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PAS
    }
})
const mailConfiguration={
    from:process.env.MAIL_USER,
    to:email,
    subject:'Email.Verification',
    text:`Hi ! There,  You have recently visited 
    our website and entiredyour email.please follow 
    the given link to verify your email
    http://localhost:5173/verify/${token}
    thanks `
}
await transporter.sendMail(mailConfiguration,function(error,info){
    if(error){
        throw new Error(error);
    }
    console.log("email send sucsessfully !");
    console.log(info);
})
}


module.exports={verifyemail};