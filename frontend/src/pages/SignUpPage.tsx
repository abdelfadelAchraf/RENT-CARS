// pages/SignUpPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaFacebook, FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
  
    const { firstName, lastName, email, password } = formData;
  
    const result = await register({
      name: `${firstName} ${lastName}`,
      email,
      password,
      // Include phone only if your backend supports it
    });
  
    if (result.success) {
      toast.success('Registration successful! You can now sign in.');
      navigate('/signin');
    } else {
      toast.error(`Registration failed: ${result.message}`);
    }
  };
  
  const handleGoogleSignUp = async () => {
    try {
      await loginWithGoogle();
      // Navigation will happen after successful login in the callback
    } catch (error) {
      console.error("Google signup failed:", error);
      toast.error('Google signup failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-500 p-6 text-center">
          <h1 className="text-white text-2xl font-bold">Create an Account</h1>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">First Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

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
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">
                  <FaPhone />
                </span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+(212) 762-51-90-01"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.phone}
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
                  minLength={8}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  className="mr-2"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />
                <span className="text-gray-700">
                  I agree to the <Link to="/terms" className="text-blue-500 hover:underline">Terms of Service</Link> and{' '}
                  <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition mb-4"
            >
              Sign Up
            </button>

            <div className="text-center text-gray-600 mb-4">
              <span>or sign up with</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={handleGoogleSignUp}
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
                Already have an account?{' '}
                <Link to="/signin"  className="text-blue-500 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;