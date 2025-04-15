const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res) => {
  const { username, password } = req.body;

  const adminExists = await Admin.findOne({});

  if (adminExists) {
    return res.status(401).json({ message: "An admin already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ username, password: hashedPassword });

  try {
    await admin.save();
    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ message: "Admin created successfully", token }); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(400).json({ message: "Invalid username or password" });
  }
  
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: "1d" });


  res.cookie("admintoken", token, {
    httpOnly: true,
    secure: false, 
    sameSite: "Lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ token,
    admin: {
      id: admin._id,
      username: admin.username,
    },

  });
};

const logoutAdmin = (req, res) => {
  res.clearCookie("admintoken", {
    httpOnly: true,
    sameSite: "Lax", 
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged out successfully" });
};


module.exports = { createAdmin, loginAdmin,logoutAdmin };
