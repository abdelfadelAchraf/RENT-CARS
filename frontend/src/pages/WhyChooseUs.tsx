// pages/ServicesPage.tsx
import React from 'react';
import { FaClock, FaHeadset, FaShieldAlt, FaCarSide, FaMoneyBillWave, FaMapMarkedAlt } from 'react-icons/fa';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <div className="text-blue-500 text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const WhyChooseUs: React.FC = () => {
  const services = [
    {
      icon: <FaClock />,
      title: "24 Hour Car Delivery",
      description: "Book your car anytime and we will deliver it directly to you."
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Technical Support",
      description: "Have a question? Contact Rentcars support any time when you have problems."
    },
    {
      icon: <FaShieldAlt />,
      title: "Full Insurance Coverage",
      description: "Drive with peace of mind knowing you're fully covered by our comprehensive insurance."
    },
    {
      icon: <FaCarSide />,
      title: "Wide Range of Vehicles",
      description: "Choose from our extensive fleet of economy, luxury, and specialty vehicles."
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Best Price Guarantee",
      description: "We offer competitive pricing and will match any lower rate you find elsewhere."
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Multiple Pickup Locations",
      description: "Pick up your rental from any of our convenient locations across the country."
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-4">Our Services</h1>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
        At Rentcars, we're committed to providing you with a seamless car rental experience from start to finish.
        Explore our premium services designed to make your journey comfortable and hassle-free.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;