// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaCalendarAlt, FaMapMarkerAlt, FaStar, FaUsers, FaSuitcase, FaTachometerAlt, FaGasPump, FaCheck } from 'react-icons/fa';
// import { useCars } from '../context/CarContext';

// const RentalDetailsPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [carData, setCarData] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [mainImage, setMainImage] = useState<string>('');
//   const [startDate, setStartDate] = useState<string>('');
//   const [endDate, setEndDate] = useState<string>('');
//   const navigate = useNavigate();
//   const { popularCars } = useCars();


//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const car = popularCars.find((car) => car.id === id);
//         if (car) {
//           setCarData(car);
//           setMainImage(car.images[0]);
//         } else {
//           setCarData(null);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching car details:', error);
//         setLoading(false);
//       }
//     };

//     fetchCar();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="container mx-auto p-4 flex justify-center items-center h-64">
//         <p className="text-xl">Loading car details...</p>
//       </div>
//     );
//   }

//   if (!carData) {
//     return (
//       <div className="container mx-auto p-4">
//         <p className="text-xl text-red-500">Car not found</p>
//       </div>
//     );
//   }

//   const handleImageClick = (image: string) => {
//     setMainImage(image);
//   };

//   const calculateTotalPrice = () => {
//     if (!startDate || !endDate) return 0;

//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const diffTime = Math.abs(end.getTime() - start.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     return carData.price * diffDays;
//   };

//   const handleBack = () => {
//     navigate(-1); // Go back to previous page
//   };
//   return (
//     <div className="container mx-auto px-4 py-6 max-w-6xl">
//       {/* Breadcrumbs */}
//       <div className="text-sm mb-4 overflow-x-auto whitespace-nowrap">
//         <span className="text-blue-500 cursor-pointer" onClick={handleBack}>Home</span> &gt; <span onClick={handleBack} className="text-blue-500 cursor-pointer">Cars</span> &gt; <span className="font-medium">{carData.name}</span>
//       </div>

//       {/* Car Title and Basic Info */}
//       <div className="mb-6">
//         <div className="flex flex-col md:flex-row justify-between items-start">
//           <div className="mb-3 md:mb-0">
//             <h1 className="text-2xl md:text-3xl font-bold">{carData.name}</h1>
//             <div className="flex flex-wrap items-center mt-2 gap-2 md:gap-4">
//               <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{carData.type}</span>
//               <div className="flex items-center">
//                 <FaStar className="w-4 h-4 text-yellow-500" />
//                 <span className="ml-1 font-medium">{carData.rating}</span>
//                 <span className="ml-1 text-gray-500">({carData.reviews} reviews)</span>
//               </div>
//               <div className="flex items-center">
//                 <FaMapMarkerAlt className="w-4 h-4 text-gray-500" />
//                 <span className="ml-1 text-gray-500">{carData.location}</span>
//               </div>
//             </div>
//           </div>
//           <div className="text-left md:text-right">
//             <div className="text-2xl font-bold">${carData.price}<span className="text-sm font-normal">/day</span></div>
//           </div>
//         </div>
//       </div>

//       {/* Image Gallery */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <div className="  sticky top-16 md:col-span-2 rounded-lg  h-64 sm:h-72 md:h-96">
//           <img src={mainImage} alt={carData.name} className="w-full h-full object-cover" />
//         </div>
//         <div className="grid grid-cols-3 md:grid-cols-1 md:grid-rows-3 gap-2 bg-blue-200 rounded-sm p-2">
//           {carData.images.slice(0, 3).map((image: string, index: number) => (
//             <div
//               key={index}
//               className="rounded-lg overflow-hidden cursor-pointer h-20 sm:h-44 md:h-52"
//               onClick={() => handleImageClick(image)}
//             >
//               <img src={image} alt={`${carData.name} view ${index + 1}`} className="w-full h-full object-cover" />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column - Car Details */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Description */}
//           <div>
//             <h2 className="text-xl font-bold mb-2">Description</h2>
//             <p className="text-gray-700">{carData.description}</p>
//           </div>

