import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoute from "./routes/authRoutes.js"
import foodItemRoutes from './routes/foodItemRoutes.js'; // Import food item routes
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'

const app = express()
// Load the environemnt variables
dotenv.config()

// Connect to database
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
})

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected")
})

app.use(cors({
    origin: 'http://localhost:3000',  // Frontend URL
    credentials: true,  // Allow credentials to be sent in cross-origin requests
}));
  
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use('/api/fooditems', foodItemRoutes); // Use the food item routes
app.use('/api/orders', orderRoutes); // Register the order routes
app.use('/api/users', userRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/reviews', reviewRoutes)


// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(statusCode).json({ message });
});

app.listen(8800,() => {
    connect()
    console.log("Connected to backend!")
})



