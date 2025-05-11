import Review from '../models/Review.js';
import FoodItem from '../models/FoodItem.js';
import { createError } from '../utils/error.js'; // Assuming you have a custom error handler

// Controller to retrieve all reviews by foodId
export const getReviewsByFoodId = async (req, res, next) => {
  const { foodId } = req.params; // Get foodId from the route parameters

  try {
    // Fetch all reviews related to the given foodId
    const reviews = await Review.find({ foodId }).populate('userId', 'firstName lastName'); // Populate user details

    // If no reviews are found
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this food item' });
    }

    // Return reviews in the response
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    next(createError(500, 'Failed to retrieve reviews'));
  }
};

// Controller to create a new review
export const createReview = async (req, res, next) => {
  const { userId, foodId, rating, comment } = req.body; // Get review data from the request body

  try {
    // Check if the food item exists
    const foodItem = await FoodItem.findById(foodId);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    // Create a new review
    const newReview = new Review({
      userId,    // User who is creating the review
      foodId,    // The food item that the review is for
      rating,    // Rating (1 to 5)
      comment,   // Review comment
    });

    // Save the review to the database
    await newReview.save();

    // Respond with the newly created review
    res.status(201).json({
      message: 'Review created successfully',
      review: newReview,
    });
  } catch (err) {
    console.error(err);
    next(createError(500, 'Failed to create review'));
  }
};
