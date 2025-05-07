import dotenv from 'dotenv';
dotenv.config(); // ✅ Load environment variables BEFORE anything else

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const createPaymentIntent = async (req, res) => {
  try {
    console.log('Stripe Key:', process.env.STRIPE_SECRET_KEY); // Should print full key
    const { amount } = req.body;

    console.log("Amount", amount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true, // ✅ Supports cards, Klarna, Afterpay, etc. via Payment Element
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
};
