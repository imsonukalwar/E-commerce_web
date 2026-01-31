import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "@/redux/ProductSlice";





const ProductCard = ({ product }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  const addToCart = async () => {
    const res = await axios.post(
      "http://localhost:8000/cart/add",
      { productId: product._id },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (res.data.success) {
      dispatch(setCart(res.data.cart));
      toast.success("Added to cart");
    }
  };

  return (

    <div
      className="
        group
        bg-white
        rounded-xl
        border border-gray-200
        shadow-sm
        hover:shadow-xl
        transition-all duration-300 ease-out
        hover:-translate-y-1
        p-4
        flex flex-col
        min-w-[170px]
      "
    >

      {/* IMAGE */}
      <div className="rounded-lg overflow-hidden bg-gray-50">

        <img
          src={product?.productImage?.[0]?.url}
          onClick={() => navigate(`/product/${product._id}`)}
          className="
            h-36 sm:h-40 md:h-44
            w-full
            object-contain
            cursor-pointer
            transition-transform duration-300 ease-out
            group-hover:scale-105
          "
        />

      </div>

      {/* NAME */}
      <h2
        className="
          mt-2
          text-sm sm:text-base
          font-medium
          line-clamp-2
          text-gray-800
        "
      >
        {product.productName}
      </h2>

      {/* PRICE */}
      <p
  className="
    mt-1
    text-base
    font-semibold
    bg-gradient-to-r
    from-pink-600
    to-purple-600
    bg-clip-text
    text-transparent
  "
>
  ₹ {product.productPrise}
</p>


      {/* BUTTON */}
<Button
  onClick={addToCart}
  className="
    mt-4
    h-10
    w-full
    rounded-xl
    text-sm font-medium
    text-white

    bg-gradient-to-r
    from-pink-500
    via-purple-500
    to-indigo-500

    hover:from-pink-600
    hover:via-purple-600
    hover:to-indigo-600

    shadow-md
    hover:shadow-xl

    transition-all duration-300 ease-out
    active:scale-95
  "
>
  Add To Cart
</Button>



    </div>

  );
};








export default ProductCard;
