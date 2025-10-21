// backend/server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config(); // ✅ nếu bạn có file .env thì thêm dòng này, nếu không có thì vẫn OK

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
connectDB();

// Import routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth"); // ✅ đặt đúng tên file

// Dùng routes
app.use("/api", userRoutes);       // Cũ: CRUD user
app.use("/api/auth", authRoutes);  // Mới: Auth (signup, login, logout)

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
