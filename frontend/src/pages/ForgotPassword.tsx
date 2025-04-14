import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { IoArrowBack } from 'react-icons/io5';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your password reset logic here
    setIsSubmitted(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow">
        {/* Header */}
        <div className="bg-blue-500 text-white py-5 px-6 text-center">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
        </div>

        <div className="px-6 py-8">
          {!isSubmitted ? (
            <>
              <p className="text-gray-600 mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 text-gray-700">
                    Email Address
                  </label>
                  <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                    <MdEmail className="text-gray-400 mr-2" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john.doe@example.com"
                      className="w-full focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-medium transition duration-200"
                >
                  Reset Password
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                <p>Password reset link sent!</p>
                <p className="text-sm mt-1">Please check your email for further instructions.</p>
              </div>
              <p className="text-gray-600">
                Didn't receive an email? Check your spam folder or
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-blue-500 hover:text-blue-600 ml-1"
                >
                  try again
                </button>
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <a href="/signin" className="inline-flex items-center text-blue-500 hover:text-blue-600">
              <IoArrowBack className="mr-1" />
              Back to Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;