
// // backend/server.js
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// require("dotenv").config(); // Nếu bạn có file .env

// const app = express();


// // Middleware
// app.use(cors());
// app.use(express.json());

// // Kết nối MongoDB

// connectDB();

// // Import routes
// const userRoutes = require("./routes/user");
// const authRoutes = require("./routes/auth");
// //const adminRoutes = require("./routes/admin");

// //const profileRoutes = require("./routes/profile");
// //app.use("/api/profile", profileRoutes);

// // Dùng routes
// app.use("/api", userRoutes);   
// app.use("/api/auth", authRoutes);  
// //app.use("/api/admin", adminRoutes);


// // Khởi động server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// const path = require('path');

// // Serve frontend (React build)
// app.use(express.static(path.join(__dirname, '../frontend/build')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });


// // backend/server.js
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// require("dotenv").config();
// const path = require("path");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Kết nối MongoDB
// connectDB();

// // Import routes
// const userRoutes = require("./routes/user");
// const authRoutes = require("./routes/auth");

// // Dùng routes API
// app.use("/api", userRoutes);
// app.use("/api/auth", authRoutes);

// // 🟩 Serve frontend (React build)
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// // app.get("/*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// // });
// app.get(/^\/(?!api).*/, (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
//   });
  

// // 🟢 Khởi động server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



// backend/server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Thêm middleware để log tất cả request
app.use((req, res, next) => {
  console.log(`📨 ${new Date().toISOString()} ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }
  next();
});

// Kết nối MongoDB
connectDB();

// 🟦 THÊM DÒNG NÀY: Serve static files (avatars)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('✅ Static files served from:', path.join(__dirname, 'uploads'));

// Import routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

// Dùng routes API
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);

// 🟩 Serve frontend (React build)
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// 🟢 Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));