//           {/* Specifications */}
//           <div>
//             <h2 className="text-xl font-bold mb-4">Specifications</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               <div className="flex items-center space-x-2">
//                 <FaUsers className="w-6 h-6 text-blue-600" />
//                 <div>
//                   <p className="text-gray-500 text-sm">Passengers</p>
//                   <p className="font-medium">{carData.specs.passengers}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <FaSuitcase className="w-6 h-6 text-blue-600" />
//                 <div>
//                   <p className="text-gray-500 text-sm">Luggage</p>
//                   <p className="font-medium">{carData.specs.luggage}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <FaTachometerAlt className="w-6 h-6 text-blue-600" />
//                 <div>
//                   <p className="text-gray-500 text-sm">Range</p>
//                   <p className="font-medium">{carData.specs.range}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <FaGasPump className="w-6 h-6 text-blue-600" />
//                 <div>
//                   <p className="text-gray-500 text-sm">Fuel Type</p>
//                   <p className="font-medium">{carData.specs.fuelType}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Features */}
//           <div>
//             <h2 className="text-xl font-bold mb-4">Features</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3">
//               {carData.features.map((feature: string, index: number) => (
//                 <div key={index} className="flex items-center">
//                   <FaCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
//                   <span className="text-sm sm:text-base">{feature}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Owner */}
//           <div>
//             <h2 className="text-xl font-bold mb-4">About the Owner</h2>
//             <div className="flex items-start space-x-4">
//               <img
//                 src={carData.owner.image}
//                 alt={`${carData.owner.name}`}
//                 className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
//               />
//               <div>
//                 <h3 className="font-bold text-lg">{carData.owner.name}</h3>
//                 <p className="text-gray-600 text-sm">Member since {carData.owner.joined}</p>
//                 <div className="mt-2 space-y-1">
//                   <p className="text-sm sm:text-base"><span className="font-medium">Response rate:</span> {carData.owner.responseRate}</p>
//                   <p className="text-sm sm:text-base"><span className="font-medium">Response time:</span> {carData.owner.responseTime}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Availability Calendar would go here */}
//           <div>
//             <h2 className="text-xl font-bold mb-4">Availability</h2>
//             <div className="bg-gray-100 p-4 rounded-lg">
//               <p className="text-gray-700 mb-2">This car is available during these periods:</p>
//               <ul className="space-y-1">
//                 {carData.availableDates.map((period: any, index: number) => (
//                   <li key={index} className="flex items-center">
//                     <FaCalendarAlt className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
//                     <span className="text-sm sm:text-base">{period.start} to {period.end}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Booking */}
//         <div className="lg:col-span-1 mt-6 lg:mt-0">
//           <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg lg:sticky lg:top-4">
//             <h2 className="text-xl font-bold mb-4">Book this car</h2>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-1">Pick-up Date</label>
//               <input
//                 type="date"
//                 className="w-full p-2 border rounded-md"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-1">Return Date</label>
//               <input
//                 type="date"
//                 className="w-full p-2 border rounded-md"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//             </div>

//             <div className="border-t border-b py-4 my-4">
//               <div className="flex justify-between mb-2">
//                 <span className="text-gray-700">${carData.price} × {startDate && endDate ? Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))) : 0} days</span>
//                 <span>${calculateTotalPrice()}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span className="text-gray-700">Service fee</span>
//                 <span>${Math.round(calculateTotalPrice() * 0.1)}</span>
//               </div>
//             </div>

//             <div className="flex justify-between font-bold text-lg mb-6">
//               <span>Total</span>
//               <span>${calculateTotalPrice() + Math.round(calculateTotalPrice() * 0.1)}</span>
//             </div>

//             <button
//               className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
//               disabled={!startDate || !endDate}
//             >
//               Reserve Now
//             </button>

//             <p className="text-center text-gray-500 text-sm mt-4">You won't be charged yet</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RentalDetailsPage;

// src/pages/CarDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaUsers, FaCar, FaSnowflake, FaDoorOpen, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import { useCars } from '../context/CarContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import axios from 'axios';
import { Car } from '../context/CarContext';

const RentalDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cars, loading: carsLoading } = useCars();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  // Attempt to get car from context first, then fetch from API if not available
  useEffect(() => {
    const fetchCarData = async () => {
      setLoading(true);
      // Try to find car in context
      const cachedCar = cars.find(c => c.id === id);
      
      if (cachedCar) {
        setCar(cachedCar);
        setLoading(false);
      } else {
        // Fetch from API if not in context
        try {
          const response = await axios.get(`/api/cars/${id}`);
          if (response.data.success) {
            setCar(response.data.data);
          } else {
            setError('Failed to fetch car details');
          }
        } catch (err: any) {
          setError(err.message || 'Failed to fetch car details');
          console.error('Error fetching car details:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    if (!carsLoading && id) {
      fetchCarData();
    }
  }, [id, cars, carsLoading]);

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
              <img 
                src={car.images[selectedImage]} 
                alt={car.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            {car.images.length > 1 && (
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
              <span className="font-bold mr-1">{car.rating}</span>
              <span className="text-gray-500 text-sm">({car.reviewCount} reviews)</span>
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
              to={`/booking/${car.id}`}
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
              <span className="font-medium">{car.specs.passengers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Luggage</span>
              <span className="font-medium">{car.specs.luggage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Range</span>
              <span className="font-medium">{car.specs.range}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fuel Type</span>
              <span className="font-medium">{car.specs.fuelType}</span>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Features</h2>
          <ul className="grid grid-cols-2 gap-y-2">
            {car.features.map((feature, index) => (
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
    </div>
  );
};

export default RentalDetailsPage;