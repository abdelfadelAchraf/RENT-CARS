import { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCars } from '../context/CarContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditCarPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCar, updateCar, loading, error } = useCars();
  
  const [carData, setCarData] = useState({
    name: '',
    type: '',
    location: '',
    passengers: 4,
    transmission: 'Automatic',
    airConditioning: true,
    doors: 4,
    price: 0,
    category: '',
    description: '',
    features: [] as string[],
    specs: {
      passengers: 4,
      luggage: 0,
      range: '',
      fuelType: ''
    },
    isAvailable: false
  });

  const [newFeature, setNewFeature] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!id) return;
      
      try {
        const car = await getCar(id);
        if (car) {
          setCarData({
            name: car.name,
            type: car.type,
            location: car.location,
            passengers: car.passengers,
            transmission: car.transmission,
            airConditioning: car.airConditioning,
            doors: car.doors,
            price: car.price,
            category: car.category,
            description: car.description,
            features: car.features,
            specs: {
              passengers: car.specs.passengers ?? 4,
              luggage: car.specs.luggage ?? 0,
              range: car.specs.range ?? '',
              fuelType: car.specs.fuelType ?? ''
            },
            isAvailable: car.isAvailable
          });
          setPreviewImages(car.images);
        }
      } catch (err) {
        toast.error('Failed to load car details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name.startsWith('specs.')) {
      const specField = name.split('.')[1];
      setCarData(prev => ({
        ...prev,
        specs: {
          ...prev.specs,
          [specField]: type === 'number' ? parseInt(value) : value
        }
      }));
    } else {
      setCarData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
      }));
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !carData.features.includes(newFeature.trim())) {
      setCarData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setCarData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
      
      const previews = files.map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...previews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    // If we had image files, we'd need to handle those too
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const formData = new FormData();
    
    // Append all car data fields
    formData.append('name', carData.name);
    formData.append('type', carData.type);
    formData.append('location', carData.location);
    formData.append('passengers', carData.passengers.toString());
    formData.append('transmission', carData.transmission);
    formData.append('airConditioning', carData.airConditioning.toString());
    formData.append('doors', carData.doors.toString());
    formData.append('price', carData.price.toString());
    formData.append('category', carData.category);
    formData.append('description', carData.description);
    formData.append('isAvailable', carData.isAvailable.toString());
    
    // Append features as JSON array
    formData.append('features', JSON.stringify(carData.features));
    
    // Append specs as JSON object
    formData.append('specs', JSON.stringify(carData.specs));
    
    // Append new images
    images.forEach(image => {
      formData.append('images', image);
    });

    try {
      const updatedCar = await updateCar(id, formData);
      if (updatedCar) {
        toast.success('Car updated successfully!');
        navigate('/my-cars');
      }
    } catch (err) {
      toast.error(error || 'Failed to update car');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Edit Car</h2>
          <p className="mt-2 text-lg text-gray-600">Update your car details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          {/* Basic Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
            
            <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Car Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={carData.name}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Car Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={carData.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="Convertible">Convertible</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Coupe">Coupe</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={carData.location}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={carData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="Compact">Compact</option>
                  <option value="Mid-size">Mid-size</option>
                  <option value="Full-size">Full-size</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={carData.description}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Specifications Section */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900">Specifications</h3>
            
            <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">
                  Passengers
                </label>
                <input
                  type="number"
                  name="passengers"
                  id="passengers"
                  min="1"
                  value={carData.passengers}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="doors" className="block text-sm font-medium text-gray-700">
                  Doors
                </label>
                <input
                  type="number"
                  name="doors"
                  id="doors"
                  min="1"
                  value={carData.doors}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">
                  Transmission
                </label>
                <select
                  id="transmission"
                  name="transmission"
                  value={carData.transmission}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="specs.luggage" className="block text-sm font-medium text-gray-700">
                  Luggage Capacity
                </label>
                <input
                  type="number"
                  name="specs.luggage"
                  id="specs.luggage"
                  min="0"
                  value={carData.specs.luggage || 0}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="specs.range" className="block text-sm font-medium text-gray-700">
                  Range (km)
                </label>
                <input
                  type="text"
                  name="specs.range"
                  id="specs.range"
                  value={carData.specs.range || ''}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="specs.fuelType" className="block text-sm font-medium text-gray-700">
                  Fuel Type
                </label>
                <select
                  id="specs.fuelType"
                  name="specs.fuelType"
                  value={carData.specs.fuelType || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Select</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <div className="flex items-center">
                  <input
                    id="airConditioning"
                    name="airConditioning"
                    type="checkbox"
                    checked={carData.airConditioning}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="airConditioning" className="ml-2 block text-sm text-gray-700">
                    Air Conditioning
                  </label>
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="flex items-center">
                  <input
                    id="isAvailable"
                    name="isAvailable"
                    type="checkbox"
                    checked={carData.isAvailable}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-700">
                    Available for Rent
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900">Pricing</h3>
            
            <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Daily Price ($)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    min="0"
                    value={carData.price}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900">Features</h3>
            
            <div className="mt-4">
              <div className="flex">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </div>
              
              <div className="mt-4">
                {carData.features.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {carData.features.map((feature, index) => (
                      <li key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {feature}
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="ml-1.5 inline-flex text-blue-500 hover:text-blue-700 focus:outline-none"
                        >
                          <span className="sr-only">Remove</span>
                          &times;
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No features added yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="pb-6">
            <h3 className="text-lg font-medium text-gray-900">Images</h3>
            
            <div className="mt-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB each)</p>
                  </div>
                  <input 
                    id="images" 
                    name="images" 
                    type="file" 
                    className="hidden" 
                    multiple 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previewImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Car preview ${index}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 inline-flex items-center justify-center p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="sr-only">Remove image</span>
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCarPage;