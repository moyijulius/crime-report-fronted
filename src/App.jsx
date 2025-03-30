import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ReportCrime from './components/ReportCrime';
import TrackCase from './components/TrackCase';
import OfficerDashboard from './components/OfficerDashboard';
import UserProfile from './components/UserProfile';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import Register from './components/Register';
import ReviewPage from './components/ReviewPage';
import AdminTestimonials from './components/AdminTestimonials';

// Protected Route component for authenticated users
const ProtectedUserRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Layout component to control Header/Footer visibility
const Layout = ({ children }) => {
  const location = useLocation();
  const hidePaths = ['/login', '/register','/officer/dashboard','/track','/track','/admin/testimonials'];
  const showHeaderFooter = !hidePaths.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}; 
  // Hide Header and Footer if on login page
 

  

function App() {
  return (
    <Router>
      <Layout>
<Routes>
  {/* Public Routes */}
  <Route path="/" element={<><Hero /><HowItWorks /><Testimonials /></>} />
  <Route path="/contact" element={<ContactUs />} />
  <Route path="/register" element={<Register />} />
  <Route path="/track" element={<TrackCase />} />
  <Route path="/review" element={<ReviewPage />} />
  <Route path="/login" element={<Login />} />

  {/* Protected Routes */}
  <Route path="/admin/testimonials" element={
    <ProtectedUserRoute>
      <AdminTestimonials />
    </ProtectedUserRoute>
  } />
  
  <Route path="/officer/dashboard" element={
    <ProtectedUserRoute>
      <OfficerDashboard />
    </ProtectedUserRoute>
  } />
  
  <Route path="/user/profile" element={  // Changed from /profile to /user/profile
    <ProtectedUserRoute>
      <UserProfile />
    </ProtectedUserRoute>
  } />
  
  <Route path="/report" element={
    <ProtectedUserRoute>
      <ReportCrime />
    </ProtectedUserRoute>
  } />
</Routes>
      </Layout>
    </Router>
  );
}

export default App;
