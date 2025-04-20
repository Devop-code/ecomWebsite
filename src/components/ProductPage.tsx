import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    return <h1>Loading....</h1>;
  }
  return (
    <div className="p-5 w-[60%]">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-black text-white"
      >Back</button>
      <img src={product.images[0] } alt={product.title} className="w-full h-96 object-cover rounded-lg mb-5" />
      <h1 className="text-2xl font-bold mb-5">{product.title}</h1>
      <p className="text-gray-600 mb-5">{product.description}</p>
      <div className="flex">
      <p className="text-gray-600 mb-5">Price: ${product.price}</p>
      <p className="ml-10 text-gray-600 mb-5">Rating: {product.rating}</p>
      </div>
      
    </div>
  );
};
