import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './OrderConfirmation.module.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const orderItems = state?.order?.foodItems || [];
  const address = state?.order?.deliveryAddress;
  const total = state?.order?.total || 0;

  return (
    <div className={styles.confirmationContainer}>
      <div className={styles.confirmationCard}>
        <h1>🎉 Thank you for your order!</h1>
        <p>Your order has been placed successfully.</p>
        <p>You’ll receive a confirmation email shortly.</p>

        {/* Order Summary */}
        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          {orderItems.length > 0 ? (
            <ul>
              {orderItems.map((item, idx) => (
                <li key={idx}>
                  <span>{item.foodItem.name}</span> × {item.quantity} — $
                  {(item.foodItem.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No item details available.</p>
          )}

          <p className={styles.orderTotal}>
            <strong>Total:</strong> ${total.toFixed(2)}
          </p>

          {address && (
            <div className={styles.orderAddress}>
              <h3>Delivery Address</h3>
              <p>
                {address.street}, {address.city}, {address.state} {address.postalCode}
              </p>
            </div>
          )}
        </div>

        <div className={styles.confirmationActions}>
          <button onClick={() => navigate('/')}>Return to Home</button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
