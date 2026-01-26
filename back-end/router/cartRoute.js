

const express=require('express');
const cartRouter=express.Router();
const { isaouthenticated } = require('../middleware/isAouthenticate.js');
const { getCart, addToCart, updateQuantity, removeFromCart } = require('../controller/cartController.js');


cartRouter.get("/",isaouthenticated,getCart);
cartRouter.post("/add",isaouthenticated,addToCart)
cartRouter.put("/update",isaouthenticated,updateQuantity)
cartRouter.delete("/remove",isaouthenticated,removeFromCart)



module.exports=cartRouter;