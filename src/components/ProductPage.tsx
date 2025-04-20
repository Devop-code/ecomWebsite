import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  thumbnail: string;
  rating: number;
}

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => setProduct(response.data))
        .catch((error) => {
          console.error(`error fetching product data ${error}`);
        });
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-blue-200 rounded-full"></div>
          <div className="text-gray-500 text-lg">Loading product details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 px-4 py-2 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
      >
        <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
        <span>Back to products</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:flex-shrink-0 md:w-1/2">
            <img 
              src={product.images[0]} 
              alt={product.title} 
              className="w-full h-[400px] object-cover object-center"
            />
          </div>

          {/* Content Section */}
          <div className="p-8 md:w-1/2 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.title}</h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-600">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
            </div>

            <div className="prose prose-sm text-gray-600">
              <p className="leading-relaxed">{product.description}</p>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Additional Images */}
        {product.images.length > 1 && (
          <div className="p-8 border-t border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">More Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {product.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} - Image ${index + 2}`}
                  className="w-full h-32 object-cover rounded-lg hover:opacity-75 transition-opacity duration-200 cursor-pointer"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
