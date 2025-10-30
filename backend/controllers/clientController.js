const Client = require('../models/Client');
const Project = require('../models/Project');

/**
 * @desc    Get all clients
 * @route   GET /api/clients
 * @access  Public (will be protected later)
 */
const getAllClients = async (req, res) => {
  try {
    // Get all clients and populate their projects
    const clients = await Client.find()
      .populate('projects')
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients,
    });
  } catch (error) {
    console.error('Get all clients error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching clients',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single client by ID
 * @route   GET /api/clients/:id
 * @access  Public (will be protected later)
 */
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate('projects');

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    console.error('Get client by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching client',
      error: error.message,
    });
  }
};

/**
 * @desc    Create new client
 * @route   POST /api/clients
 * @access  Public (will be protected later - Admin only)
 */
const createClient = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and phone',
      });
    }

    // Check if client with email already exists
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({
        success: false,
        message: 'Client with this email already exists',
      });
    }

    // Create new client
    const client = await Client.create({
      name,
      email,
      phone,
    });

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: client,
    });
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating client',
      error: error.message,
    });
  }
};

/**
 * @desc    Update client
 * @route   PUT /api/clients/:id
 * @access  Public (will be protected later - Admin only)
 */
const updateClient = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Find client
    let client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    // If email is being updated, check if it's already taken
    if (email && email !== client.email) {
      const existingClient = await Client.findOne({ email });
      if (existingClient) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use by another client',
        });
      }
    }

    // Update client
    client = await Client.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      {
        new: true, // Return updated document
        runValidators: true, // Run schema validators
      }
    ).populate('projects');

    res.status(200).json({
      success: true,
      message: 'Client updated successfully',
      data: client,
    });
  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating client',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete client
 * @route   DELETE /api/clients/:id
 * @access  Public (will be protected later - Admin only)
 */
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    // Delete all projects associated with this client
    await Project.deleteMany({ client: req.params.id });

    // Delete client
    await Client.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Client and associated projects deleted successfully',
    });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting client',
      error: error.message,
    });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};