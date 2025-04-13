// src/components/PopularCarsPage.tsx
import React from 'react';
import CarCard from './CarCard';
import { useCars } from '../context/CarContext';
import LoadingSpinner from './ui/LoadingSpinner';

const PopularCarsPage: React.FC = () => {
  const { popularCars, loading, error } = useCars();

  if (loading) {
    return (
      <div className="container mx-auto py-16 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-50 py-3 px-4 rounded-lg text-center mb-6">
          <span className="text-red-500">Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-blue-50 py-3 px-4 rounded-lg text-center mb-6">
        <span className="text-blue-500">POPULAR RENTAL DEALS</span>
      </div>
      <h2 className="text-2xl font-bold text-center mb-8">Most popular cars rental deals</h2>
      {popularCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No cars available at the moment</p>
        </div>
      )}
    </div>
  );
};

export default PopularCarsPage;