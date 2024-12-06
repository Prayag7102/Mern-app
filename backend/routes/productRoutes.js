const express = require("express");
const { getProducts, addProduct, deleteProduct, updateProduct, addReview, editReview, deleteReview, getProductById } = require("../controllers/productController");
const { protect, verifyToken } = require("../middleware/authMiddleware");
const multer = require("multer");

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); 
    },
  });
  
const upload = multer({ storage });
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/",upload.single("image"),protect, addProduct);
router.delete("/:id",protect, deleteProduct);
router.put("/:id",upload.single("image"), protect, updateProduct);

// Add review
router.post("/:id/review", verifyToken, addReview);

// Edit review
router.put("/:id/review/:reviewId", verifyToken, editReview);

// Delete review
router.delete("/:id/review/:reviewId", verifyToken, deleteReview);

module.exports = router;
