import express from 'express';
import { createOrder, getAllOrders } from '../controllers/order.js'; // Import the getAllOrders function

const router = express.Router();

// Route to fetch all orders
router.get('/', getAllOrders);
router.post('/', createOrder)

export default router;
