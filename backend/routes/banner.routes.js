const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { uploadFields } = require("../middleware/ImagesMiddleware");
const { createBanner, updateBanner, getBanners } = require("../controllers/banner.controller");

const router = express.Router();

router.post("/upload", protect, uploadFields, createBanner);
router.put("/:id", protect, uploadFields, updateBanner);
router.get("/", protect, getBanners);

module.exports = router;