

const express=require('express');
const router=express.Router();
const {multipleUpload}=require("../middleware/multer.js")
const {addProduct,getAllProduct,deleteProduct,updateProduct}=require("../controller/productController.js");
const { isaouthenticated, isAdmin } = require('../middleware/isAouthenticate.js');


router.post("/add",isaouthenticated,isAdmin,multipleUpload,addProduct);
router.get("/getAllProducts",getAllProduct)
router.delete("/delete/:productId",isaouthenticated,isAdmin,deleteProduct)
router.put("/update/:productId",isaouthenticated,isAdmin,multipleUpload,updateProduct)



module.exports=router;