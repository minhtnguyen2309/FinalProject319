import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './menu.css';

const Menu = () => {
  const { data: foodItems, loading, error } = useFetch('http://localhost:8800/api/fooditems');
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();


  const handleAddToCart = (foodItem) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(foodItem);
  };
  

  return (
    <div className="menu-container">
      <div className="menu-title">
        <h1>Our Vietnamese Menu</h1>
        <p>Explore authentic dishes crafted with tradition and flavor.</p>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">Error: {error}</div>
      ) : (
        <div className="food-items">
          {foodItems.map((food) => (
            <div key={food._id} className="food-item-card">
              <img src={food.imageUrl} alt={food.name} className="food-item-img" />
              <div className="food-item-details">
                <h5 className="food-item-name">{food.name}</h5>
                <p className="food-item-description">{food.description}</p>
                <p className="food-item-price">${food.price}</p>
                <div className="food-item-actions">
                  <button onClick={() => handleAddToCart(food)} className="btn btn-add">Add to Cart</button>
                  <Link to={`/foodItems/${food._id}`} className="btn btn-view-details">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
