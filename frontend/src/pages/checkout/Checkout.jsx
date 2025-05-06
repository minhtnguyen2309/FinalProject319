// Checkout.jsx
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './checkout.css';

const Checkout = ({ clientSecret }) => {
  const { cart, getTotal, clearCart} = useCart();
  const { userId } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddressChange = (e) => {
    setAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
        setSubmitting(false);
        return;
      }

      if (result.paymentIntent.status === 'succeeded') {
        const orderPayload = {
          user: userId,
          foodItems: cart.foodItems.map(item => ({
            foodItem: item.foodItem._id,
            quantity: item.quantity,
          })),
          deliveryAddress: address,
          paymentMethod,
        };

        await axios.post('http://localhost:8800/api/orders', orderPayload);

        // ✅ Clear the cart
        await clearCart();

        setMessage('✅ Order placed successfully!');
        setTimeout(() => navigate('/'), 2500);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Something went wrong.');
    }

    setSubmitting(false);
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2>Delivery Address</h2>
      <input name="street" placeholder="Street" value={address.street} onChange={handleAddressChange} required />
      <input name="city" placeholder="City" value={address.city} onChange={handleAddressChange} required />
      <input name="state" placeholder="State" value={address.state} onChange={handleAddressChange} required />
      <input name="postalCode" placeholder="Postal Code" value={address.postalCode} onChange={handleAddressChange} required />

      <h2>Payment Method</h2>
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
        <option value="Credit Card">Credit Card</option>
        <option value="PayPal">PayPal</option>
      </select>

      <h2>Card Details</h2>
      <CardElement options={{ style: { base: { fontSize: '16px' } } }} />

      <h3>Total: ${getTotal().toFixed(2)}</h3>
      <button type="submit" disabled={!stripe || submitting}>
        {submitting ? 'Processing...' : 'Place Order'}
      </button>

      {message && <div className="checkout-message">{message}</div>}
      <p className="test-info">
        Test Card: <strong>4242 4242 4242 4242</strong>, any future date, CVC, ZIP.
      </p>
    </form>
  );
};

export default Checkout;
