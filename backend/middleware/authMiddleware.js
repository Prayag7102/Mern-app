const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};


const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access token missing or invalid." });
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); 

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user; 
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};


module.exports = { protect,verifyToken };
