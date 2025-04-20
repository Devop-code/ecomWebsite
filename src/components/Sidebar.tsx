import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { Menu, X } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-white transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } p-5 overflow-y-auto shadow-lg`}
      >
      <h1 className="text-2xl font-bold mb-8 mt-4 text-gray-800 border-b pb-4">React store</h1>
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-gray-600">Search</h2>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-medium text-gray-600">Price Range</h2>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              placeholder="Min"
              value={minPrice ?? ""}
              onChange={handleMinPriceChange}
            />
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              placeholder="Max"
              value={maxPrice ?? ""}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>

        {/* categories search */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-gray-600">Categories</h2>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {categories.map((category, index) => (
              <label key={index} className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  onChange={() => handleCategoriesChange(category)}
                  checked={selectedCategory === category}
                />
                <span className="ml-2 text-sm text-gray-700">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* keywords search */}
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-gray-600">Keywords</h2>
          <div className="space-y-2">
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClik(keyword)}
                className="w-full px-4 py-2 text-left text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-gray-300"
              >
                {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
              </button>
            ))}
          </div>
          <button 
            onClick={handleResetFilter} 
            className="w-full py-2.5 mt-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            Reset Filters
          </button>
        </section>
      </section>
    </aside>
    </>
  );
};

export default Sidebar;
