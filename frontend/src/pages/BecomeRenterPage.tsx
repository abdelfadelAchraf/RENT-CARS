// pages/BecomeRenterPage.tsx
import React, { useState } from 'react';
import { FaCar, FaMoneyBillWave, FaCalendarAlt, FaCheckCircle, FaUpload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <div className="text-blue-500 text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const BecomeRenterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    carMake: '',
    carModel: '',
    carYear: '',
    carLicensePlate: '',
    carPhotos: null,
    driverLicense: null
  });

  const benefits = [
    {
      icon: <FaMoneyBillWave />,
      title: "Earn Extra Income",
      description: "Turn your car into a money-making asset by renting it out when you're not using it."
    },
    {
      icon: <FaCar />,
      title: "Flexible Schedule",
      description: "You decide when your car is available for rent. Keep full control of your schedule."
    },
    {
      icon: <FaCalendarAlt />,
      title: "Easy Booking System",
      description: "Our platform handles all bookings, payments, and scheduling for a hassle-free experience."
    },
    {
      icon: <FaCheckCircle />,
      title: "Insurance Coverage",
      description: "Your car is protected with our comprehensive insurance coverage during rental periods."
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation would go here
    console.log('Form submitted:', formData);
    // API call would go here
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Become a Car Renter</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Turn your car into a source of income by joining our car rental platform. Share your vehicle when you're not using it and earn money effortlessly.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {benefits.map((benefit, index) => (
          <BenefitCard
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
        <div className="bg-blue-500 p-6 text-center">
          <h2 className="text-white text-2xl font-bold">Get Started Today</h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 (123) 456-7890"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Car Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Car Make</label>
                  <input
                    type="text"
                    name="carMake"
                    placeholder="Toyota"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.carMake}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Car Model</label>
                  <input
                    type="text"
                    name="carModel"
                    placeholder="Camry"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.carModel}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Year</label>
                  <input
                    type="text"
                    name="carYear"
                    placeholder="2020"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.carYear}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">License Plate</label>
                  <input
                    type="text"
                    name="carLicensePlate"
                    placeholder="ABC-1234"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.carLicensePlate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Car Photos</label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <FaUpload className="text-gray-400 text-2xl mx-auto mb-2" />
                    <p className="text-gray-500 mb-2">Upload photos of your car</p>
                    <p className="text-gray-400 text-sm mb-4">(Exterior and interior)</p>
                    <input
                      type="file"
                      name="carPhotos"
                      accept="image/*"
                      multiple
                      className="hidden"
                      id="carPhotos"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="carPhotos"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
                    >
                      Choose Files
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Driver's License</label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <FaUpload className="text-gray-400 text-2xl mx-auto mb-2" />
                    <p className="text-gray-500 mb-2">Upload a copy of your driver's license</p>
                    <p className="text-gray-400 text-sm mb-4">(Front and back)</p>
                    <input
                      type="file"
                      name="driverLicense"
                      accept="image/*"
                      className="hidden"
                      id="driverLicense"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="driverLicense"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
                    >
                      Choose Files
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Our team is ready to help you with any questions about becoming a car renter on our platform.
        </p>
       <Link to='/support'>
       <button  className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition">
          Contact Support
        </button>
       </Link>
      </div>
    </div>
  );
};

export default BecomeRenterPage;