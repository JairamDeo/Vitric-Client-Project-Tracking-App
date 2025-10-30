const mongoose = require('mongoose');

/**
 * Client Schema
 * Defines the structure of client documents in MongoDB
 */
const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    // Virtual field: projects will be populated from Project model
    // We don't store project IDs here, we'll use reverse population
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    toJSON: { virtuals: true }, // Include virtuals when converting to JSON
    toObject: { virtuals: true },
  }
);

// Virtual field to get all projects for this client
clientSchema.virtual('projects', {
  ref: 'Project', // Reference to Project model
  localField: '_id', // Client's _id
  foreignField: 'client', // Project's client field
});

// Method to get project count for this client
clientSchema.virtual('projectCount').get(function () {
  return this.projects ? this.projects.length : 0;
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;