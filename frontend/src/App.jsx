import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Seller from './components/Seller';
import Login from './components/Login';
import Signup from './components/Signup';
import Shop from './components/Shop';
import ContactPage from './components/ContactPage';
import About from './components/About';
import Cart from './components/Cart';
import ThriftstorePage from './components/thrift/ThriftStorePage';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  const [error, setError] = useState(null); // Track error state
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/current-user', { withCredentials: true });
          console.log('Authenticated user:', response.data.user); // Log the authenticated user
          setUser(response.data.user);
        } catch (error) {
          console.log('Not authenticated');
        } finally {
          setLoading(false); // Stop loading after check
        }
      };
  
      checkAuth();
  }, []);
  

  const ShopperRoute = () => {
    return user && user.role === 'shopper' ? (
      <>
        <Navbar
          user={user}
          handleLogout={() => {
            axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true })
              .then(() => {
                setUser(null);
              })
              .catch(err => console.log('Error logging out', err));
          }}
        />
        <Outlet />
      </>
    ) : (
      <Navigate to="/login" />
    );
  };

  const SellerRoute = () => {
    return user && user.role === 'seller' ? (
      <Seller user={user} />
    ) : (
      <Navigate to="/login" />
    );
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking auth
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Shopper Routes */}
        <Route element={<ShopperRoute />}>
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/shop" element={<Shop user={user} />} />
          <Route path="/thrift" element={<ThriftstorePage user={user} />} />
          <Route path="/contact" element={<ContactPage user={user} />} />
          <Route path="/about" element={<About user={user} />} />
          <Route path="/cart" element={<Cart user={user} />} />
        </Route>

        {/* Seller Routes */}
        <Route path="/seller" element={<SellerRoute />} />

        {/* Default Route */}
        <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
