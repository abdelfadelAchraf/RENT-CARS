import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export type Car = {
  _id: string
  id: string
  name: string;
  images: string[];
  rating: number;
  type: string;
  location: string;
  reviewCount: number;
  passengers: number;
  transmission: string;
  airConditioning: boolean;
  doors: number;
  price: number;
  category: string;
  description: string;
  features: string[];
  specs: {
    passengers: number;
    luggage: number;
    range: string;
    fuelType: string;
  };
  owner: string;
  isAvailable: boolean;
  availableDates: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Define the context type
interface CarContextType {
  cars: Car[];
  popularCars: Car[];
  loading: boolean;
  error: string | null;
  fetchCars: () => Promise<void>;
  getCar: (id: string) => Car | undefined;
}

// Create context with default values
const CarContext = createContext<CarContextType>({
  cars: [],
  popularCars: [],
  loading: false,
  error: null,
  fetchCars: async () => {},
  getCar: () => undefined,
});

// Create provider component
interface CarProviderProps {
  children: ReactNode;
}

export const CarProvider: React.FC<CarProviderProps> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [popularCars, setPopularCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cars from API
  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/cars');
      if (response.data.success) {
        setCars(response.data.data);
        console.log(cars)
        
        // Sort by review count to get popular cars
        const sortedByPopularity = [...response.data.data].sort(
          (a, b) => b.reviewCount - a.reviewCount
        );
        setPopularCars(sortedByPopularity.slice(0, 4));
      } else {
        setError('Failed to fetch cars');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch cars');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get a single car by ID
  const getCar = (id: string): Car | undefined => {
    return cars.find((car) => car.id === id);
  };

  // Fetch cars on component mount
  useEffect(() => {
    fetchCars();
  }, []);

  const value = {
    cars,
    popularCars,
    loading,
    error,
    fetchCars,
    getCar,
  };

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
};

// Custom hook to use the car context
export const useCars = () => useContext(CarContext);