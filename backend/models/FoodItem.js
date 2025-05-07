import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  ingredients: [String],
  category: {
    type: String,
    enum: ['Appetizer', 'Main Course', 'Side Dish', 'Dessert', 'Beverage'], // Only these values are allowed
    required: true
  },
  imageUrl: String, // URL for the image of the dish
  isFeatured: {
    type: Boolean,
    default: false // Set default to false so that it's not featured by default
  }
}, { timestamps: true });

export default mongoose.model('FoodItem', foodItemSchema);
