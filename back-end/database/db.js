const mongoose=require('mongoose')


// async function db() {
//     await mongoose.connect(process.env.CONNECTION)
//     console.log("mongo DB is connect !");
// }

// module.exports=db;



 const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION);
    console.log("DB Connected");
  } catch (err) {
    console.log("DB Error:", err);
  }
};

module.exports=connectDB;


