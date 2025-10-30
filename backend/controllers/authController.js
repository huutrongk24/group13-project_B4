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




// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Đăng ký
// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Kiểm tra email trùng
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "Email đã tồn tại" });

//     // Mã hóa mật khẩu
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Tạo user mới
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     res.json({ message: "Đăng ký thành công" });
//   } catch (err) {
//     console.error("Lỗi đăng ký:", err);
//     res.status(500).json({ message: "Lỗi server khi đăng ký" });
//   }
// };

// // Đăng nhập
// // exports.login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     // Kiểm tra user tồn tại
// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(400).json({ message: "Email không tồn tại" });

// //     // Kiểm tra mật khẩu
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu" });

// //     // Tạo JWT token
// //     const token = jwt.sign({ id: user._id }, "secret123", { expiresIn: "1h" });

// //     res.json({
// //       message: "Đăng nhập thành công",
// //       token,
// //       user: { id: user._id, name: user.name, email: user.email },
// //     });
// //   } catch (err) {
// //     console.error("Lỗi đăng nhập:", err);
// //     res.status(500).json({ message: "Lỗi server khi đăng nhập" });
// //   }
// // };
// // Đăng nhập
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Kiểm tra user tồn tại
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Email không tồn tại" });

//     // Kiểm tra mật khẩu
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu" });

//     // 🔹 Tạo JWT token có chứa role
//     const token = jwt.sign(
//       { id: user._id, role: user.role }, // thêm role vào token
//       "secret123",
//       { expiresIn: "1h" }
//     );

//     // 🔹 Trả về thông tin user + role
//     res.json({
//       message: "Đăng nhập thành công",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role, // thêm dòng này
//       },
//     });
//   } catch (err) {
//     console.error("Lỗi đăng nhập:", err);
//     res.status(500).json({ message: "Lỗi server khi đăng nhập" });
//   }
// };



// // Đăng xuất
// exports.logout = async (req, res) => {
//   res.json({ message: "Đăng xuất thành công (xóa token phía client)" });
// };





















// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Đăng ký
// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Kiểm tra email trùng
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "Email đã tồn tại" });

//     // Mã hóa mật khẩu
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Tạo user mới
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     res.json({ message: "Đăng ký thành công" });
//   } catch (err) {
//     console.error("Lỗi đăng ký:", err);
//     res.status(500).json({ message: "Lỗi server khi đăng ký" });
//   }
// };

// // Đăng nhập
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Kiểm tra user tồn tại
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Email không tồn tại" });

//     // ✅ Nếu mật khẩu trong DB chưa mã hóa thì mã hóa lại
//     if (!user.password.startsWith("$2b$")) {
//       const hashed = await bcrypt.hash(user.password, 10);
//       user.password = hashed;
//       await user.save();
//       console.log("🔁 Đã tự động mã hóa mật khẩu cho user:", user.email);
//     }

//     // So sánh mật khẩu nhập vào
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu" });

//     // 🔹 Tạo JWT token có chứa role
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       "secret123",
//       { expiresIn: "1h" }
//     );

//     // 🔹 Trả về thông tin user + role
//     res.json({
//       message: "Đăng nhập thành công",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error("Lỗi đăng nhập:", err);
//     res.status(500).json({ message: "Lỗi server khi đăng nhập" });
//   }
// };

// // Đăng xuất
// exports.logout = async (req, res) => {
//   res.json({ message: "Đăng xuất thành công (xóa token phía client)" });
// };










// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // 🟩 Đăng ký
// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Kiểm tra email trùng
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "Email đã tồn tại" });

//     // Mã hóa mật khẩu
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // ✅ Thêm role vào user mới (nếu không có thì mặc định là 'student')
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: role || "student",
//     });

//     await newUser.save();

//     res.json({ message: "Đăng ký thành công" });
//   } catch (err) {
//     console.error("Lỗi đăng ký:", err);
//     res.status(500).json({ message: "Lỗi server khi đăng ký" });
//   }
// };

// // 🟦 Đăng nhập
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Kiểm tra user tồn tại
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Email không tồn tại" });

//     // So sánh mật khẩu (đã mã hóa)
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu" });

//     // 🔹 Tạo JWT token có chứa role
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       "secret123",
//       { expiresIn: "1h" }
//     );

//     // 🔹 Trả về thông tin user + role
//     res.json({
//       message: "Đăng nhập thành công",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error("Lỗi đăng nhập:", err);
//     res.status(500).json({ message: "Lỗi server khi đăng nhập" });
//   }
// };

