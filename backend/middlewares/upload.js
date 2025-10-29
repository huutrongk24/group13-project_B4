const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Cấu hình nơi lưu trữ ảnh trên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_avatars", // thư mục trong Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

module.exports = upload;
