import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: 'User',
    required: true,
  },
  foodId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to FoodItem model
    ref: 'FoodItem',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Ratings should be between 1 and 5
  },
  comment: {
    type: String,
    required: true,
  }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const Review = mongoose.model('Review', reviewSchema);

export default Review;
