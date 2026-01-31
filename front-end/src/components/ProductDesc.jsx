import axios from "axios"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { setCart } from "@/redux/ProductSlice"


const ProductDesc = ({ product }) => {

  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/cart/add",
        { productId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (res.data.success) {
        toast.success("Product Added To Cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Add to cart failed");
    }
  };

  return (

    <div
      className="
        flex flex-col gap-6
        p-5 sm:p-6 md:p-8
        rounded-3xl
        bg-white/90 backdrop-blur-xl
        shadow-xl hover:shadow-2xl
        border border-gray-100
        transition-all duration-300
      "
    >

      <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl">
        {product?.productName}
      </h1>

      <div className="flex flex-wrap gap-3 text-sm">

        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700">
          {product?.category}
        </span>

        <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700">
          {product?.brand}
        </span>

      </div>

      <h2 className="
        text-3xl sm:text-4xl font-black
        bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600
        bg-clip-text text-transparent
      ">
        ₹ {product?.productPrise}
      </h2>

      <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">
        {product?.productDesc}
      </p>

      <div className="flex gap-4 items-center">
        <span className="font-semibold">Quantity</span>

        <Input
          type="number"
          min="1"
          defaultValue={1}
          className="w-24 text-center rounded-xl"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">

        <Button
          onClick={() => addToCart(product._id)}
          className="
            bg-gradient-to-r from-pink-600 to-purple-600
            hover:from-purple-600 hover:to-pink-600
            rounded-2xl px-8 py-3
            hover:scale-105 transition
          "
        >
          Add To Cart
        </Button>

        <Button variant="outline" className="rounded-2xl px-8 py-3">
          Buy Now
        </Button>

      </div>

    </div>

  );
};




export default ProductDesc
