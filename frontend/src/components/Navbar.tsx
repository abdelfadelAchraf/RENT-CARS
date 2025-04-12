import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { text: "Become a renter", path: "/become-a-renter" },
    { text: "Rental deals", path: "/rental-deals" },
    { text: "How it works", path: "/how-it-works" },
    { text: "Why choose us", path: "/why-choose-us" }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="uppercase text-blue-500 font-bold text-2xl md:text-3xl lg:text-4xl">
            RENTCARS
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-6 mr-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <Link 
                to="/signin" 
                className="text-gray-800 hover:text-blue-500 font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
              <Link 
                to="/signup" 
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Sign up
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="h-8 w-8" />
            ) : (
              <FiMenu className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden bg-white absolute w-full shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex flex-col space-y-4 mb-6 border-b border-gray-200 pb-6">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link 
                  to={link.path} 
                  className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200 block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile Auth Buttons */}
          <div className="flex flex-col space-y-3 pb-4">
            <Link 
              to="/signin" 
              className="text-gray-800 hover:text-blue-500 font-medium transition-colors duration-200 py-2 block"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link 
              to="/signup" 
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 shadow-md text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;