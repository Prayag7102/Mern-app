const multer = require("multer");



const upload = multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }) });
  
  const uploadFields = upload.fields([
    { name: "image", maxCount: 1 }, // This should be `image` (not `image[]` or something else)
    { name: "otherImages", maxCount: 10 }, // Optional for other images
  ]);

  module.exports = {uploadFields};