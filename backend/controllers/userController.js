// // backend/controllers/userController.js
// const User = require('../models/User');

// exports.getUsers = async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// };

// exports.createUser = async (req, res) => {
//   const { name, email } = req.body;
//   if (!name || !email) return res.status(400).json({ message: 'Name and email required' });
//   const exists = await User.findOne({ email });
//   if (exists) return res.status(400).json({ message: 'Email exists' });
//   const newUser = await User.create({ name, email });
//   res.status(201).json(newUser);
// };
// exports.updateUser = async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;
//   const user = await User.findByIdAndUpdate(id, updates, { new: true });
//   if (!user) return res.status(404).json({ message: "User not found" });
//   res.json(user);
// };

// exports.deleteUser = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findByIdAndDelete(id);
//   if (!user) return res.status(404).json({ message: "User not found" });
//   res.json({ message: "User deleted" });
// };


const User = require("../models/User");

// 🟩 Lấy danh sách users
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// 🟦 Tạo user
exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ message: "Name and email required" });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email exists" });
  const newUser = await User.create({ name, email });
  res.status(201).json(newUser);
};

// 🟨 Cập nhật user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// 🟥 Xóa user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
};

// 🟪 Upload Avatar
exports.uploadAvatar = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra user tồn tại
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Kiểm tra có file không
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Dữ liệu từ Cloudinary
    const imageUrl = req.file.path || req.file.url; // <--- Thêm dòng này

    if (!imageUrl) {
      return res.status(400).json({ message: "Upload failed: no image URL received" });
    }

    // Cập nhật avatar URL
    user.avatar = imageUrl;
    await user.save();

    res.json({
      message: "Avatar uploaded successfully",
      avatar: imageUrl,
      user,
    });
  } catch (err) {
    console.error("Upload avatar error:", err);
    res.status(500).json({ message: "Server error uploading avatar" });
  }
};

