const express = require('express');
const router = express.Router();
const {
  loginAdmin,
  getAdminProfile,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

/**
 * Admin Authentication Routes
 */

// Login admin - Only this admin can login: vitriccpt@gmail.com
router.post('/login', loginAdmin);

// Get admin profile (protected route - requires JWT token)
router.get('/profile', protect, getAdminProfile);

module.exports = router;