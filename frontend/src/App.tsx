import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <div >
      <Navbar />
      <ScrollToTop/>
      <ToastContainer position="bottom-right" />
      <Routes>
        {/* Tes autres routes ici */}
        
        {/* Route NotFound en dernier */}
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/become-a-renter" element={<BecomeRenterPage />} />
        <Route path="/rental-deals" element={<RentalDealsPage />} />
        <Route path="/rent/:id" element={<RentalDetailsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/why-choose-us" element={<WhyChooseUs />} />
        <Route path="/support" element={<SupportPage />} />


        <Route path="/add-car" element={<AddCarPage />} />
        <Route path="/profile" element={<AccountSettingsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
