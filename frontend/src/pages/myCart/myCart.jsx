import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

import './myCart.css';

const MyCart = () => {
  const { cart, updateItemQuantity, removeFromCart, getTotal, loading } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (foodItemId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return;
    setIsUpdating(true);
    await updateItemQuantity(foodItemId, quantity);
    setIsUpdating(false);
  };

  const handleRemoveItem = async (foodItemId) => {
    setIsUpdating(true);
    await removeFromCart(foodItemId);
    setIsUpdating(false);
  };

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };


  if (loading) return <div className="loading">Loading...</div>;

  // Calculate totals
  const taxRate = 0.10;
  const subtotal = getTotal();
  const taxAmount = subtotal * taxRate;
  const finalTotal = subtotal + taxAmount;

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Your Cart</h1>

      {cart.foodItems.length === 0 ? (
        <p className="empty-message">Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.foodItems.map((item) => (
            <div key={item.foodItem._id} className="cart-item">
              <img
                src={item.foodItem.imageUrl}
                alt={item.foodItem.name}
                className="cart-item-img"
              />
              <div className="cart-item-details">
                <h3 className="item-name">{item.foodItem.name}</h3>
                <p className="item-description">{item.foodItem.description}</p>
                <p className="item-price">${item.foodItem.price}</p>

                <div className="cart-item-quantity">
                  <button
                    onClick={() => handleQuantityChange(item.foodItem._id, item.quantity - 1)}
                    disabled={isUpdating || item.quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.foodItem._id, parseInt(e.target.value))
                    }
                    min="1"
                    disabled={isUpdating}
                  />
                  <button
                    onClick={() => handleQuantityChange(item.foodItem._id, item.quantity + 1)}
                    disabled={isUpdating}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.foodItem._id)}
                  className="remove-item-btn"
                  disabled={isUpdating}
                >
                  ✖ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.foodItems.length > 0 && (
        <div className="cart-total">
          <h3>Subtotal: <span>${subtotal.toFixed(2)}</span></h3>
          <h3>Tax (10%): <span>${taxAmount.toFixed(2)}</span></h3>
          <h3 className="total-line">Total: <span>${finalTotal.toFixed(2)}</span></h3>

          <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
        

        
      )}
    </div>
  );
};

export default MyCart;
