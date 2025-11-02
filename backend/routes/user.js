// backend/routes/user.js
const express = require('express');
const router = express.Router();

console.log('🟡 Starting user routes...');

// Test import
try {
  const userController = require('../controllers/userController');
  console.log('✅ userController imported:', Object.keys(userController));
  console.log('✅ getProfile function:', typeof userController.getProfile);
} catch (err) {
  console.error('🔴 Error importing userController:', err);
  process.exit(1);
}

const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const upload = require('../middleware/upload');

console.log('✅ All imports successful');

// 🟦 BASIC PROFILE ROUTES
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.put('/profile/avatar', auth, upload.single('avatar'), userController.uploadAvatar);

// 🟦 ADMIN ROUTES
router.get('/', [auth, isAdmin], userController.getUsers);
router.delete('/:id', [auth, isAdmin], userController.deleteUser);

console.log('✅ All routes defined');

module.exports = router;