const express = require("express");
const { getProducts, addProduct, deleteProduct, updateProduct } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, addProduct);
router.delete("/:id",protect, deleteProduct);
router.put("/:id", protect, updateProduct);

module.exports = router;
