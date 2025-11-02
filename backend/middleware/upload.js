// // backend/middleware/upload.js
// const multer = require('multer');

// // Cấu hình lưu trữ file trong bộ nhớ tạm (thay vì lưu vào đĩa server)
// const storage = multer.memoryStorage();

// // Lọc để chỉ chấp nhận các file là ảnh
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true);
//     } else {
//         cb({ message: 'Chỉ chấp nhận file ảnh!' }, false);
//     }
// };

// // Giới hạn kích thước file (ví dụ: 5MB)
// const upload = multer({ 
//     storage: storage, 
//     fileFilter: fileFilter, 
//     limits: { fileSize: 1024 * 1024 * 5 } 
// });

// module.exports = upload;


// backend/middleware/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Tạo thư mục uploads nếu chưa tồn tại
const uploadDir = path.join(__dirname, '../uploads/avatars');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('✅ Đã tạo thư mục uploads:', uploadDir);
}

// Cấu hình lưu trữ file VẬT LÝ trên server
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Tạo tên file unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, 'avatar-' + uniqueSuffix + fileExtension);
  }
});

// Lọc để chỉ chấp nhận các file là ảnh
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb({ message: 'Chỉ chấp nhận file ảnh!' }, false);
  }
};

// Giới hạn kích thước file (5MB)
const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter, 
  limits: { fileSize: 1024 * 1024 * 5 } 
});

console.log('✅ Upload middleware configured');

module.exports = upload;