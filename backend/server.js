
// backend/server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config(); // Nếu bạn có file .env

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB

connectDB();

// Import routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const profileRoutes = require("./routes/profile");
app.use("/api/profile", profileRoutes);

// Dùng routes
app.use("/api", userRoutes);   
app.use("/api/auth", authRoutes);  
app.use("/api/admin", adminRoutes);


// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

