import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User', // This links the order to a User document
    required: true // Each order must be linked to a user
  },
  foodItems: [{
    foodItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodItem'
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Canceled'],
    default: 'Pending'
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'PayPal'],
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
