const Banner = require("../models/banner.model");
const path = require("path");

const createBanner = async (req, res) => {
  try {
    const { title } = req.body;
    const imageUrls = req.files.imageUrl ? req.files.imageUrl.map(file => path.basename(file.path)) : [];
   
    const newBanner = new Banner({
      title,
      imageUrl: imageUrls,
    });

    await newBanner.save();
    res.status(201).json({ message: "Banner created successfully", banner: newBanner });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateBanner = async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const imageUrls = req.files.imageUrl ? req.files.imageUrl.map(file => path.basename(file.path)) : [];
  
      const updatedData = { title };
      if (imageUrls.length > 0) {
        updatedData.imageUrl = imageUrls;
      }
  
      const updatedBanner = await Banner.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedBanner) {
        return res.status(404).json({ message: "Banner not found" });
      }
  
      res.status(200).json({ message: "Banner updated successfully", banner: updatedBanner });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

module.exports = { createBanner, updateBanner };