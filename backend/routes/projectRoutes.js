const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByClient,
} = require('../controllers/projectController');

// Import auth middleware for protected routes
const { protect } = require('../middleware/authMiddleware');

/**
 * Project Routes
 * GET routes are public
 * POST, PUT, DELETE routes are protected (Admin only)
 */

// GET all projects (Public) & POST create project (Protected - Admin only)
router.route('/')
  .get(getAllProjects)           // Anyone can view projects
  .post(protect, createProject); // Only logged-in admin can create

// GET projects by client ID (Public)
router.route('/client/:clientId')
  .get(getProjectsByClient);     // Anyone can view projects by client

// GET single project (Public), UPDATE (Protected), DELETE (Protected)
router.route('/:id')
  .get(getProjectById)             // Anyone can view single project
  .put(protect, updateProject)     // Only logged-in admin can update
  .delete(protect, deleteProject); // Only logged-in admin can delete

module.exports = router;