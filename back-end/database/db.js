const mongoose=require('mongoose')


async function db() {
    await mongoose.connect(process.env.CONNECTION)
    console.log("mongo DB is connect !");
}

module.exports=db;