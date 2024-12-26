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
    { name: "image", maxCount: 1 }, 
    { name: "otherImages", maxCount: 10 },
    { name: "imageUrl", maxCount: 10 },
  ]);

  module.exports = {uploadFields};