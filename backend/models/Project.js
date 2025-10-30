const mongoose = require('mongoose');

/**
 * Project Schema
 * Defines the structure of project documents in MongoDB
 */
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client', // Reference to Client model
      required: [true, 'Client is required'],
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'], // Only these values allowed
      default: 'Pending',
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required'],
    },
    tasks: [
      {
        name: {
          type: String,
          required: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Index for faster queries
projectSchema.index({ client: 1, status: 1 });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;