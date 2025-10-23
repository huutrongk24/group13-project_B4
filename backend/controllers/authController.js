// // controllers/authController.js
// const User = require('../models/User'); // Import User model từ Hoạt động 5 của SV3
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Đăng ký
// exports.signup = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         // 1. Kiểm tra email đã tồn tại chưa
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: 'Email đã tồn tại' });
//         }

//         // 2. Tạo user mới
//         user = new User({ name, email, password });

//         // 3. Mã hóa mật khẩu
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         // 4. Lưu user vào DB
//         await user.save();

//         // 5. Tạo và trả về token (tương tự login)
//         const payload = { user: { id: user.id, role: user.role } };
//         jwt.sign(payload, 'YOUR_SECRET_KEY', { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;
//             res.status(201).json({ token });
//         });

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// };

// // Đăng nhập
// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // 1. Kiểm tra email có tồn tại không
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
//         }

//         // 2. So sánh mật khẩu
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
//         }

//         // 3. Tạo và trả về JWT token
//         const payload = { user: { id: user.id, role: user.role } };
//         jwt.sign(payload, 'YOUR_SECRET_KEY', { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         });

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// };




const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Đăng ký
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra email trùng
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email đã tồn tại" });

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "Đăng ký thành công" });
  } catch (err) {
    console.error("Lỗi đăng ký:", err);
    res.status(500).json({ message: "Lỗi server khi đăng ký" });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra user tồn tại
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email không tồn tại" });

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu" });

    // Tạo JWT token
    const token = jwt.sign({ id: user._id }, "secret123", { expiresIn: "1h" });

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Lỗi đăng nhập:", err);
    res.status(500).json({ message: "Lỗi server khi đăng nhập" });
  }
};

// Đăng xuất
exports.logout = async (req, res) => {
  res.json({ message: "Đăng xuất thành công (xóa token phía client)" });
};
