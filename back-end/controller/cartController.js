const Cart = require("../models/cartModel")
const Product = require("../models/productModel")


const getCart=async(req,res)=>{
    try {
        const userId=req.id
        const cart=await Cart.findOne({userId}).populate("items.productId")
        if(!cart){
            return res.status(200).send({
                success:true,
                cart:[]
            })
        }
        return res.status(200).send({
                success:true,
                cart
            })
    } catch (error) {
        return res.status(500).send({
                success:false,
                message:error.message
            })
    }
}


const addToCart=async(req,res)=>{
    try {
        const userId=req.id;
        const {productId}=req.body;
        //check if product is exist 
        const product =await Product.findById(productId);
        if(!product){
            return res.status(404).send({
                success:false,
                message:"product not found"
            })
        }
        //find the user cart if exist
        let cart =await Cart.findOne({userId});
        
        //if user not exist create a new one
        if(!cart){
            cart=new Cart({
                userId,
                items:[{productId:product._id,quantity:1,price:product.productPrise}],
                totalPrice:product.productPrise,
            })
        }else{
            //find if product alredy in th cart
            const itemIndex=cart.items.findIndex(
                (item)=>
                    item.productId.toString()===productId
            )
            if(itemIndex> -1){
                //if product exist >>just increase quantity
                cart.items[itemIndex].quantity+=1;
            }else{
                //if new product >push to cart
                cart.items.push(
                    {productId,
                    quantity:1,
                    price:product.productPrise,}
                )
            }
            //reduce total prise 
            cart.totalPrice=cart.items.reduce(
                (acc,item)=>acc+item.price*item.quantity,0
            )
        }
        //save updated cart
        await cart.save()

        //populate product detales before sending responce
        const populatedCart =await Cart.findById(cart._id).populate("items.productId")
        return res.status(200).send({
                success:true,
                message:"Product Added To Cart Successfully",
                cart:populatedCart
            })
    } catch (error) {
        return res.status(500).send({
                success:false,
                message:error.message
            })
    }
}

const updateQuantity=async(req,res)=>{
    try {
        const userId=req.id;
        const {productId,type}=req.body;

        let cart=await Cart.findOne({userId})
        if(!cart){
            return res.status(404).send({
                success:false,
                message:"Cart not found"
            })
        }
        const item =cart.items.find(item=>item.productId.toString()===productId)
        if(!item){
            return res.status(404).send({
                success:false,
                message:"item not found"
            })
        }
        if(type==="increase") item.quantity+=1;
        if(type==="decrease" && item.quantity>1) item.quantity-=1
        cart.totalPrice=cart.items.reduce(
            (acc,item)=>acc+item.price*item.quantity,0
        );
        await cart.save()
        cart=await cart.populate("items.productId")
        return res.status(200).send({
                success:true,
                cart
            })
    } catch (error) {
        return res.status(404).send({
                success:false,
                message:"product not found"
            })
    }
}

const removeFromCart=async(req,res)=>{
    try {
        const userId=req.id;
        const {productId}=req.body;
        let cart=await Cart.findOne({userId});
        if(!cart){
            return res.status(404).send({
                success:false,
                message:"cart not found"
            })
        }
        cart.items=cart.items.filter(item=>item.productId.toString()!=productId)
        cart.totalPrice=cart.items.reduce(
            (acc,item)=>acc+item.price*item.quantity,0
        )
        cart=await cart.populate("items.productId");
        await cart.save()
        return res.status(200).send({
                success:true,
                cart
            })
    } catch (error) {
        return res.status(404).send({
                success:false,
                message:error.message
            })
    }
}

module.exports={getCart,addToCart,updateQuantity,removeFromCart}