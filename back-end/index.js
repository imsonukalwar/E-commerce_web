require('dotenv').config()
const cors=require('cors')
const express=require('express');
const app=express();
app.use(cors({
    origin:[
    "http://localhost:5173",
    "http://localhost:5174",
    "https://capable-monstera-b94bcc.netlify.app"
  ],

    credentials: true
}))
const port=process.env.PORT||8000;
app.use(express.json());
const db=require("./database/db.js")
const router=require("./router/userroute.js")
const productRoute=require("./router/productRoute.js");
const cartRouter = require('./router/cartRoute.js');
const route = require('./router/orderRoute.js');



// app.get("/smtp-check", async (req,res)=>{////
//   await transporter.verify();
//   res.send("SMTP OK");
// });////now




app.use(express.urlencoded({ extended: true }));

// ✅ ADD HERE
app.get("/test-mail", async (req, res) => {
  try {
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: "Test Mail",
      text: "Hello from Render Server"
    });

    res.send("Mail sent");
  } catch (err) {
    console.log(err);
    res.send("Mail failed");
  }
});








app.get("/sonu",(req,res)=>{
    res.send("hello sonu")
})
//user route
app.use("/",router)
//product
app.use("/product",productRoute)
//cart route
app.use("/cart",cartRouter)
//payment order
app.use("/orders",route)


// db()
// .then(()=>{

// app.listen(port,(req,res)=>{
//     console.log(`you are listem at port :${port}`);
// })
// })
// .catch((error)=>{
//     throw new Error(error)
// })



db()
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Local server running at ${port}`);
  });
}

module.exports = app;

