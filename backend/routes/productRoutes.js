const express = require("express");
const { getProducts, addProduct, deleteProduct, updateProduct, addReview, editReview, deleteReview, getProductById, getProductsAll, updateProductOtherImage } = require("../controllers/productController");
const { protect, verifyToken } = require("../middleware/authMiddleware");
const { uploadFields } = require("../middleware/ImagesMiddleware");


const router = express.Router();
router.get("/", getProducts);
router.get("/all",protect,getProductsAll);
router.get("/:id", getProductById);
router.post("/", uploadFields, protect, addProduct); 
router.delete("/:id", protect, deleteProduct);
router.put("/:id",uploadFields, protect, updateProduct);

router.post("/:id/review", verifyToken, addReview);
router.put("/:id/review/:reviewId", verifyToken, editReview);
router.delete("/:id/review/:reviewId", verifyToken, deleteReview);

module.exports = router;