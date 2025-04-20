import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.log("error fetching product", error);
      }
    };
    fetchCategories();
  }, []);
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };
  const handleCategoriesChange =(category: string) =>{
    setSelectedCategory(category)
  }
  const handleKeywordClik =(keyword : string)=>{
   setKeyword(keyword)
  } 
  const handleResetFilter = ()=>{
    setSearchQuery('')
    setSelectedCategory('')
    setMinPrice(undefined)
    setMaxPrice(undefined)
    setKeyword("")
  }
  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">React store</h1>
      <section>
        <input
          type="text"
          className="border-1 rounded px-2 sm:mb-0 mb-2 w-full"
          placeholder="search products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex justify-center items-center">
          <input
            type="text"
            className="border-1 px-5 mr-2 py-3 mb-3 w-full"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="text"
            className="border-1 px-5 mr-2 py-3 mb-3 w-full"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>
        {/* categories search */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
          {categories.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                className="mr-2"
                onChange={()=>handleCategoriesChange(category)}
                checked = {selectedCategory === category}
              />
              <span>{category.toUpperCase()}</span>
            </label>
          ))}
        </div>

        {/* keywords search */}
        <section>
          <div className="mb-5 mt-4">
            <h2 className="text-xl font-semibold mb-3">Keywords</h2>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={()=>handleKeywordClik(keyword)}
                className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200 cursor-pointer"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={handleResetFilter} className="w-full mb-[4rem] py-2 bg-black text-white cursor-pointer">
            Reset filter
          </button>
        </section>
      </section>
    </div>
  );
};

export default Sidebar;
