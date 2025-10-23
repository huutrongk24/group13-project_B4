// // backend/server.js
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// require("dotenv").config(); // ✅ nếu bạn có file .env thì thêm dòng này, nếu không có thì vẫn OK

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Kết nối MongoDB
// connectDB();

// // Import routes
// const userRoutes = require("./routes/user");
// const authRoutes = require("./routes/auth"); // ✅ đặt đúng tên file

// // Dùng routes
// app.use("/api", userRoutes);       // Cũ: CRUD user
// app.use("/api/auth", authRoutes);  // Mới: Auth (signup, login, logout)

// // Khởi động server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const app = express();

// app.use(cors()); // ⚡ CHO PHÉP FRONTEND TRUY CẬP
// app.use(express.json());

// connectDB();

// // server.js
// const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes); // Thêm tiền tố /api/auth cho các route xác thực



// // Import route
// const userRoutes = require('./routes/user');

// // Sử dụng route có tiền tố /api
// app.use('/api', userRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


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

// Routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
// Import routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth"); // ✅ đặt đúng tên file

// Dùng routes
app.use("/api", userRoutes);       // Cũ: CRUD user
app.use("/api/auth", authRoutes);  // Mới: Auth (signup, login, logout)

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