// // 🟥 Đăng xuất
// exports.logout = async (req, res) => {
//   res.json({ message: "Đăng xuất thành công (xóa token phía client)" });
// };











// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// // ---------------------
// // 🟩 Forgot Password
// // ---------------------
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Tìm user theo email
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Email không tồn tại" });

//     // Tạo token reset (hết hạn sau 15 phút)
//     const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "15m",
//     });

//     // Tạo link reset
//     const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

//     // Gửi email cho người dùng
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Hệ thống" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Đặt lại mật khẩu",
//       html: `
//         <p>Xin chào ${user.name},</p>
//         <p>Bạn vừa yêu cầu đặt lại mật khẩu. Nhấn vào link dưới đây để đổi mật khẩu:</p>
//         <a href="${resetLink}">${resetLink}</a>
//         <p>Link có hiệu lực trong 15 phút.</p>
//       `,
//     });

//     res.json({ message: "Đã gửi link đặt lại mật khẩu qua email!" });
//   } catch (err) {
//     console.error("Lỗi forgotPassword:", err);
//     res.status(500).json({ message: "Lỗi server khi gửi email" });
//   }
// };

// // ---------------------
// // 🟦 Reset Password
// // ---------------------
// exports.resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { newPassword } = req.body;

//     // Xác thực token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Tìm user theo id
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(400).json({ message: "Người dùng không tồn tại" });

//     // Mã hóa mật khẩu mới
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Cập nhật mật khẩu
//     user.password = hashedPassword;
//     await user.save();

//     res.json({ message: "Đặt lại mật khẩu thành công!" });
//   } catch (err) {
//     console.error("Lỗi resetPassword:", err);
//     res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
//   }
// };





const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
require("dotenv").config();

// ---------------------
// 🟩 Signup
// ---------------------
// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Kiểm tra email trùng
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "Email đã tồn tại" });

//     // Mã hóa mật khẩu
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Tạo user mới
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: role || "admin", // ⚠️ sửa lại cho khớp enum trong model (admin, teacher, user, v.v.)
//     });

//     await newUser.save();
//     res.json({ message: "Đăng ký thành công" });
//   } catch (err) {
//     console.error("Lỗi đăng ký:", err);
//     res.status(500).json({ message: "Lỗi server khi đăng ký" });
//   }
// };

// 🟩 Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email đã tồn tại" });

    // ❌ KHÔNG hash ở đây
    const newUser = new User({
      name,
      email,
      password, // model sẽ tự hash
      role: role || "admin",
    });

    await newUser.save();
    res.json({ message: "Đăng ký thành công" });
  } catch (err) {
    console.error("Lỗi đăng ký:", err);
    res.status(500).json({ message: "Lỗi server khi đăng ký" });
  }
};



// ---------------------
// 🟦 Login
// ---------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email không tồn tại" });

    // So sánh mật khẩu (thêm log debug)
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(">>> Debug login:", {
      gotEmail: email,
      gotPasswordType: typeof password,   // should be "string"
      gotPassword: password,
      hashInDB: user.password,
      isMatch
    });

    if (!isMatch)
      return res.status(400).json({ message: "Sai mật khẩu" });

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Lỗi đăng nhập:", err);
    res.status(500).json({ message: "Lỗi server khi đăng nhập" });
  }
};

// ---------------------
// 🟥 Logout
// ---------------------
exports.logout = async (req, res) => {
  res.json({ message: "Đăng xuất thành công (xóa token phía client)" });
};

// ---------------------
// 🟨 Forgot Password
// ---------------------
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email không tồn tại" });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Hệ thống" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Đặt lại mật khẩu",
      html: `
        <p>Xin chào ${user.name},</p>
        <p>Bạn vừa yêu cầu đặt lại mật khẩu. Nhấn vào link dưới đây để đổi mật khẩu:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Link có hiệu lực trong 15 phút.</p>
      `,
    });

    res.json({ message: "Đã gửi link đặt lại mật khẩu qua email!" });
  } catch (err) {
    console.error("Lỗi forgotPassword:", err);
    res.status(500).json({ message: "Lỗi server khi gửi email" });
  }
};

// ---------------------
// 🟪 Reset Password
// ---------------------
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(400).json({ message: "Người dùng không tồn tại" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Đặt lại mật khẩu thành công!" });
  } catch (err) {
    console.error("Lỗi resetPassword:", err);
    res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};
