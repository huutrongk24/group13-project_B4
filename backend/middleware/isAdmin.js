
// backend/middleware/isAdmin.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = "DayLaMotChuoiBiMatSieuDaiVaKhongTheDoanDuoc123!@#";

module.exports = function(req, res, next) {
    console.log("=== 👑 IS ADMIN MIDDLEWARE ===");
    console.log("User from request:", req.user);
    console.log("User role:", req.user?.role);
    
    if (req.user && req.user.role === 'admin') {
        console.log("✅ User is admin, proceeding to controller...");
        next();
    } else {
        console.log("🔴 User is NOT admin, access denied");
        console.log("User ID:", req.user?.id);
        console.log("User role:", req.user?.role);
        res.status(403).json({ message: 'Truy cập bị từ chối. Yêu cầu quyền Admin.' });
    }
};