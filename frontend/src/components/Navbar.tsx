import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut, FiPlus, FiSettings } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
const currentUser1 = 
  {
    name:"hraf" ,
    profileImage:"https://img.freepik.com/vecteurs-premium/hommes-asiatiques-avatar_7814-345.jpg?semt=ais_hybrid&w=740"
  }

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const {isAuthenticated , user , logout} = useAuth();
  // Simulate fetching the user data on component mount
  useEffect(() => {
    // In a real app, you would get this from your auth context or state management
    // This is just for demonstration
    const checkAuthStatus = () => {
      const user = localStorage.getItem('user');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    };
    
    checkAuthStatus();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    setCurrentUser(false);
    // Close menus
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    // Redirect to home page (you'd typically use React Router's navigate here)
    window.location.href = '/';
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
            
            {/* Auth Buttons or User Profile */}
            {currentUser ? (
              <div className="relative">
                <button 
                  onClick={toggleUserMenu}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  {currentUser1.profileImage ? (
                    <img 
                      src={currentUser1.profileImage} 
                      alt={currentUser1.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-gray-700" />
                  )}
                  <span className="font-medium text-gray-800">{currentUser1.name}</span>
                </button>

                {/* User Dropdown Menu */}
                {isAuthenticated && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link 
                      to="/add-car" 
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FiPlus className="text-blue-500" />
                      <span>Add a Car</span>
                    </Link>
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FiSettings className="text-gray-500" />
                      <span>Account Settings</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                    >
                      <FiLogOut />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
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
            )}
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
          
          {/* Mobile Auth Buttons or User Profile */}
          {currentUser ? (
            <div className="flex flex-col space-y-3 pb-4">
              <div className="flex items-center gap-3 py-2">
                {currentUser1.profileImage ? (
                  <img 
                    src={currentUser1.profileImage} 
                    alt={currentUser1.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <FiUser className="text-gray-700" />
                  </div>
                )}
                <span className="font-medium text-gray-800">{currentUser1.name}</span>
              </div>
              
              <Link 
                to="/add-car" 
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiPlus className="text-blue-500" />
                <span>Add a Car</span>
              </Link>
              
              <Link 
                to="/profile" 
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiSettings className="text-gray-500" />
                <span>Account Settings</span>
              </Link>
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors duration-200 py-2"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          ) : (
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
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;