import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const SearchHome = () => {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ location, pickupDate, returnDate });
    // Add your search logic here
  };

  return (
    <div className="max-w-4xl mx-auto my-8 flex flex-col items-center justify-center ">
      <form onSubmit={handleSearch}>
        <fieldset className="border-0 p-0 m-0 ">
          <legend className="flex flex-col md:flex-row justify-between items-stretch gap-4 p-6 bg-white rounded-lg shadow-lg">
            {/* Location Input */}
            <div className="flex items-center gap-3 flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
              <div className="text-blue-600 text-2xl">
                <FaMapMarkerAlt />
              </div>
              <div className="flex-1">
                <h2 className="font-medium text-gray-700 mb-1">Location</h2>
                <input 
                  type="search" 
                  name="search" 
                  id="search" 
                  placeholder="Search your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border-none text-gray-800 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none p-1"
                />
              </div>
            </div>

            {/* Pickup Date */}
            <div className="flex items-center gap-3 flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
              <div className="text-blue-600 text-2xl">
                <MdOutlineDateRange />
              </div>
              <div className="flex-1">
                <h2 className="font-medium text-gray-700 mb-1">Pickup date</h2>
                <DatePicker
                  selected={pickupDate}
                  onChange={(date) => setPickupDate(date)}
                  dateFormat="EEE dd MMM, HH:mm"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  placeholderText="Tue 15 Feb, 09:00"
                  className="w-full border-none text-gray-800 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none p-1"
                />
              </div>
            </div>

            {/* Return Date */}
            <div className="flex items-center gap-3 flex-1">
              <div className="text-blue-600 text-2xl">
                <MdOutlineDateRange />
              </div>
              <div className="flex-1">
                <h2 className="font-medium text-gray-700 mb-1">Return date</h2>
                <DatePicker
                  selected={returnDate}
                  onChange={(date) => setReturnDate(date)}
                  dateFormat="EEE dd MMM, HH:mm"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  placeholderText="Tue 16 Feb, 11:00"
                  minDate={pickupDate || undefined}
                  className="w-full border-none text-gray-800 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none p-1"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-center justify-center mt-4 md:mt-0 md:ml-4">
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Search
              </button>
            </div>
          </legend>
        </fieldset>
      </form>
    </div>
  );
};

export default SearchHome;