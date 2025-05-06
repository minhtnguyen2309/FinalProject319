import Cart from '../models/Cart.js';

// Get the user's cart (fully populated)
export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('foodItems.foodItem');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add a food item to the cart
export const addToCart = async (req, res) => {
  const { userId } = req.params;
  const { foodItemId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        foodItems: [{ foodItem: foodItemId, quantity }],
      });
      await cart.save();
    } else {
      const itemIndex = cart.foodItems.findIndex(
        (item) => item.foodItem.toString() === foodItemId
      );

      if (itemIndex === -1) {
        cart.foodItems.push({ foodItem: foodItemId, quantity });
      } else {
        cart.foodItems[itemIndex].quantity += quantity;
      }

      await cart.save();
    }

    const populatedCart = await Cart.findOne({ user: userId }).populate('foodItems.foodItem');
    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update quantity of a food item in the cart
export const updateCartItemQuantity = async (req, res) => {
  const { userId, foodItemId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    const itemIndex = cart.foodItems.findIndex(
      (item) => item.foodItem.toString() === foodItemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Food item not found in cart' });
    }

    cart.foodItems[itemIndex].quantity = quantity;
    await cart.save();

    const populatedCart = await Cart.findOne({ user: userId }).populate('foodItems.foodItem');
    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove a food item from the cart
export const removeCartItem = async (req, res) => {
  const { userId, foodItemId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    cart.foodItems = cart.foodItems.filter(
      (item) => item.foodItem.toString() !== foodItemId
    );

    await cart.save();

    const populatedCart = await Cart.findOne({ user: userId }).populate('foodItems.foodItem');
    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.foodItems = []; // ✅ clear the array
    await cart.save();   // ✅ persist to DB

    res.status(200).json(cart);
  } catch (err) {
    console.error('Error clearing cart:', err);
    res.status(500).json({ error: 'Server error while clearing cart' });
  }
};
