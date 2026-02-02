// const express=require('express');
// const {
//     register,Verify,reverify,login,logout,forgotPassword,
//     changePassword,verifyOtp,allUser,getUserById,updateUser
// }=require("../controller/userControler.js");
// const router=express.Router();
// const {isaouthenticated,isAdmin}=require("../middleware/isAouthenticate.js");
// const { singleUpload } = require('../middleware/multer.js');



// router.post("/register",register);
// router.post("/verify",Verify)
// router.post("/reverify",reverify)
// router.post("/login",login)
// router.post("/logout" ,isaouthenticated,logout)
// router.post("/forgot-password",forgotPassword)
// router.post("/verifyOtp/:email",verifyOtp)
// router.post("/changePassword/:email",changePassword)
// router.get("/all_user",isaouthenticated,isAdmin,allUser);
// router.get("/getUserById/:userId",getUserById);
// router.put("/update/:id",isaouthenticated,singleUpload,updateUser);
// router.get("/verify/:token", async (req, res) => {
//   try {
//     const { token } = req.params;

//     const decoded = jwt.verify(token, process.env.KEY);

//     const user = await User.findById(decoded.id);

//     if (!user) {
//     return res.status(400).send("User not found");
//     }

//     user.isVerified = true;
//     user.token = undefined;
//     await user.save();

//     // ✅ frontend page par bhej do
//     res.redirect(`${process.env.CLIENT_URL}/login`);

//   } catch (error) {
//     return res.status(400).send("Invalid or expired link");
//   }
// });

// module.exports=router;








const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/model");

const {
  register,
  Verify,
  reverify,
  login,
  logout,
  forgotPassword,
  verifyOtp,
  changePassword,
  allUser,
  getUserById,
  updateUser
} = require("../controller/userControler");

const { isaouthenticated, isAdmin } = require("../middleware/isAouthenticate");
const { singleUpload } = require("../middleware/multer");

// Auth routes
router.post("/register", register);
router.post("/verify", Verify);
router.post("/reverify", reverify);
router.post("/login", login);
router.post("/logout", isaouthenticated, logout);
router.post("/forgot-password", forgotPassword);
router.post("/verifyOtp/:email", verifyOtp);
router.post("/changePassword/:email", changePassword);

// Users
router.get("/all_user", isaouthenticated, isAdmin, allUser);
router.get("/getUserById/:userId", getUserById);
router.put("/update/:id", isaouthenticated, singleUpload, updateUser);



// ✅ EMAIL CLICK VERIFY ROUTE
router.get("/verify/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.KEY);

    const user = await User.findById(decoded.id);
    if (!user) return res.send("User not found");

    user.isVerified = true;
    user.token = null;
    await user.save();

    return res.redirect(`${process.env.CLIENT_URL}/login`);
  } catch (err) {
    return res.send("Invalid or Expired Link");
  }
});

module.exports = router;
