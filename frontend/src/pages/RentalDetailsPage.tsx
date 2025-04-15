import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaUsers, FaCar, FaSnowflake, FaDoorOpen, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import { useCars, Car } from '../context/CarContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const RentalDetailsPage: React.FC = () => {
  // Use the same parameter name that's defined in your route configuration
  const { id } = useParams<{ id: string }>();
  const { cars, loading: carsLoading, getCar } = useCars();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    console.log(id)
    const fetchCarData = async () => {
      setLoading(true);
      if (!id) {
        setError('Invalid car ID');
        setLoading(false);
        return;
      }
      
      try {
        // Make sure the ID is clean by trimming whitespace and newlines
        const cleanId = id.trim();
        
        // Directly fetch car using getCar method from context
        const carData = await getCar(cleanId);
        
        if (carData) {
          setCar(carData);
        } else {
          // If getCar returns null, try to find car in the cars array
          const foundCar = cars.find(c => c._id === cleanId);
          
          if (foundCar) {
            setCar(foundCar);
          } else {
            setError('Car not found');
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch car details');
        console.error('Error fetching car details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!carsLoading && id) {
      fetchCarData();
    }
  }, [id, cars, carsLoading, getCar]);

  if (loading || carsLoading) {
    return (
      <div className="container mx-auto py-16 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-50 py-3 px-4 rounded-lg text-center mb-6">
          <span className="text-red-500">Error: {error || 'Car not found'}</span>
        </div>
        <div className="text-center">
          <Link to="/rental" className="text-blue-500 hover:underline">
            Back to all cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/rental" className="hover:text-blue-500">Rental</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{car.name}</span>
      </div>

      {/* Car Details */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        {/* Image Gallery */}
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3">
            {/* Main Image */}
            <div className="h-96 bg-gray-100">
              {car.images && car.images.length > 0 ? (
                <img 
                  src={car.images[selectedImage]} 
                  alt={car.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {car.images && car.images.length > 1 && (
              <div className="flex p-2 gap-2 overflow-x-auto">
                {car.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`w-20 h-20 flex-shrink-0 cursor-pointer ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${car.name} view ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Car Info */}
          <div className="md:w-1/3 p-6 border-l">
            <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
            <div className="flex items-center mb-4">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-bold mr-1">4.8</span>
              <span className="text-gray-500 text-sm">({car.reviewCount || 0} reviews)</span>
            </div>
            
            <div className="flex items-center text-gray-600 mb-4">
              <FaMapMarkerAlt className="mr-2" />
              <span>{car.location}</span>
            </div>
            
            <div className="border-t border-b py-4 my-4">
              <p className="text-gray-500 text-sm mb-1">Price</p>
              <p className="text-3xl font-bold">${car.price}<span className="text-gray-500 text-base ml-1">/day</span></p>
            </div>
            
            <Link
              to={`/booking/${car._id}`}
              className="bg-blue-500 text-white w-full py-3 rounded-md text-center block font-medium hover:bg-blue-600 transition mb-4"
            >
              Book Now
            </Link>
            
            <button 
              className="border border-gray-300 w-full py-3 rounded-md text-center block font-medium hover:bg-gray-50 transition"
            >
              Contact Owner
            </button>
          </div>
        </div>
      </div>
      
      {/* Details and Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Car Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Car Details</h2>
          <div className="grid grid-cols-2 gap-y-4">
            <div className="flex items-center">
              <FaUsers className="text-gray-500 mr-2" />
              <span>{car.passengers} Passengers</span>
            </div>
            <div className="flex items-center">
              <FaCar className="text-gray-500 mr-2" />
              <span>{car.transmission}</span>
            </div>
            {car.airConditioning && (
              <div className="flex items-center">
                <FaSnowflake className="text-gray-500 mr-2" />
                <span>Air Conditioning</span>
              </div>
            )}
            <div className="flex items-center">
              <FaDoorOpen className="text-gray-500 mr-2" />
              <span>{car.doors} Doors</span>
            </div>
            <div className="flex items-center">
              <FaCheck className="text-gray-500 mr-2" />
              <span>{car.type}</span>
            </div>
            <div className="flex items-center">
              <FaCheck className="text-gray-500 mr-2" />
              <span>{car.category}</span>
            </div>
          </div>
        </div>
        
        {/* Specifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Specifications</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Passengers</span>
              <span className="font-medium">{car.specs?.passengers || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Luggage</span>
              <span className="font-medium">{car.specs?.luggage || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Range</span>
              <span className="font-medium">{car.specs?.range || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fuel Type</span>
              <span className="font-medium">{car.specs?.fuelType || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Features</h2>
          <ul className="grid grid-cols-2 gap-y-2">
            {car.features && car.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <FaCheck className="text-green-500 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Description */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Description</h2>
        <p className="text-gray-700">{car.description}</p>
      </div>
      
      {/* Owner Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">About the Owner</h2>
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
            {car.owner && car.owner.profileImage ? (
              <img 
                src={car.owner.profileImage} 
                alt={car.owner.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xl font-bold">
                {car.owner ? car.owner.name.charAt(0) : 'U'}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg">{car.owner ? car.owner.name : 'Unknown'}</h3>
            {car.owner && car.owner.email && (
              <p className="text-gray-600">{car.owner.email}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Availability Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Availability</h2>
        <div className="mb-4">
          <span className={`px-3 py-1 rounded-full ${car.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {car.isAvailable ? 'Available' : 'Not Available'}
          </span>
        </div>
        
        {car.availableDates && car.availableDates.length > 0 ? (
          <div>
            <h3 className="font-medium mb-2">Available Dates:</h3>
            <ul className="space-y-2">
              {car.availableDates.map((date, index) => (
                <li key={index} className="flex items-center">
                  <span>
                    {new Date(date.start).toLocaleDateString()} - {new Date(date.end).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 italic">No specific availability dates provided</p>
        )}
      </div>
    </div>
  );
};

export default RentalDetailsPage;