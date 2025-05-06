// CheckoutWrapper.jsx
import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Checkout from '../checkout/Checkout.jsx';
import { useCart } from '../../context/CartContext';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutWrapper = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { total } = useCart();


  useEffect(() => {
    const fetchSecret = async () => {
      if (total <= 0) return;
      try {
        /// if(Math.round(total * 100) < 50) console.log("dcccccccccccccmmmmmmmmmmmmmmmm")
        const res = await axios.post('http://localhost:8800/api/payments/create-payment-intent', {
          amount: Math.round(total * 100)
        });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error('Error fetching clientSecret:', err);
      }
    };

    fetchSecret();
  }, [total]);

  const options = {
    clientSecret,
    appearance: { theme: 'stripe' },
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <Checkout clientSecret={clientSecret} />
        </Elements>
      ) : (
        <p>Loading payment form...</p>
      )}
    </div>
  );
};

export default CheckoutWrapper;
