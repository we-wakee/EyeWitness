// middleware/auth.js

const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized - Invalid token payload" });
    }

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    // Attach user to request
    req.user = user;
    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(403).json({ message: "Forbidden - Invalid token" });
  }
};

module.exports = authMiddleware;
