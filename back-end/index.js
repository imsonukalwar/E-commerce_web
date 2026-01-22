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

app.use("/",router)




db()
.then(()=>{

app.listen(port,(req,res)=>{
    console.log(`you are listem at port :${port}`);
})
})
.catch(()=>{
    throw new Error("")
})
