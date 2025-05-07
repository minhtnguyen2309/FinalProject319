import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Home from './pages/home/Home.jsx';
import Footer from './components/footer/Footer.jsx';
import AboutPage from './pages/about/About.jsx';
import Menu from './pages/menu/Menu.jsx';
import { CartProvider } from './context/CartContext.js';
import { AuthProvider } from './context/AuthContext.js';
import Login from './pages/login/Login.jsx';
import MyCart from './pages/myCart/myCart.jsx';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute.jsx';
import Checkout from './pages/checkout/Checkout.jsx'; // make sure this is correct
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutWrapper from './pages/checkoutWrapper/CheckoutWrapper.jsx';
import Signup from './pages/signUp/Signup.jsx';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/foodItems" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route
              path="/myCart"
              element={
                <ProtectedRoute>
                  <MyCart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutWrapper />
                </ProtectedRoute>
              }
            />

          </Routes>

          <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
