const express = require("express");
const { createAdmin, loginAdmin, logoutAdmin} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-admin", createAdmin);
router.post("/admin/login", loginAdmin);


router.get("/admin-check", protect, (req, res) => {
    return res.json({ success: true, admin: req.user });
});

router.post("/logout", logoutAdmin);

module.exports = router;
