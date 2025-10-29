// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const auth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) return res.status(401).json({ message: "Vui lòng đăng nhập" });

//     const decoded = jwt.verify(token, "secret123"); // hoặc process.env.JWT_SECRET
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(401).json({ message: "User không tồn tại" });

//     req.user = user; // lưu user vào request
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Token không hợp lệ" });
//   }
// };

// // Kiểm tra quyền Admin
// exports.adminMiddleware = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Access denied. Admins only.' });
//   }
//   next();
// };

// module.exports = auth;

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware xác thực người dùng
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Vui lòng đăng nhập" });
    }

    const decoded = jwt.verify(token, "secret123"); // hoặc process.env.JWT_SECRET
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User không tồn tại" });
    }

    req.user = user; // lưu user vào request
    next();
  } catch (err) {
    res.status(401).json({ message: "Token không hợp lệ" });
  }
};

// Middleware kiểm tra quyền Admin
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// ✅ Export cả hai middleware
module.exports = { authMiddleware, adminMiddleware };
