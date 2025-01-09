const express = require("express");
const {protect} = require("../middleware/authMiddleware")
const { registerUser, loginUser, getAllUsers, getUserById } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", protect, getAllUsers);
router.get("/:id", getUserById);

module.exports = router;
