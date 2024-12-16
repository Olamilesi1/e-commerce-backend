import jwt from "jsonwebtoken";
import httpStatus from "http-status";

export const authenticate = (req, res, next) => {
  
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: "error",
      message: "No token provided!",
    });
  }

  try {
    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user information to the request object
    req.users = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: "error",
      message: "Invalid or expired token",
    });
  }
};