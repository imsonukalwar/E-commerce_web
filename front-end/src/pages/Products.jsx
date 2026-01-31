
import FilterSidebar from "@/components/FilterSidebar";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";




const Products = () => {

  const { products = [] } = useSelector(store => store.product);

  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priseRange, setPriseRange] = useState([0,999999]);
  const [sortOrder, setSortOrder] = useState("");

  const dispatch = useDispatch();

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8000/product/getAllproducts"
      );
      if (res.data.success) {
        setAllProduct(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.message(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    let filtered = [...allProduct];

    if (search) {
      filtered = filtered.filter((p) =>
        p?.productName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((p) => p?.category === category);
    }

    if (brand !== "All") {
      filtered = filtered.filter((p) => p?.brand === brand);
    }

    filtered = filtered.filter(
      (p) =>
        p?.productPrise >= priseRange[0] &&
        p?.productPrise <= priseRange[1]
    );

    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.productPrise - b.productPrise);
    }

    if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.productPrise - a.productPrise);
    }

    dispatch(setProducts(filtered));

  }, [search, category, brand, priseRange, sortOrder, allProduct]);

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">

      {/* SIDEBAR */}
      <FilterSidebar
        allProduct={allProduct}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        brand={brand}
        setBrand={setBrand}
        priseRange={priseRange}
        setPriseRange={setPriseRange}
      />

      {/* RIGHT SIDE */}
      <div className="lg:ml-[300px] px-3 sm:px-6 lg:px-10">

        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">

          {/* MOBILE SEARCH */}
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="
              lg:hidden
              w-full
              p-3
              rounded-xl
              border
              focus:ring-2 focus:ring-pink-400
              outline-none
            "
          />

          {/* SORT */}
          <Select onValueChange={(v)=>setSortOrder(v)}>
            <SelectTrigger className="w-full md:w-[220px] rounded-xl">
              <SelectValue placeholder="Sort by Price"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lowToHigh">Low → High</SelectItem>
              <SelectItem value="highToLow">High → Low</SelectItem>
            </SelectContent>
          </Select>

        </div>

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-4 sm:gap-6
          "
        >

          {products
            ?.filter(p => p && p._id)
            ?.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                loading={loading}
              />
            ))}

        </div>

      </div>
    </div>
  );
};





export default Products;
