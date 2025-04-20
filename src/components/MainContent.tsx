import  { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { Tally3 } from "lucide-react";
import { BookCard } from "./BookCard";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
}
export const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;
  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
        console.log(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    switch (filter) {
      case "cheap":
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        return filteredProducts;
    }
  };
  const filteredProducts = getFilteredProducts();
  console.log(filteredProducts);
  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const handlePageChange = (page: number) => {
    if (page >= 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-lg p-4 shadow-sm">
          <div className="relative w-full sm:w-auto mb-4 sm:mb-0">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="w-full sm:w-auto px-4 py-2.5 bg-white border border-gray-200 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <Tally3 className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">
                {filter === "all" ? "Sort by" : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </span>
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 mt-2 w-full sm:w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                {[
                  { id: 'cheap', label: 'Price: Low to High' },
                  { id: 'expensive', label: 'Price: High to Low' },
                  { id: 'popular', label: 'Most Popular' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setFilter(option.id);
                      setDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50 transition-colors duration-150"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts?.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.thumbnail}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-lg p-4 shadow-sm">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200 min-w-[100px]"
          >
            <span>Previous</span>
          </button>

          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-lg flex items-center justify-center min-w-[40px] transition-colors duration-200 ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200 min-w-[100px]"
          >
            <span>Next</span>
          </button>
        </div>
      </div>
    </section>
  );
};
