require('dotenv').config()
const cors=require('cors')
const express=require('express');
const app=express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))
const port=process.env.PORT||8000;
app.use(express.json());
const db=require("./database/db.js")
const router=require("./router/userroute.js")
const productRoute=require("./router/productRoute.js");
const cartRouter = require('./router/cartRoute.js');
const route = require('./router/orderRoute.js');
app.use(express.urlencoded({ extended: true }));

//user route
app.use("/",router)
//product
app.use("/product",productRoute)
//cart route
app.use("/cart",cartRouter)
//payment order
app.use("/orders",route)

db()
.then(()=>{

app.listen(port,(req,res)=>{
    console.log(`you are listem at port :${port}`);
})
})
.catch((error)=>{
    throw new Error(error.message)
})
