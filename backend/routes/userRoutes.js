import express from 'express';
import { getUserOrderHistory } from '../controllers/user.js'; // Import the controller function

const router = express.Router();

// Route to fetch order history by userId
router.get('/:userId/orders', getUserOrderHistory);

export default router;