const Banner = require("../models/banner.model");
const path = require("path");

const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({ banners });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


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
    const { id } = req.params; // Banner ID
    const { title, imageIndex } = req.body; // Image index to update
    const newImageFile = req.files.imageUrl ? req.files.imageUrl[0] : null; // New image file

    if (!newImageFile) {
      console.log("No image file provided");
      return res.status(400).json({ message: "No image file provided" });
    }

    // Find the banner by ID
    const banner = await Banner.findById(id);
    if (!banner) {

      return res.status(404).json({ message: "Banner not found" });
    }

    if (imageIndex !== undefined && banner.imageUrl[imageIndex]) {
      banner.imageUrl[imageIndex] = path.basename(newImageFile.path);
    } else {
      console.log("Invalid image index");
      return res.status(400).json({ message: "Invalid image index" });
    }

    if (title) {
      banner.title = title;
    }

    await banner.save();

    res.status(200).json({ message: "Banner updated successfully", banner });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createBanner, updateBanner, getBanners };