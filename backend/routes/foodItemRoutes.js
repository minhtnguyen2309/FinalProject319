import express from 'express';
import { getAllFoodItems, getFoodItemById, getFeaturedFoodItems } from '../controllers/foodItem.js';

const router = express.Router();

// Route to fetch all featured food items
router.get('/featured', getFeaturedFoodItems);

// Route to fetch all food items
router.get('/', getAllFoodItems);

// Route to fetch a single food item by ID
router.get('/:id', getFoodItemById);

export default router;
