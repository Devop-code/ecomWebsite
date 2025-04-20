import { Link } from "react-router-dom"
import React from 'react'

interface BookCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

export const BookCard: React.FC<BookCardProps> = ({ id, title, price, image }) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link to={`/product/${id}`} className="block h-full">
        <div className="aspect-w-4 aspect-h-3 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 space-y-2">
          <h2 className="text-gray-900 font-semibold text-sm sm:text-base line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h2>
          <p className="text-blue-600 font-bold">
            ${price.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  )
}       
