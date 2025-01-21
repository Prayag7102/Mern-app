   const mongoose = require("mongoose");
  
  const connectDB = async () => {
    try {
      if (process.env.NODE_ENV === 'production') {
        await mongoose.connect(process.env.MONGO_LIVEURI);
      } else {
        await mongoose.connect(process.env.MONGO_URI);
      }
      console.log("MongoDB Connected");
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;

  module.exports = connectDB;
