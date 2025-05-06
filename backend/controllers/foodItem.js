import FoodItem from '../models/FoodItem.js'; // Import the FoodItem model

// Fetch all food items
export const getAllFoodItems = async (req, res, next) => {
  try {
    // Fetch all food items from the database
    const foodItems = await FoodItem.find();

    // If no food items are found
    if (!foodItems || foodItems.length === 0) {
      return res.status(404).json({ message: 'No food items found' });
    }

    // Return the food items in the response
    res.status(200).json(foodItems);
  } catch (err) {
    console.error(err);
    next(err); // Pass the error to the error handling middleware
  }
};

// Fetch a single food item by its ID
export const getFoodItemById = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find a food item by its ID
    const foodItem = await FoodItem.findById(id);

    // If food item is not found
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    // Return the found food item in the response
    res.status(200).json(foodItem);
  } catch (err) {
    console.error(err);
    next(err); // Pass the error to the error handling middleware
  }
};

// Fetch all featured food items
export const getFeaturedFoodItems = async (req, res, next) => {
  try {
    // Fetch all featured food items where isFeatured is true
    const featuredFoodItems = await FoodItem.find({ isFeatured: true });

    // If no featured food items are found
    if (!featuredFoodItems || featuredFoodItems.length === 0) {
      return res.status(404).json({ message: 'No featured food items found' });
    }

    // Return the featured food items in the response
    res.status(200).json(featuredFoodItems);
  } catch (err) {
    console.error(err);
    next(err); // Pass the error to the error handling middleware
  }
};
