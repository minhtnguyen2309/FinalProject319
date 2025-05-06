import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import the AuthContext to access userId

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { userId } = useAuth();  // <-- Here we use userId from AuthContext
  const [cart, setCart] = useState({
    foodItems: [],  // Array of items in the cart
  });
  const [loading, setLoading] = useState(true); // Loading state to handle async operations
  const [debounceTimeout, setDebounceTimeout] = useState(null); // Store timeout reference for debouncing
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const newTotal = cart.foodItems.reduce(
      (sum, item) => sum + item.foodItem.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cart]);
  

  // Fetch the user's cart when the component mounts or userId changes
  useEffect(() => {
    // Don't fetch if userId is not available
    if (!userId) return;

    // Check if cart is in localStorage first
    const storedCart = localStorage.getItem(`cart_${userId}`);
    if (storedCart) {
      setCart(JSON.parse(storedCart)); // Use cached cart data
      setLoading(false); // Turn off loading state
    } else {
      // Fetch cart from backend if not in localStorage
      const fetchCart = async () => {
        try {
          const response = await axios.get(`http://localhost:8800/api/cart/${userId}/cart`);
          setCart(response.data); // Set cart state with fetched data
          localStorage.setItem(`cart_${userId}`, JSON.stringify(response.data)); // Store cart in localStorage
          setLoading(false); // Turn off loading state
        } catch (err) {
          console.error('Error fetching cart:', err);
          setLoading(false); // Turn off loading state even in case of error
        }
      };

      fetchCart();
    }
    // console.log(cart)
  }, [userId]);  // Runs only when userId changes

  // Optimistically update the cart state
  const updateItemQuantity = async (foodItemId, quantity) => {
    // Update the UI optimistically
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      updatedCart.foodItems = updatedCart.foodItems.map(item => {
        if (item.foodItem._id === foodItemId) {
          return { ...item, quantity };
        }
        return item;
      });
      return updatedCart;
    });

    // Debounce the API call to avoid making too many requests
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear previous timeout
    }

    const newTimeout = setTimeout(async () => {
      try {
        const response = await axios.put(`http://localhost:8800/api/cart/${userId}/cart/${foodItemId}`, {
          quantity,
        });
        setCart(response.data); // Update the cart with the response from the backend
        localStorage.setItem(`cart_${userId}`, JSON.stringify(response.data)); // Update localStorage
      } catch (err) {
        console.error('Error updating item quantity:', err);
      }
    }, 500); // Delay the request by 500ms (adjust as needed)

    setDebounceTimeout(newTimeout); // Store the new timeout
  };

  // Add an item to the cart
  const addToCart = async (foodItem) => {
    try {
      const response = await axios.post(`http://localhost:8800/api/cart/${userId}/cart`, {
        foodItemId: foodItem._id,
        quantity: 1,  // Adjust this as needed
      });
      setCart(response.data);
      localStorage.setItem(`cart_${userId}`, JSON.stringify(response.data)); // Update localStorage
    } catch (err) {
      console.error('Error adding item to cart:', err);
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (foodItemId) => {
    try {
      const response = await axios.delete(`http://localhost:8800/api/cart/${userId}/cart/${foodItemId}`);
      setCart(response.data); // Update the cart after removal
      localStorage.setItem(`cart_${userId}`, JSON.stringify(response.data)); // Update localStorage
    } catch (err) {
      console.error('Error removing item from cart:', err);
    }
  };

  // Calculate the total price of the items in the cart
  const getTotal = () => {
    // if (!cart || !Array.isArray(cart.foodItems)) return 0;
    return cart.foodItems.reduce(
      (total, item) => total + item.foodItem.price * item.quantity,
      0
    );
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8800/api/cart/clear/${userId}`
      );
      setCart({ foodItems: [] });
      localStorage.setItem(`cart_${userId}`, JSON.stringify(response.data));
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      total,
      addToCart,
      updateItemQuantity,
      removeFromCart,
      getTotal,
      clearCart,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};
