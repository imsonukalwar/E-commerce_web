import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userLogo from "../assets/user.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCart } from "@/redux/ProductSlice";
import { toast } from "sonner";



const Cart = () => {
const { cart } = useSelector(store => store.product);
console.log(cart);

const subTotal=cart?.totalPrice||0
const shiping=subTotal>299?0:22;
const tax=subTotal*0.05 ;
const total=subTotal+shiping+tax;
const nevigate=useNavigate()
const API="http://localhost:8000/cart"
const accessToken=localStorage.getItem("accessToken")
const dispatch=useDispatch()

const loadCart=async()=>{
    try {
        const res=await axios.get(API,{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        if(res.data.success){
            dispatch(setCart(res.data.cart))
        }
    } catch (error) {
        console.log(error);
        
    }
}

const handleUpdateQuantity=async(productId,type)=>{
    console.log("SENDING 👉", productId, typeof productId);
    try {
        const res =await axios.put(`${API}/update`,{productId,type},{
            
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        if(res.data.success){
            dispatch(setCart(res.data.cart))
        }
    } catch (error) {
        console.log(error);
        
    }
}

const handleRemove=async(productId)=>{
    try {
        const res=await axios.delete(`${API}/remove`,{
            headers:{
                Authorization:`Bearer ${accessToken}`
            },
            data:{productId}
        })
        if(res.data.success){
            dispatch(setCart(res.data.cart))
            toast.success("Product Remove From The Data")
        }
    } catch (error) {
        console.log(error);
        
    }
}

useEffect(()=>{
    loadCart()
},[dispatch])

return (
    <div className="pt-20 bg-gray-50 min-h-screen">
    {cart?.items?.length > 0 ? (
        <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-7">Shopping Cart</h1>
        <div className="max-w-7xl mx-auto flex gap-7">
            <div className="flex flex-col gap-5 flex-1">
                {
                    cart?.items?.map((product,index)=>{
                        return <Card key={index}>
                            <div className="flex justify-between items-center pr-7">
                                <div className="flex items-center w-[350px]">
                                    <img src={product?.productId?.productImage?.[0]?.url||userLogo} alt="" className="w-25 h-25"/>
                                    <div className="w-[280px]">
                                        <h1 className="font-semibold truncate">{product?.productId?.productName}</h1>
                                        <p>₹ {product?.productId?.productPrise}</p>
                                    </div>
                                </div>
                                <div className="flex gap-5 items-center">
                                    <Button onClick={()=>handleUpdateQuantity(product.productId._id,'decrease')} variant="outline">-</Button>
                                    <span>{product.quantity}</span>
                                    <Button onClick={()=>handleUpdateQuantity(product.productId._id,'increase')}  variant="outline">+</Button>
                                </div>
                                <p>₹ {(product?.productId?.productPrise)*(product?.quantity)} </p>
                                <p onClick={()=>handleRemove(product?.productId?._id)} className="flex text-red-500 items-center gap-1 cursor-pointer"><Trash2 className="w-4 h-4"/>
                                Remove</p>
                            </div>
                        </Card>
                    })}
            </div>
            <div>
                <Card className='w-[400px]'>
                    <CardHeader>
                        <CardTitle>Cart Summary</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className="flex justify-between">
                            <span>SubTotal ({cart?.items?.length}items) </span>
                            <span>₹ {cart?.totalPrice?.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shiping</span>
                            <span>₹ {shiping} </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax(5%)</span>
                            <span>₹ {tax} </span>
                        </div>
                        <Separator></Separator>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹ {total} </span>
                        </div>
                        <div className="space-y-3 pt-4">
                            <div className="flex space-x-2">
                                <Input placeholder='Promo Code'/>
                                <Button variant="outline">Apply</Button>
                            </div>
                            <Button className='w-full bg-pink-500'>Place Order</Button>
                            <Button variant="outline" className='w-full bg-transparent'>
                                <Link to="/products">COuntinue Shoping</Link>
                            </Button>
                        </div>
                        <div className="text-sm text-muted-foreground pt-4">
                        <p>* Free shipping on order over ₹299</p>
                        <p>* 10-day return policy</p>
                        <p>* Secure checkout with SSL encryption</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>):(

<div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">

  {/* Icon */}
<div
        className="bg-pink-100 p-8 rounded-full shadow-lg animate-pulse
        transition-transform duration-300 hover:scale-110">
        <ShoppingCart className="w-16 h-16 text-pink-600 animate-bounce" />
        </div>
        {/* Title */}
        <h2 className="mt-8 text-3xl font-extrabold text-gray-800 tracking-wide">Your Cart is Empty</h2>
        {/* Subtitle */}
        <p className="mt-3 text-gray-500 max-w-md">Looks like you haven't added anything to your cart yet.
        Start exploring our amazing products!</p>
        {/* Button */}
        <Button onClick={() => nevigate("/products")}
        className="mt-8 px-8 py-3 text-lg font-semibold bg-pink-600 text-white rounded-full
            shadow-md transition-all duration-300 hover:bg-pink-700 hover:scale-105">
            🛍️ Start Shopping
            </Button>
</div>


    )}
    </div>
);
};

export default Cart;


