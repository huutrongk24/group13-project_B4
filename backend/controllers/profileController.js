const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// PUT profile
// exports.updateProfile = async (req, res) => {
//   try {
//     const { name, email, password, avatar } = req.body;
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User không tồn tại" });

//     // Cập nhật thông tin
//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (avatar) user.avatar = avatar;
//     if (password) {
//       const hashed = await bcrypt.hash(password, 10);
//       user.password = hashed;
//     }

//     await user.save();
//     res.json({ message: "Cập nhật thành công", user });
//   } catch (err) {
//     console.error(err); // 🔥 Đây là chỗ xem chi tiết lỗi
//     res.status(500).json({ message: "Lỗi server" });
//   }
// };

exports.updateProfile = async (req, res) => {
    try {
      const { name, email, password, avatar } = req.body;
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User không tồn tại" });
  
      // Cập nhật thông tin
      if (name) user.name = name;
  
      if (email && email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "Email đã tồn tại" });
        }
        user.email = email;
      }
  
      if (avatar) user.avatar = avatar;
      if (password) {
        const hashed = await bcrypt.hash(password, 10);
        user.password = hashed;
      }
  
      await user.save();
      res.json({ message: "Cập nhật thành công", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi server" });
    }
  };
  //
