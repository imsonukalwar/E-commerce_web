const express=require('express');
const {
    register,Verify,reverify,login,logout,forgotPassword,
    changePassword,verifyOtp,allUser,getUserById,updateUser
}=require("../controller/userControler.js");
const router=express.Router();
const {isaouthenticated,isAdmin}=require("../middleware/isAouthenticate.js");
const { singleUpload } = require('../middleware/multer.js');



router.post("/register",register);
router.post("/verify",Verify)
router.post("/reverify",reverify)
router.post("/login",login)
router.post("/logout" ,isaouthenticated,logout)
router.post("/forgot_password",forgotPassword)
router.post("/verifyOtp/:email",verifyOtp)
router.post("/changePassword/:email",changePassword)
router.get("/all_user",isaouthenticated,isAdmin,allUser);
router.get("/getUserById",getUserById);
router.put("/update/:id",isaouthenticated,singleUpload,updateUser);

module.exports=router;