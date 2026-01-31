import { Button } from "./ui/button";





const FilterSidebar = ({
  allProduct,
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  priseRange,
  setPriseRange
}) => {

  const categories=["All",...new Set(allProduct.map(p=>p?.category))];
  const brands=["All",...new Set(allProduct.map(p=>p?.brand))];

  return (
    <div className="
      hidden lg:block
      fixed top-24 left-4
      w-[260px]
      bg-white p-6
      rounded-xl shadow-lg
      h-[calc(100vh-120px)]
      overflow-y-auto
    ">

      <input
        value={search}
        onChange={e=>setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full p-2 border rounded mb-4"
      />

      <h3 className="font-semibold mb-2">Category</h3>
      {categories.map((c,i)=>(
        <label key={i} className="flex gap-2 text-sm">
          <input
            type="radio"
            checked={category===c}
            onChange={()=>setCategory(c)}
          />
          {c}
        </label>
      ))}

      <h3 className="font-semibold mt-4 mb-2">Brand</h3>
      <select
        value={brand}
        onChange={e=>setBrand(e.target.value)}
        className="w-full p-2 border rounded"
      >
        {brands.map((b,i)=>(
          <option key={i}>{b}</option>
        ))}
      </select>

      <h3 className="font-semibold mt-4 mb-2">Price Range</h3>

      <div className="flex gap-2">
        <input
          type="number"
          value={priseRange[0]}
          onChange={e=>setPriseRange([+e.target.value,priseRange[1]])}
          className="w-1/2 border p-1 rounded"
        />
        <input
          type="number"
          value={priseRange[1]}
          onChange={e=>setPriseRange([priseRange[0],+e.target.value])}
          className="w-1/2 border p-1 rounded"
        />
      </div>

      <button
        onClick={()=>{
          setSearch("");
          setCategory("All");
          setBrand("All");
          setPriseRange([0,999999]);
        }}
        className="mt-5 w-full bg-pink-600 text-white py-2 rounded"
      >
        Reset Filters
      </button>

    </div>
  )
}











export default FilterSidebar;
