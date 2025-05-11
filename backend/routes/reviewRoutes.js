import express from 'express';
import { getReviewsByFoodId, createReview } from '../controllers/review.js';

const router = express.Router();

// Route to get all reviews for a specific foodId
router.get('/:foodId', getReviewsByFoodId);

// Route to create a new review
router.post('/', createReview);

export default router;
