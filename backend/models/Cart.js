// Cart.js (Mongoose Model)
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
    unique: true,  // Ensure each user only has one cart
  },
  foodItems: [{
    foodItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodItem', // Reference to the FoodItem collection
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Ensure that quantity is at least 1
    },
  }],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
