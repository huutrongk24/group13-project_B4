// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = "DayLaMotChuoiBiMatSieuDaiVaKhongTheDoanDuoc123!@#";

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    console.log("=== 🔐 AUTH MIDDLEWARE ===");
    console.log("Request URL:", req.url);
    console.log("Request Method:", req.method);
    console.log("Token exists:", token ? "YES" : "NO");

    if (!token) {
        console.log("🔴 No token provided");
        return res.status(401).json({ message: 'Không có token, truy cập bị từ chối.' });
    }

    try {
        console.log("🟡 Verifying token...");
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("✅ Token decoded successfully");
        console.log("User ID:", decoded.id);
        console.log("User Role:", decoded.role);
        
        req.user = decoded;
        console.log("🟡 Calling next()...");
        next(); // QUAN TRỌNG: Phải gọi next() để chuyển tiếp
    } catch (err) {
        console.error("🔴 Token verification failed:", err.message);
        console.error("Error stack:", err.stack);
        res.status(401).json({ message: 'Token không hợp lệ.' });
    }
};