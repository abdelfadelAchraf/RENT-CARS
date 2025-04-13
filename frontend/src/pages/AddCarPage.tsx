import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { FiUpload, FiX, FiCheck, FiInfo } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

// Define types for form data
interface CarFormData {
  name: string;
  type: string;
  location: string;
  passengers: number;
  transmission: string;
  airConditioning: boolean;
  doors: number;
  price: number;
  category: string;
  description: string;
  features: string[];
  fuelType: string;
  luggage: number;
  range: string;
}

// Define type for image file
interface ImageFile {
  file: File;
  preview: string;
}

const AddCarPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [featureInput, setFeatureInput] = useState<string>('');
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [formSuccess, setFormSuccess] = useState<boolean>(false);

  const [formData, setFormData] = useState<CarFormData>({
    name: '',
    type: '',
    location: '',
    passengers: 4,
    transmission: 'automatic',
    airConditioning: true,
    doors: 4,
    price: 0,
    category: '',
    description: '',
    features: [],
    fuelType: 'gasoline',
    luggage: 2,
    range: '',
  });

  const carTypes = ['Sedan', 'SUV', 'Hatchback', 'Convertible', 'Luxury', 'Sports', 'Electric', 'Hybrid'];
  const transmissionTypes = ['Automatic', 'Manual'];
  const categories = ['Economy', 'Compact', 'Midsize', 'Standard', 'Premium', 'Luxury', 'Special'];
  const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked
      });
    } else if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newImages = newFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const addFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    // Validation
    if (!formData.name || !formData.type || !formData.location || !formData.price) {
      setFormError('Please fill in all required fields.');
      setFormSubmitting(false);
      return;
    }

    if (images.length === 0) {
      setFormError('Please upload at least one image of your car.');
      setFormSubmitting(false);
      return;
    }

    try {
      // In a real app, you would upload images and form data to your backend
      // For this example, we'll simulate a successful submission
      
      // Create FormData for API call
      const apiFormData = new FormData();
      
      // Append car details
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'features') {
          apiFormData.append(key, JSON.stringify(value));
        } else {
          apiFormData.append(key, value.toString());
        }
      });
      
      // Append images
      images.forEach((image, index) => {
        apiFormData.append(`image-${index}`, image.file);
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success and redirect
      setFormSuccess(true);
      setTimeout(() => {
        navigate('/profile'); // Redirect to profile or cars management page
      }, 2000);
      
    } catch (error) {
      setFormError('Something went wrong. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-blue-500 px-6 py-4">
            <h1 className="text-white text-2xl font-bold">Add Your Car to RentCars</h1>
            <p className="text-blue-100 mt-1">
              List your vehicle and start earning
            </p>
          </div>

          {formSuccess ? (
            <div className="p-8 text-center">
              <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-center mb-3">
                  <FiCheck className="text-green-500 text-3xl" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Car Successfully Added!</h2>
                <p>Your car listing has been submitted and will be available soon.</p>
              </div>
              <Link 
                to="/profile" 
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
              >
                Go to My Account
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6">
              {formError && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FiInfo className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm">{formError}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Car Images</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden h-48 bg-gray-100">
                      <img 
                        src={image.preview} 
                        alt={`Car preview ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                      >
                        <FiX className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div 
                  onClick={() => fileInputRef.current?.click()} 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                  <FiUpload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                  <p className="text-gray-700 font-medium">Upload Car Images</p>
                  <p className="text-gray-500 text-sm mt-1">Click to browse or drag and drop</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Car Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Honda Civic 2023"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Car Type*
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Type</option>
                    {carTypes.map((type) => (
                      <option key={type} value={type.toLowerCase()}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location*
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. New York, NY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price per Day ($)*
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Car Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
                      Passenger Capacity
                    </label>
                    <input
                      type="number"
                      id="passengers"
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleInputChange}
                      min="1"
                      max="20"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="doors" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Doors
                    </label>
                    <input
                      type="number"
                      id="doors"
                      name="doors"
                      value={formData.doors}
                      onChange={handleInputChange}
                      min="2"
                      max="6"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">
                      Transmission
                    </label>
                    <select
                      id="transmission"
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      {transmissionTypes.map((type) => (
                        <option key={type} value={type.toLowerCase()}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category.toLowerCase()}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                      Fuel Type
                    </label>
                    <select
                      id="fuelType"
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      {fuelTypes.map((type) => (
                        <option key={type} value={type.toLowerCase()}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="luggage" className="block text-sm font-medium text-gray-700 mb-1">
                      Luggage Capacity
                    </label>
                    <input
                      type="number"
                      id="luggage"
                      name="luggage"
                      value={formData.luggage}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="range" className="block text-sm font-medium text-gray-700 mb-1">
                      Range/Mileage
                    </label>
                    <input
                      type="text"
                      id="range"
                      name="range"
                      value={formData.range}
                      onChange={handleInputChange}
                      placeholder="e.g. 350 miles"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="airConditioning"
                      name="airConditioning"
                      checked={formData.airConditioning}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-400 rounded"
                    />
                    <label htmlFor="airConditioning" className="ml-2 block text-sm text-gray-700">
                      Air Conditioning
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Describe your car, its condition, and any special features..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Features
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {feature}
                      <button 
                        type="button" 
                        onClick={() => removeFeature(index)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="e.g. Bluetooth, GPS, Sunroof"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-lg"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Link 
                  to="/profile" 
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className={`px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow-md ${
                    formSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {formSubmitting ? "Submitting..." : "Add Car"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCarPage;