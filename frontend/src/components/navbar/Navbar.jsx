import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSignInAlt, FaUtensils } from 'react-icons/fa';
import './navbar.css';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Left: Logo */}
        <Link to="/" className="navbar-logo">
          <FaUtensils className="logo-icon" />
          VietFood
        </Link>

        {/* Middle: Links */}
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/foodItems" className="navbar-link">Menu</Link>
          <Link to="/aboutus" className="navbar-link">About Us</Link>
        </div>

        {/* Right: Cart & User */}
        <div className="navbar-right">
          <Link to="/mycart" className="navbar-cart">
            <FaShoppingCart />
            <span className="cart-badge">3</span>
          </Link>

          {!user ? (
            <Link to="/login" className="navbar-link login-link">
              <FaSignInAlt />
              <span>Login</span>
            </Link>
          ) : (
            <div className="user-info">
              <span className="navbar-link">{user.firstName} {user.lastName}</span>
              <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
