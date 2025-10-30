const Project = require('../models/Project');
const Client = require('../models/Client');

/**
 * @desc    Get all projects
 * @route   GET /api/projects
 * @access  Public (will be protected later)
 */
const getAllProjects = async (req, res) => {
  try {
    // Get all projects and populate client details
    const projects = await Project.find()
      .populate('client', 'name email phone') // Only include specific client fields
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Get all projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching projects',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single project by ID
 * @route   GET /api/projects/:id
 * @access  Public (will be protected later)
 */
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      'client',
      'name email phone'
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Get project by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching project',
      error: error.message,
    });
  }
};

/**
 * @desc    Create new project
 * @route   POST /api/projects
 * @access  Public (will be protected later - Admin only)
 */
const createProject = async (req, res) => {
  try {
    const { name, description, client, status, progress, deadline, tasks } =
      req.body;

    // Validate required fields
    if (!name || !description || !client || !deadline) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, description, client, and deadline',
      });
    }

    // Check if client exists
    const clientExists = await Client.findById(client);
    if (!clientExists) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    // Create new project
    const project = await Project.create({
      name,
      description,
      client,
      status: status || 'Pending',
      progress: progress || 0,
      deadline,
      tasks: tasks || [],
    });

    // Populate client details before sending response
    await project.populate('client', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating project',
      error: error.message,
    });
  }
};

/**
 * @desc    Update project (including status)
 * @route   PUT /api/projects/:id
 * @access  Public (will be protected later - Admin only)
 */
const updateProject = async (req, res) => {
  try {
    const { name, description, status, progress, deadline, tasks } = req.body;

    // Find project
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Update project
    project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        status,
        progress,
        deadline,
        tasks,
      },
      {
        new: true, // Return updated document
        runValidators: true, // Run schema validators
      }
    ).populate('client', 'name email phone');

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating project',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete project
 * @route   DELETE /api/projects/:id
 * @access  Public (will be protected later - Admin only)
 */
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Delete project
    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting project',
      error: error.message,
    });
  }
};

/**
 * @desc    Get projects by client ID
 * @route   GET /api/projects/client/:clientId
 * @access  Public
 */
const getProjectsByClient = async (req, res) => {
  try {
    const projects = await Project.find({ client: req.params.clientId })
      .populate('client', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Get projects by client error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching projects',
      error: error.message,
    });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByClient,
};