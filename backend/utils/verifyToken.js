import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from 'dotenv/config'; // Use .env for JWT_SECRET

// Verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token'); // Token should be sent in the "x-auth-token" header

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId; // Attach the userId from the token to the request object
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default verifyToken;
