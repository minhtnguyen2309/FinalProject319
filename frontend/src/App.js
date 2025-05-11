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
import CheckoutWrapper from './pages/checkoutWrapper/CheckoutWrapper.jsx';
import Signup from './pages/signUp/Signup.jsx';
import FoodItem from './pages/foodItem/FoodItem.jsx';
import OrderConfirmation from './pages/orderConfirmation/OrderConfirmation.jsx';
import Aboutus from './pages/aboutus/Aboutus.jsx';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app-wrapper">
            <Navbar />
            {/* Main content wrapper */}
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/foodItems" element={<Menu />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/foodItems/:id" element={<FoodItem />} />
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
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/aboutus" element={<Aboutus />} />
              </Routes>
            </div>

            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
