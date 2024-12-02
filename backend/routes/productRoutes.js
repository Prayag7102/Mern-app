const express = require("express");
const { getProducts, addProduct, deleteProduct, updateProduct } = require("../controllers/productController");
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
router.post("/",upload.single("image"),protect, addProduct);
router.delete("/:id",protect, deleteProduct);
router.put("/:id", protect, updateProduct);

module.exports = router;
