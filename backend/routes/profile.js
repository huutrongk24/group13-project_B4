// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/authMiddleware");
// const { getProfile, updateProfile } = require("../controllers/profileController");

// // Xem profile
// router.get("/", auth, getProfile);

// // Cập nhật profile
// router.put("/", auth, updateProfile);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { getProfile, updateProfile } = require("../controllers/profileController");

// Xem profile
router.get("/", authMiddleware, getProfile);

// Cập nhật profile
router.put("/", authMiddleware, updateProfile);

module.exports = router;
