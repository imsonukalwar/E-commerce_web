import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "@/redux/ProductSlice";

const ProductCard = ({ product, loading }) => {
  if (!product) return null;
  const { productImage, productPrise, productName } = product;
  const accessToken=localStorage.getItem('accessToken')
  const dispatch=useDispatch()
  const nevigate=useNavigate()
  // console.log(product);

  const addtocart=async(productId)=>{
    try {
      const res=await axios.post(`http://localhost:8000/cart/add`,{productId},{
        headers:{
          Authorization:`Bearer ${accessToken}`}
      })
      if(res.data.success){
        toast.success("Product added to cart");
        dispatch(setCart(res.data.cart))
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="shadow-lg rounded-lg transition-transform overflow-hidden h-max ">
      <div className="w-full h-full aspect-square overflow-hidden">
        {loading ? (
          <Skeleton className="h-full w-full rounded-lg" />
        ) : (
          <img
          onClick={()=>nevigate(`/product/${product._id}`)}
            src={productImage[0]?.url}
            alt={productName}
            className="w-full h-full trannsition-transform duration-300 hover:scale-105 object-cover"
          />
        )}
      </div>
      {loading ? (
        <div className="px-2 space-y-2 my-2">
          <Skeleton className="w-[200px] h-4" />
          <Skeleton className="w-[100px] h-4" />
          <Skeleton className="w-[150px] h-8" />
        </div>
      ) : (
        <div className="px-2 space-y-1">
          <h1 className="font-semibold h-12 line-clamp-2"> {productName}</h1>
          <h2 className="font-bold">₹{productPrise}</h2>
          <Button onClick={()=>addtocart(product._id)} className="bg-pink-600 mb-3 w-full">
            <ShoppingCart />
            Add to Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
