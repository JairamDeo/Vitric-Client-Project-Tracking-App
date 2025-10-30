const express = require('express');
const router = express.Router();
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require('../controllers/clientController');

// Import auth middleware for protected routes
const { protect } = require('../middleware/authMiddleware');

/**
 * Client Routes
 * GET routes are public
 * POST, PUT, DELETE routes are protected (Admin only)
 */

// GET all clients (Public) & POST create client (Protected - Admin only)
router.route('/')
  .get(getAllClients)           // Anyone can view clients
  .post(protect, createClient); // Only logged-in admin can create

// GET single client (Public), UPDATE (Protected), DELETE (Protected)
router.route('/:id')
  .get(getClientById)             // Anyone can view single client
  .put(protect, updateClient)     // Only logged-in admin can update
  .delete(protect, deleteClient); // Only logged-in admin can delete

module.exports = router;