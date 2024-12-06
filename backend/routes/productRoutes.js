const express = require("express");
const { getProducts, addProduct, deleteProduct, updateProduct, addReview, editReview, deleteReview, getProductById } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
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


router.post("/:id/review", addReview);
router.put("/:id/reviews/:reviewId/user/:userId", editReview);
router.delete("/:id/reviews/:reviewId/user/:userId", deleteReview);

module.exports = router;
