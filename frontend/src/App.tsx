// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './index.css';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import ScrollToTop from './components/ScrollToTop';
import HowItWorksPage from './pages/HowItWorksPage';
import BecomeRenterPage from './pages/BecomeRenterPage';
import RentalDealsPage from './pages/RentalDealsPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import WhyChooseUs from './pages/WhyChooseUs';
import RentalDetailsPage from './pages/RentalDetailsPage';
import SupportPage from './pages/SupportPage';
import AddCarPage from './pages/AddCarPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';
import MyCars from './pages/MyCars';
import ForgotPassword from './pages/ForgotPassword';
import LoadingPage from './components/ui/LoadingPage ';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Show loading page for 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Navbar />
          <ScrollToTop />
          <ToastContainer position="bottom-right" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/become-a-renter" element={<BecomeRenterPage />} />
            <Route path="/rental-deals" element={<RentalDealsPage />} />
            <Route path="/rent/:id" element={<RentalDetailsPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/why-choose-us" element={<WhyChooseUs />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/add-car" element={<AddCarPage />} />
              <Route path="/profile" element={<AccountSettingsPage />} />
              <Route path="/my-cars" element={<MyCars />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;