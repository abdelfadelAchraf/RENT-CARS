// pages/RentalDealsPage.tsx
import React, { useState } from 'react';
import { FaStar, FaUsers, FaCar, FaSnowflake, FaDoorOpen, FaFilter, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AllCars } from '../assets/constants';

interface Car {
  id: string;
  name: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  passengers: number;
  transmission: string;
  airConditioning: boolean;
  doors: number;
  price: number;
}

const CarCard: React.FC<Car> = ({
  id,
  name,
  images,
  rating,
  reviewCount,
  passengers,
  transmission,
  // airConditioning,
  doors,
  price,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/3 scale-75">
        <img src={images[0]} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 md:w-2/3 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="font-bold mr-1">{rating}</span>
            <span className="text-gray-500 text-sm">({reviewCount} reviews)</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
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
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-bold text-xl">${price}<span className="text-gray-500 text-sm">/day</span></p>
          </div>
          <Link
            to={`/rent/${id}`}
            className="bg-blue-500 text-white px-6 py-3 rounded flex items-center hover:bg-blue-600 transition"
          >
            Rent Now <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const RentalDealsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');


  const categories = ['All', 'Luxury', 'Sports', 'SUV', 'Sedan', 'Economy'];

  const filteredCars = AllCars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || car.category === selectedCategory;

    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Rental Deals</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8  ">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaFilter className="mr-2" /> Filters
            </h2>

            <div className="mb-6">
              <div className="mb-2 flex items-center">
                <FaSearch className="mr-2 text-gray-500" />
                <label className="font-medium">Search</label>
              </div>
              <input
                type="text"
                placeholder="Search cars..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="radio"
                      id={category}
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="mr-2"
                    />
                    <label htmlFor={category}>{category}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="flex justify-between mb-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>

            <button
              onClick={() => {
                setSearchTerm('');
                setPriceRange([0, 100]);
                setSelectedCategory('');
              }}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">{filteredCars.length} cars found</p>
            <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div className="space-y-6 ">
            {filteredCars.map((car) => (
              <CarCard key={car.id} {...car} />
            ))}

            {filteredCars.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600">No cars found matching your criteria. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalDealsPage;