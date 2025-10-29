// const express = require('express');
// const router = express.Router();
// const { getAllUsers, deleteUser } = require('../controllers/adminController');
// const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

// router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
// router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser } = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;


