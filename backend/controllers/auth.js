import bcrypt from 'bcryptjs';
import User from "../models/User.js"
import { createError } from '../utils/error.js'; // Import the createError function
import jwt from "jsonwebtoken"

// Register a new user (without generating JWT token)
export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    // Check if user already exists or not
    if (userExists) {
      return next(createError(400, 'User already exists')); // Using createError function
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await newUser.save();
    
    // Send response indicating user has been created successfully
    res.status(201).json({
      message: 'User created successfully'
    });

  } catch (err) {
    console.error(err);
    next(createError(500, 'Server error')); // Using createError function
  }
};


// Login user
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(400, 'Invalid credentials')); // Using createError function
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createError(400, 'Invalid credentials')); // Using createError function
    }

    // Create JWT Token (for login only)
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Set JWT token in a cookie (HTTP-only and Secure)
    res.cookie('jwt', token, {
      httpOnly: true, // Makes the cookie HTTP-only (not accessible by JavaScript)
      secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production (when HTTPS is enabled)
      maxAge: 3600000, // 1 hour (same as token expiration)
      sameSite: 'Strict', // Prevents cross-site request forgery (CSRF)
    });

    // Send response with success message
    res.status(200).json({
      message: 'Login successful',
    });
  } catch (err) {
    console.error(err);
    next(createError(500, 'Server error')); // Using createError function
  }
};


export const logout = (req, res) => {
  // Clear the JWT Token in the response (client-side must handle token removal)
  res.clearCookie('jwt', {
    httpOnly: true,  // Ensures cookie can't be accessed via JavaScript
    secure: process.env.NODE_ENV === 'production', // Only set this for production when HTTPS is used
    sameSite: 'Strict', // Prevents CSRF attacks
  });

  res.status(200).json({ message: 'Logged out successfully' });
};










