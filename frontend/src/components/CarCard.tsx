// pages/PopularCarsPage.tsx
import React from 'react';
import { FaStar, FaUsers, FaCar, FaSnowflake, FaDoorOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface CarCardProps {
  id: string;
  name: string;
  images: string[];
  rating: number;
  reviewCount: number;
  passengers: number;
  transmission: string;
  airConditioning: boolean;
  doors: number;
  price: number;
}

const CarCard: React.FC<CarCardProps> = ({
  id,
  name,
  images,
  rating,
  reviewCount,
  passengers,
  transmission,
  airConditioning,
  doors,
  price,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={images[0]} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        <div className="flex items-center mb-3">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="font-bold mr-1">{rating}</span>
          <span className="text-gray-500 text-sm">({reviewCount} reviews)</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center">
            <FaUsers className="text-gray-500 mr-2" />
            <span>{passengers} Passengers</span>
          </div>
          <div className="flex items-center">
            <FaCar className="text-gray-500 mr-2" />
            <span>{transmission}</span>
          </div>
          <div className="flex items-center">
            <FaSnowflake className="text-gray-500 mr-2" />
            <span>Air Conditioning</span>
          </div>
          <div className="flex items-center">
            <FaDoorOpen className="text-gray-500 mr-2" />
            <span>{doors} Doors</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-bold">${price}<span className="text-gray-500 text-sm">/day</span></p>
          </div>
          <Link
            to={`/rent/${id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 transition"
          >
            Rent Now <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CarCard;