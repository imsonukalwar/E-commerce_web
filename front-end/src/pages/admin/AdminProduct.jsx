import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Loader2, Search, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { setProducts } from "@/redux/ProductSlice";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useEffect } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";



const AdminProduct = () => {
  const { products } = useSelector((store) => store.product);
  const [edietProduct, setEdietProduct] = useState({
    productImage: [],
  });
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const image = edietProduct.productImage || [];
  const [open, setOpen] = useState(false);
  const [search,setSearch]=useState("")
  const [sortorder,setSortOrder]=useState("")
  const nevigate=useNavigate()
    const [loading,setloading]=useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setEdietProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesave = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("productName", edietProduct.productName);
    formData.append("productPrise", edietProduct.productPrise);
    formData.append("productDesc", edietProduct.productDesc);
    formData.append("brand", edietProduct.brand);
    formData.append("category", edietProduct.category);

    const existingImage = image
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(existingImage));

    image
      .filter((img) => img instanceof File)
      .forEach((file) => {
        formData.append("files", file);
      });

    try {
      setloading(true)
      const res = await axios.put(
        `${import.meta.env.VITE_URL}/product/update/${edietProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success("product Updated Success");
        const updateProducts = products.map((p) =>
          p._id === edietProduct._id ? res.data.product : p,
        );
        dispatch(setProducts(updateProducts));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setloading(false)
    }
  };

  const deleteproducthandler = async (productId) => {
    try {
      const remainingProduct = products.filter(
        (product) => product._id !== productId,
      );
      const res = await axios.delete(
        `${import.meta.env.VITE_URL}/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setProducts(remainingProduct));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const query = search.toLowerCase();
  let filterProduct = products.filter((product) =>
    product?.productName?.toLowerCase().includes(query) ||
    product?.brand?.toLowerCase().includes(query) ||
    product?.category?.toLowerCase().includes(query)
  );

  if(sortorder==='lowToHigh'){
    filterProduct=[...filterProduct].sort((a,b)=> a.productPrise-b.productPrise)
  }
  if(sortorder==='highToLow'){
    filterProduct=[...filterProduct].sort((a,b)=> b.productPrise-a.productPrise)
  }

  useEffect(() => {
    console.log("UPDATED EDIT PRODUCT:", edietProduct);
  }, [edietProduct]);

return (

<div
  className="
    h-[calc(100vh-64px)]
    flex flex-col
    overflow-hidden
    bg-gradient-to-br from-slate-100 via-pink-50 to-purple-100
  "
>

{/* ================= TOP BAR ================= */}
<div
  className="
    sticky top-0.5 z-40
    mt-16
    bg-white/70 backdrop-blur-xl
    py-4 px-4 sm:px-6
    shadow-md
    flex flex-col md:flex-row
    gap-4 md:items-center md:justify-between
  "
>

  {/* SEARCH */}
  <div className="relative w-full md:w-[420px]">
    <Input
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      placeholder="Search product..."
      className="w-full rounded-xl pl-10"
    />
    <Search className="absolute top-3 left-3 text-gray-400"/>
  </div>

  {/* SORT */}
  <Select onValueChange={(value)=>setSortOrder(value)}>
    <SelectTrigger className="w-full md:w-[200px] bg-white rounded-xl">
      <SelectValue placeholder="Sort by price"/>
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
      <SelectItem value="highToLow">Price: High to Low</SelectItem>
    </SelectContent>
  </Select>

</div>

{/* ================= SCROLL AREA ================= */}
<div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">

<div className="grid gap-4">

{filterProduct.map((product,index)=>(

<Card
  key={index}
  className="
    px-6 py-4
    rounded-2xl
    shadow-lg hover:shadow-2xl
    transition-all duration-300
    bg-white/80 backdrop-blur
  "
>

<div
  className="
    flex flex-col md:flex-row
    md:items-center md:justify-between
    gap-4
  "
>

{/* LEFT */}
<div className="flex gap-4 items-center">

<img
  onClick={() => nevigate(`/product/${product._id}`)}
  src={product.productImage[0].url}
  alt=""
  className="
    w-20 h-20 sm:w-24 sm:h-24
    object-cover rounded-xl border
    cursor-pointer
  "
/>

<div>
<h1 className="font-bold text-gray-800 max-w-[260px] sm:max-w-[380px] line-clamp-2">
  {product.productName}
</h1>

<p className="text-sm text-gray-500">
  {product.brand} • {product.category}
</p>
</div>

</div>

{/* PRICE */}
<h1
  className="
    font-extrabold text-lg
    bg-gradient-to-r from-pink-600 to-purple-600
    bg-clip-text text-transparent
  "
>
₹{product.productPrise}
</h1>

{/* ACTIONS */}
<div className="flex gap-4">

{/* EDIT */}
<Dialog open={open} onOpenChange={setOpen}>
<DialogTrigger asChild>
<Edit
  className="text-green-500 cursor-pointer hover:scale-110 transition"
  onClick={()=>{
    setOpen(true)
    setEdietProduct(product)
  }}
/>
</DialogTrigger>

<DialogContent
  className="
    sm:max-w-[650px]
    max-h-[85vh]
    overflow-y-auto
    rounded-2xl
  "
>

<DialogHeader>
<DialogTitle>Edit Product</DialogTitle>
<DialogDescription>
Make changes and save.
</DialogDescription>
</DialogHeader>

<div className="flex flex-col gap-3">
<Input name="productName" value={edietProduct.productName||""} onChange={handlechange}/>
<Input name="productPrise" type="number" value={edietProduct.productPrise||""} onChange={handlechange}/>
<Input name="brand" value={edietProduct.brand||""} onChange={handlechange}/>
<Input name="category" value={edietProduct.category||""} onChange={handlechange}/>
<Textarea name="productDesc" value={edietProduct.productDesc||""} onChange={handlechange}/>
<ImageUpload productData={edietProduct} setProductData={setEdietProduct}/>
</div>

<DialogFooter>
<DialogClose asChild>
<Button variant="outline">Cancel</Button>
</DialogClose>

<Button onClick={handlesave}>
{loading ? (
<span className="flex items-center gap-2">
<Loader2 className="animate-spin"/>
Saving
</span>
) : "Update Product"}
</Button>
</DialogFooter>

</DialogContent>
</Dialog>

{/* DELETE */}
<AlertDialog>
<AlertDialogTrigger asChild>
<Trash2 className="text-red-500 cursor-pointer hover:scale-110 transition"/>
</AlertDialogTrigger>

<AlertDialogContent>
<AlertDialogHeader>
<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
<AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
</AlertDialogHeader>

<AlertDialogFooter>
<AlertDialogCancel>Cancel</AlertDialogCancel>
<AlertDialogAction onClick={()=>deleteproducthandler(product._id)}>
Continue
</AlertDialogAction>
</AlertDialogFooter>
</AlertDialogContent>
</AlertDialog>

</div>

</div>

</Card>

))}

</div>
</div>

</div>

);



};


















export default AdminProduct;
