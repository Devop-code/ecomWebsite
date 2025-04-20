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
    <div className="border p-4 rounded">
        <Link to={`/product/${id}`}>
        <img src={image} alt={title} className="w-full h-32 object-cover mb-2"/>
        <h2 className=" font-bold">{title}</h2>
        <p className="text-gray-600">${price}</p>
        </Link>
    </div>
      )
}       
