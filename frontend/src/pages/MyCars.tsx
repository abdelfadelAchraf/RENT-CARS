import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus, FiAlertCircle, FiCheck, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCars, Car } from '../context/CarContext'; // Import the actual Car type
import axios from 'axios';

// Update AlertMessage interface if needed
interface AlertMessage {
  type: 'success' | 'error';
  text: string;
}

const MyCars: React.FC = () => {
  const { user } = useAuth(); // Uncomment to get the current user
  const { fetchCars } = useCars(); // Use the car context
  const [userCars, setUserCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null); // Change to string for _id
  const [alertMessage, setAlertMessage] = useState<AlertMessage | null>(null);

  useEffect(() => {
    // Fetch cars owned by the current user
    const fetchUserCars = async (): Promise<void> => {
      try {
        setLoading(true);
        // Updated endpoint to fetch only the current user's cars
        const response = await axios.get('/api/cars/user/mycars');
        
        if (response.data.success) {
          setUserCars(response.data.data);
        } else {
          setError('Failed to load your cars');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load your cars. Please try again later.');
        setLoading(false);
      }
    };

    // Only fetch if user is authenticated
    if (user) {
      fetchUserCars();
    } else {
      setError('You must be logged in to view your cars');
      setLoading(false);
    }
  }, [user]); // Add user as dependency to refetch when user changes

  const handleDeleteCar = async (id: string): Promise<void> => {
    try {
      // Delete the car with the actual API endpoint
      const response = await axios.delete(`/api/cars/${id}`);
      
      if (response.data.success) {
        // Remove car from state
        setUserCars(userCars.filter(car => car._id !== id));
        setDeleteConfirm(null);
        
        // Refresh the car list in context
        fetchCars();
        
        // Show success message
        setAlertMessage({
          type: 'success',
          text: 'Car successfully deleted'
        });
      } else {
        throw new Error(response.data.message || 'Failed to delete car');
      }
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlertMessage(null), 3000);
    } catch (err) {
      setAlertMessage({
        type: 'error',
        text: 'Failed to delete car. Please try again.'
      });
      setTimeout(() => setAlertMessage(null), 3000);
    }
  };

  const toggleAvailability = async (id: string, currentStatus: boolean): Promise<void> => {
    try {
      // Update car availability with the actual API endpoint
      const response = await axios.patch(`/api/cars/${id}/availability`, {
        isAvailable: !currentStatus
      });
      
      if (response.data.success) {
        // Update car in state
        setUserCars(userCars.map(car => 
          car._id === id ? { ...car, isAvailable: !currentStatus } : car
        ));
        
        // Refresh the car list in context
        fetchCars();
        
        // Show success message
        setAlertMessage({
          type: 'success',
          text: `Car is now ${!currentStatus ? 'available' : 'unavailable'} for rent`
        });
      } else {
        throw new Error(response.data.message || 'Failed to update availability');
      }
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlertMessage(null), 3000);
    } catch (err) {
      setAlertMessage({
        type: 'error',
        text: 'Failed to update availability. Please try again.'
      });
      setTimeout(() => setAlertMessage(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Cars</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading your cars...</p>
        </div>
      </div>
    );
  }

  // Show error if user is not authenticated
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Cars</h1>
        </div>
        <div className="bg-red-100 border border-red-200 rounded-lg p-6 flex items-center justify-center">
          <FiAlertCircle className="text-red-500 text-xl mr-2" />
          <p className="text-red-700">You must be logged in to view your cars</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Cars</h1>
        </div>
        <div className="bg-red-100 border border-red-200 rounded-lg p-6 flex items-center justify-center">
          <FiAlertCircle className="text-red-500 text-xl mr-2" />
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Title and Add Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Cars</h1>
        <Link 
          to="/add-car" 
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
        >
          <FiPlus className="text-white" />
          <span>Add New Car</span>
        </Link>
      </div>

      {/* Alert Message */}
      {alertMessage && (
        <div className={`mb-6 p-4 rounded-lg flex items-center justify-between ${
          alertMessage.type === 'success' ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'
        }`}>
          <div className="flex items-center">
            {alertMessage.type === 'success' ? (
              <FiCheck className="text-green-500 text-xl mr-2" />
            ) : (
              <FiAlertCircle className="text-red-500 text-xl mr-2" />
            )}
            <p className={alertMessage.type === 'success' ? 'text-green-700' : 'text-red-700'}>
              {alertMessage.text}
            </p>
          </div>
          <button onClick={() => setAlertMessage(null)}>
            <FiX className={alertMessage.type === 'success' ? 'text-green-500' : 'text-red-500'} />
          </button>
        </div>
      )}

      {/* No Cars Message */}
      {userCars.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">You don't have any cars listed yet</h3>
          <p className="text-gray-600 mb-6">Add your first car to start renting it out and make money!</p>
          <Link 
            to="/add-car" 
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
          >
            <FiPlus className="text-white" />
            <span>Add Your First Car</span>
          </Link>
        </div>
      )}

      {/* Cars Grid */}
      {userCars.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userCars.map(car => (
            <div key={car._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              {/* Car Image */}
              <div className="relative h-48 bg-gray-200">
                <img 
                  src={car.images && car.images.length > 0 ? car.images[0] : '/api/placeholder/400/240'} 
                  alt={car.name} 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                  car.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {car.isAvailable ? 'Available' : 'Unavailable'}
                </div>
              </div>

              {/* Car Details */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {car.name}
                </h3>
                
                <div className="flex items-center text-gray-700 mb-3">
                  <span className="text-lg font-semibold text-blue-500">${car.price}</span>
                  <span className="ml-1 text-gray-500">/day</span>
                </div>
                
                <div className="text-gray-600 mb-4">{car.location}</div>
                
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-gray-700">{car.rating.toFixed(1)}</span>
                    <span className="text-gray-500 text-sm ml-1">({car.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Link 
                      to={`/edit-car/${car._id}`} 
                      className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md transition-colors duration-200"
                    >
                      <FiEdit2 className="text-gray-600" size={16} />
                      <span>Edit</span>
                    </Link>
                    
                    {deleteConfirm === car._id ? (
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handleDeleteCar(car._id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md transition-colors duration-200"
                        >
                          Confirm
                        </button>
                        <button 
                          onClick={() => setDeleteConfirm(null)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-3 rounded-md transition-colors duration-200"  
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setDeleteConfirm(car._id)}
                        className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md transition-colors duration-200"
                      >
                        <FiTrash2 className="text-red-500" size={16} />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => toggleAvailability(car._id, car.isAvailable)}
                    className={`py-2 px-3 rounded-md transition-colors duration-200 text-sm ${
                      car.isAvailable 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                  >
                    {car.isAvailable ? 'Set Unavailable' : 'Set Available'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCars;