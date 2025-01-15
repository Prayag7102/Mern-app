const Banner = require("../models/banner.model");
const path = require("path");
const redis = require("../config/redisClient"); 

const getBanners = async (req, res) => {
  try {
    const cacheKey = "banners"; 
    const cachedBanners = await redis.get(cacheKey); 

    if (cachedBanners) {
      return res.status(200).json({ banners: JSON.parse(cachedBanners) }); 
    }

    const banners = await Banner.find();
    await redis.set(cacheKey, JSON.stringify(banners), "EX", 3600); 
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
    const { id } = req.params; 
    const { title, imageIndex } = req.body; 
    const newImageFile = req.files.imageUrl ? req.files.imageUrl[0] : null; 

    if (!newImageFile) {
      return res.status(400).json({ message: "No image file provided" });
    }

   
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    if (imageIndex !== undefined && banner.imageUrl[imageIndex]) {
      banner.imageUrl[imageIndex] = path.basename(newImageFile.path);
    } else {
      return res.status(400).json({ message: "Invalid image index" });
    }

    if (title) {
      banner.title = title;
    }

    await banner.save();
    await redis.del("banners");
    res.status(200).json({ message: "Banner updated successfully", banner });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createBanner, updateBanner, getBanners };