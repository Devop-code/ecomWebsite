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
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="border px-4 py-2 rounded-full flex items-center cursor-pointer">
              <Tally3 className="mr-2" />
              {filter === "all"
                ? "filter"
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>
            {dropdownOpen && (
              <div className="absolute bg-white border-gray-300 rounded mt-2 w-full sm:w-40">
                <button
                  onClick={() => setFilter("cheap")}
                  className="px-4 block py-2 w-full text-left hover:bg-gray-100"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="px-4 block py-2 w-full text-left hover:bg-gray-100"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className="px-4 block py-2 w-full text-left hover:bg-gray-100"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {/* BookCard */}
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
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border px-4 py-2 rounded-full flex items-center cursor-pointer"
          >
            Previous
          </button>
          <div className="flex flex-wrap justify-center">
            {/* pagination numbers */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={` px-4 py-2 rounded-full flex items-center cursor-pointer ${
                  currentPage === index + 1 ? "bg-black text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border px-4 py-2 rounded-full flex items-center cursor-pointer"
            >
              Next
            </button>
        </div>
        {/* previous  */}
      </div>
    </section>
  );
};
