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
  setPriseRange,
}) => {

  const handleCategory = (val) => {
    setCategory(val);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= priseRange[1]) {
      setPriseRange([value, priseRange[1]]);
    }
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= priseRange[0]) {
      setPriseRange([priseRange[0], value]);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriseRange([0, 999999]);
  };
  // console.log("ALL PRODUCTS 👉", allProduct);

  const catogories = allProduct.map((p) => p.category);
  const uniqueCategory = ["All", ...new Set(catogories)];
  // console.log(uniqueCategory);
  const brands = allProduct.map((p) => p.brand);
  const uniqueBrands = ["All", ...new Set(brands)];
  // console.log("BRANDS 👉", uniqueBrands);

  return (
      <div className="bg-gray-200 mt-10 pt-4 rounded-md h-max hidden md:block w-64">
        {/* search */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
        />
        {/* category */}
        <h1 className="mt-5 font-semibold text-xl">Category</h1>
        <div className="flex flex-col gap-2 mt-3">
          {uniqueCategory.map((item, index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                <input type="radio" name="category"  chacked={category===item}
                onChange={()=>handleCategory(item)}/>
                <label htmlFor="">{item}</label>
              </div>
            );
          })}
        </div>
        {/* brand */}
        <h1 className="mt-5 font-semibold text-xl">Brands</h1>
        <select className="bg-white w-full p-2 border-e-gray-200 border-2
        rounded-md" value={brand} onChange={handleBrandChange}>
          {uniqueBrands.map((item, index) => {
            return <option key={index}value={item}>{item.toUpperCase()} </option>;
          })}
        </select>
        {/* Prise range */}
        <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
        <div className="flex flex-col">
          <label>
            Price Range:₹{priseRange[0]}-₹{priseRange[1]}
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min="0"
              max="999999"
              value={priseRange[0]}
              onChange={handleMinChange}
              className="w-20 p-1 border border-gray-300 rounded"
            />
            <span>-</span>
            <input
              type="number"
              min="0"
              max="999999"
              value={priseRange[1]}
              onChange={handleMaxChange}
              className="w-20 p-1 border border-gray-300 rounded"
            />
          </div>
          <input
            type="range"
            min="0"
            max="999999"
            step="100"
            className="w-full"
            value={priseRange[0]}
            onChange={handleMinChange}
          />
          <input
            type="range"
            min="0"
            max="999999"
            step="100"
            className="w-full"
            value={priseRange[1]}
            onChange={handleMaxChange}
          />
        </div>
        {/* reset button */}
        <Button onClick={resetFilters} className="bg-pink-600 text-white mt-5 cursor-pointer w-full">
          Reset Filters
        </Button>
      </div>
  );
};

export default FilterSidebar;
