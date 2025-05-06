// cartRoutes.js

import express from 'express';
import { getCart, updateCartItemQuantity, removeCartItem, addToCart,clearCart} from '../controllers/cart.js';

const router = express.Router();

// Get the user's cart
router.get('/:userId/cart', getCart);

router.post('/:userId/cart', addToCart);

// Update food item quantity in the cart
router.put('/:userId/cart/:foodItemId', updateCartItemQuantity);

// Remove food item from the cart
router.delete('/:userId/cart/:foodItemId', removeCartItem); // Add this route for deleting food item from cart

// Clear all items from cart
router.delete('/clear/:userId', clearCart);

export default router;
