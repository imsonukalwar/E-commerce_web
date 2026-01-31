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
const dispatch = useDispatch();
const navigate = useNavigate();

const API=`${import.meta.env.VITE_URL}/cart`;
const accessToken = localStorage.getItem("accessToken");

const subTotal = cart?.totalPrice || 0;
const shipping = subTotal > 299 ? 0 : 22;
const tax = subTotal * 0.05;
const total = subTotal + shipping + tax;

useEffect(()=>{
  loadCart();
},[])

const loadCart = async()=>{
  const res = await axios.get(API,{
    headers:{Authorization:`Bearer ${accessToken}`}
  });
  if(res.data.success){
    dispatch(setCart(res.data.cart))
  }
}

const updateQty = async(id,type)=>{
  const res = await axios.put(`${API}/update`,
    {productId:id,type},
    {headers:{Authorization:`Bearer ${accessToken}`}}
  );
  if(res.data.success){
    dispatch(setCart(res.data.cart))
  }
}

const removeItem = async(id)=>{
  const res = await axios.delete(`${API}/remove`,{
    headers:{Authorization:`Bearer ${accessToken}`},
    data:{productId:id}
  });
  if(res.data.success){
    dispatch(setCart(res.data.cart))
    toast.success("Removed from cart")
  }
}

return (

<div className="min-h-screen pt-24 bg-gradient-to-br from-slate-100 via-pink-100 to-purple-100">

{cart?.items?.length > 0 ? (

<div className="max-w-7xl mx-auto px-4">

<h1 className="
text-4xl font-extrabold mb-10
bg-gradient-to-r from-pink-600 to-purple-600
bg-clip-text text-transparent
">
Shopping Cart
</h1>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

{/* LEFT */}
<div className="lg:col-span-2 space-y-6">

{cart.items.map(item=>(
<div key={item._id}
className="
bg-white/80 backdrop-blur-xl
p-5 rounded-2xl
shadow-lg hover:shadow-2xl
hover:scale-[1.01]
transition-all
">

<div className="flex flex-col sm:flex-row items-center gap-5">

<img
src={item.productId.productImage?.[0]?.url}
onClick={()=>navigate(`/product/${item.productId._id}`)}
className="
w-28 h-28 object-cover rounded-xl
cursor-pointer hover:scale-110 transition
"
/>

<div className="flex-1">
<h2 className="font-semibold text-lg line-clamp-1">
{item.productId.productName}
</h2>
<p className="text-gray-600">
₹ {item.productId.productPrise}
</p>
</div>

<div className="flex items-center gap-3">

<button
onClick={()=>updateQty(item.productId._id,"decrease")}
className="w-9 h-9 bg-pink-500 text-white rounded-full hover:bg-pink-600 active:scale-90"
>-</button>

<span className="font-semibold">
{item.quantity}
</span>

<button
onClick={()=>updateQty(item.productId._id,"increase")}
className="w-9 h-9 bg-pink-500 text-white rounded-full hover:bg-pink-600 active:scale-90"
>+</button>

</div>

<p className="font-bold">
₹ {item.productId.productPrise * item.quantity}
</p>

<button
onClick={()=>removeItem(item.productId._id)}
className="text-red-500 hover:underline"
>
Remove
</button>

</div>

</div>
))}

</div>

{/* RIGHT */}
<div className="sticky top-28">

<div className="
bg-white/90 backdrop-blur-xl
p-6 rounded-2xl shadow-xl
space-y-4
">

<h2 className="text-xl font-bold">
Cart Summary
</h2>

<div className="flex justify-between">
<span>Subtotal</span>
<span>₹ {subTotal}</span>
</div>

<div className="flex justify-between">
<span>Shipping</span>
<span>₹ {shipping}</span>
</div>

<div className="flex justify-between">
<span>Tax</span>
<span>₹ {tax.toFixed(2)}</span>
</div>

<hr/>

<div className="flex justify-between text-lg font-bold">
<span>Total</span>
<span>₹ {total.toFixed(2)}</span>
</div>

<button
onClick={()=>navigate("/address")}
className="
w-full py-3 mt-3
bg-gradient-to-r from-pink-600 to-purple-600
text-white rounded-xl
hover:scale-105 transition
"
>
Place Order
</button>

<button
onClick={()=>navigate("/products")}
className="
w-full py-3 border rounded-xl
hover:bg-gray-100
"
>
Continue Shopping
</button>

</div>

</div>

</div>

</div>

):(

// EMPTY CART
<div className="flex flex-col items-center justify-center min-h-[70vh]">

<div className="bg-pink-200 p-10 rounded-full animate-pulse">
<ShoppingCart className="w-16 h-16 text-pink-600 animate-bounce"/>
</div>

<h2 className="mt-8 text-3xl font-bold">
Your Cart is Empty
</h2>

<button
onClick={()=>navigate("/products")}
className="
mt-6 px-8 py-3
bg-pink-600 text-white
rounded-full hover:scale-105
"
>
Start Shopping
</button>

</div>

)}

</div>
)
}





export default Cart;


