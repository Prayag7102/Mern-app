const express = require("express");
const {  verifyToken, protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  logoutUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/user-check", verifyToken, (req, res) => {
    return res.json({ success: true, user: req.user });
});


router.post("/logout", logoutUser);
router.get("/", protect, getAllUsers);
router.get("/:id", getUserById);


module.exports = router;
