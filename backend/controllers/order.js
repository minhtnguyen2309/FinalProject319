import Order from '../models/Order.js'; // Import the Order model
import FoodItem from '../models/FoodItem.js';

// Fetch all orders
export const getAllOrders = async (req, res, next) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find().populate('foodItems.foodItem'); // Populating the `foodItem` field to get full food item details

    // If no orders are found
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    // Return the orders in the response
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    next(err); // Pass the error to the error handling middleware
  }
};

// Create a new order
export const createOrder = async (req, res, next) => {
  const { user, foodItems, deliveryAddress, paymentMethod } = req.body;

  try {
    // Validate input
    if (!user || !foodItems || foodItems.length === 0 || !paymentMethod) {
      return next(createError(400, 'Missing required fields'));
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const item of foodItems) {
      const food = await FoodItem.findById(item.foodItem);
      if (!food) {
        return next(createError(404, `Food item not found: ${item.foodItem}`));
      }
      totalAmount += food.price * item.quantity;
    }

    // Create and save the order
    const newOrder = new Order({
      user,
      foodItems,
      totalAmount,
      deliveryAddress,
      paymentMethod,
    });

    await newOrder.save();

    // Respond with created order
    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder
    });
  } catch (err) {
    console.error(err);
    next(createError(500, 'Failed to place order'));
  }
};


