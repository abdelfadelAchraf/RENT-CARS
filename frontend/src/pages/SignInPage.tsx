// pages/SignInPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const { login ,  } = useAuth();
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast.success('Logged in successfully!');
        navigate('/'); // Navigate to home or dashboard
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error('Login failed. Please check your credentials.');
    }
  };
  
  

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-500 p-6 text-center">
          <h1 className="text-white text-2xl font-bold">Sign In</h1>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="john.doe@example.com"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="mr-2"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span className="text-gray-700">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition mb-4"
            >
              Sign In
            </button>
            
            <div className="text-center text-gray-600 mb-4">
              <span>or sign in with</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                // onClick={handleGoogleSignIn}
                className="flex items-center justify-center py-2 px-4 border rounded-lg hover:bg-gray-50 transition"
              >
                <FaGoogle className="text-red-500 mr-2" />
                <span>Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center py-2 px-4 border rounded-lg hover:bg-gray-50 transition"
              >
                <FaFacebook className="text-blue-600 mr-2" />
                <span>Facebook</span>
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;