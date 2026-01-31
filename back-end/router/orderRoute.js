const express=require('express')
const { isaouthenticated, isAdmin } = require('../middleware/isAouthenticate')
const { createOrder, verifyPayment, getMyOrder, getAllOrdersAdmin, getUserOrders, getSalesData } = require('../controller/orderController')

const route=express.Router()


route.post("/create-order",isaouthenticated,createOrder)
route.post("/verify-payment",isaouthenticated,verifyPayment)
route.get("/myorder",isaouthenticated,getMyOrder)
route.get("/all",isaouthenticated,isAdmin,getAllOrdersAdmin)
route.get("/user-order/:userId",isaouthenticated,isAdmin,getUserOrders)
route.get("/sales",isaouthenticated,isAdmin,getSalesData)

module.exports=route