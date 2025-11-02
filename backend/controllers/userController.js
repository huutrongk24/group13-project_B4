
// backend/controllers/userController.js
const User = require("../models/User");

// 🟦 Lấy thông tin profile
exports.getProfile = async (req, res) => {
  try {
    console.log("=== 🟦 GET PROFILE ===");
    console.log("User ID từ token:", req.user.id);
    
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      console.log("🔴 User không tồn tại trong database");
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    
    console.log("✅ User found:", user);
    res.json(user);
  } catch (err) {
    console.error("🔴 LỖI getProfile:", err);
    res.status(500).json({ message: "Lỗi server khi lấy thông tin profile" });
  }
};

// 🟦 Cập nhật profile (tên)
exports.updateProfile = async (req, res) => {
  try {
    console.log("=== 🟦 UPDATE PROFILE ===");
    console.log("User ID:", req.user.id);
    console.log("Data nhận được:", req.body);

    const { name } = req.body;

    if (!name) {
      console.log("🔴 Tên không được cung cấp");
      return res.status(400).json({ message: "Tên không được để trống" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name: name },
      { new: true }
    ).select("-password");

    if (!user) {
      console.log("🔴 Không tìm thấy user để update");
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    console.log("✅ Update thành công:", user);
    res.json(user);
  } catch (err) {
    console.error("🔴 LỖI updateProfile:", err);
    console.error("Chi tiết lỗi:", err.message);
    res.status(500).json({ message: "Lỗi server khi cập nhật profile: " + err.message });
  }
};

// 🟦 Upload avatar
exports.uploadAvatar = async (req, res) => {
  try {
    console.log("=== 🟦 UPLOAD AVATAR ===");
    console.log("User ID:", req.user.id);
    console.log("File object:", req.file);
    console.log("File details:", {
      originalname: req.file?.originalname,
      filename: req.file?.filename,
      path: req.file?.path,
      size: req.file?.size
    });
    
    if (!req.file) {
      console.log("🔴 Không có file được upload");
      return res.status(400).json({ message: "Vui lòng chọn file ảnh" });
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    console.log("Avatar URL:", avatarUrl);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: avatarUrl },
      { new: true }
    ).select("-password");

    if (!user) {
      console.log("🔴 Không tìm thấy user để update avatar");
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    console.log("✅ Avatar upload thành công:", user);
    
    res.json({
      message: "Upload avatar thành công",
      avatarUrl: user.avatar,
      user: user
    });
  } catch (err) {
    console.error("🔴 LỖI uploadAvatar:", err);
    console.error("Stack trace:", err.stack);
    res.status(500).json({ message: "Lỗi server khi upload avatar: " + err.message });
  }
};

// 🟦 Lấy danh sách users (admin)
// backend/controllers/userController.js - trong hàm getUsers
exports.getUsers = async (req, res) => {
  try {
    console.log("=== 👥 GET USERS CONTROLLER ===");
    console.log("Request user:", req.user);
    
    const users = await User.find().select("-password");
    console.log("✅ Users found:", users.length);
    console.log("Users data:", users);
    
    res.json(users);
  } catch (err) {
    console.error("🔴 LỖI getUsers:", err);
    console.error("Error stack:", err.stack);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách users" });
  }
};

// 🟦 Xóa user (admin)
exports.deleteUser = async (req, res) => {
  try {
    console.log("🟦 deleteUser called:", { adminId: req.user.id, deleteUserId: req.params.id });
    
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    
    console.log("✅ User deleted successfully");
    res.json({ message: "Xóa người dùng thành công" });
  } catch (err) {
    console.error("Lỗi deleteUser:", err);
    res.status(500).json({ message: "Lỗi server khi xóa user" });
  }
};
