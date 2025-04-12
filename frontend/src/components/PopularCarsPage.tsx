import { AllCars } from "../assets/constants";
import CarCard from "./CarCard";

const PopularCarsPage: React.FC = () => {
  

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-blue-50 py-3 px-4 rounded-lg text-center mb-6">
        <span className="text-blue-500">POPULAR RENTAL DEALS</span>
      </div>
      <h2 className="text-2xl font-bold text-center mb-8">Most popular cars rental deals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {AllCars.slice(0,4).map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </div>
    </div>
  );
};

export default PopularCarsPage;