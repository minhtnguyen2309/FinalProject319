import User from '../models/User.js'; // Import the User model

// Fetch all orders by userId (using orderHistory)
export const getUserOrderHistory = async (req, res, next) => {
  const { userId } = req.params;  // Get userId from the request params

  try {
    // Find the user and populate the orderHistory field
    const user = await User.findById(userId)
      .populate('orderHistory')  // Populate the orderHistory field
      .exec();

    // If user is not found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If no orders in the user's history
    if (!user.orderHistory || user.orderHistory.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    // Return the user's order history
    res.status(200).json(user.orderHistory);
  } catch (err) {
    console.error(err);
    next(err);  // Pass the error to the error handling middleware
  }
};
