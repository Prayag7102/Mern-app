const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use('/api/cart', require("./routes/cartRoutes"));
app.use("/api/checkout", require("./routes/checkoutRoutes"));
app.use("/api/banner", require("./routes/banner.routes"));
app.use("/api/contact", require("./routes/contact.routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Backend API running...");
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
