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
  category: String, // For example: "Appetizer", "Main Course"
  imageUrl: String // URL for the image of the dish
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);
