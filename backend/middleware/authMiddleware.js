const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  const token = req.cookies.admintoken;
  if (!token) {
    return res.status(200).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." }); 
    }

    req.user = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};


const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).json({ message: "Access token missing or invalid." });
  }

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
