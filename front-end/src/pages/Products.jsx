import FilterSidebar from "@/components/FilterSidebar";
// import { Select } from "@/components/ui/select";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";

const Products = () => {
  const { products } = useSelector((store) => store.product);
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search,setSearch]=useState("")
  const [category,setCategory]=useState('All')
    const [brand,setBrand]=useState('All')
  const [priseRange, setPriseRange] = useState([0, 999999]);
  const [sortOrder,setSortOrder]=useState('')
  const dispatch = useDispatch();

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8000/product/getAllproducts",
      );
      // console.log("API RESPONSE 👉", res.data);
      if (res.data.success) {
        setAllProduct(res.data.products);
        dispatch(setProducts(res.data.products));
      }
      // console.log("PRODUCTS PAGE STATE 👉", allProduct);
    } catch (error) {
      console.log(error);
      toast.message(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    if(allProduct.length===0)return;
    let filtered=[...allProduct]
    if(search.trim()!=""){
      filtered=filtered.filter(p=>p.productName?.toLowerCase().includes(search.toLowerCase()))
    }
    if(category!=="All"){
      filtered=filtered.filter(p=>p.category===category)
    }
    if(brand!=="All"){
      filtered=filtered.filter(p=>p.brand===brand)
    }

    filtered=filtered.filter(p=>p.productPrise>=priseRange[0] && p.productPrise <= priseRange[1])

    if(sortOrder==="lowToHigh"){
      filtered.sort((a,b)=>a.productPrise-b.productPrise)
    }else if(sortOrder==="highToLow"){
      filtered.sort((a,b)=>b.productPrise-a.productPrise)
    }
    dispatch(setProducts(filtered))
  },[search,category,brand,sortOrder,priseRange,allProduct,dispatch])
  useEffect(() => {
    getAllProduct();
  }, []);
  // console.log(allProduct);

  return (
    <div className="pt-20 pb-10">
      <div className="max-w-7xl mx-auto flex gap-9">
        {/* filterSidebar */}
        <FilterSidebar allProduct={allProduct} 
        priseRange={priseRange}
        searsh={search}
        setSearch={setSearch}
        brand={brand}
        setBrand={setBrand}
        category={category}
        setCategory={setCategory}
        setPriseRange={setPriseRange}
        />
        {/* main product section */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-end mb-4">
            <Select onValueChange={(value)=>setSortOrder(value)}>
              <SelectTrigger className="w-full max-w-50">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="lowToHigh">Price Low to High</SelectItem>
                  <SelectItem value="highToLow">Price High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                loading={loading}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
