import React from 'react';
import { X, User, Calendar, CheckCircle, Circle, Mail, Phone } from 'lucide-react';

const ProjectDetailsModal = ({ project, onClose }) => {
  if (!project) return null;

  // Format date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500 text-white';
      case 'In Progress':
        return 'bg-blue-500 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Get progress color
  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Safely get client data
  const clientName = project.client?.name || 'Unknown Client';
  const clientEmail = project.client?.email || '';
  const clientPhone = project.client?.phone || '';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-slideUp">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-maroon to-darkMaroon p-6 flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-cream mb-2">{project.name || 'Untitled Project'}</h2>
            <p className="text-cream text-sm opacity-90">Project Details</p>
          </div>
          <button
            onClick={onClose}
            className="text-cream hover:text-white transition-colors p-2 hover:bg-white hover:bg-opacity-20 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Status and Progress */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            {/* Status */}
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">Status</label>
              <span className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold ${getStatusColor(project.status)}`}>
                {project.status || 'Pending'}
              </span>
            </div>

            {/* Progress */}
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">Progress</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(project.progress || 0)}`}
                    style={{ width: `${project.progress || 0}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-maroon">{project.progress || 0}%</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-darkBrown mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">
              {project.description || 'No description provided'}
            </p>
          </div>

          {/* Client Information */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-darkBrown mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-maroon" />
              Client Information
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">Client Name</label>
                <p className="text-lg font-semibold text-darkBrown">{clientName}</p>
              </div>
              
              {clientEmail && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4 text-maroon" />
                  <span className="text-sm">{clientEmail}</span>
                </div>
              )}
              
              {clientPhone && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-maroon" />
                  <span className="text-sm">{clientPhone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Deadline */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-darkBrown mb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-maroon" />
              Deadline
            </h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-lg font-semibold text-darkBrown">
                {formatDate(project.deadline)}
              </p>
            </div>
          </div>

          {/* Tasks */}
          {project.tasks && project.tasks.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-darkBrown mb-3 flex items-center justify-between">
                <span>Tasks</span>
                <span className="text-sm font-normal text-gray-600">
                  {project.tasks.filter(t => t.completed).length} of {project.tasks.length} completed
                </span>
              </h3>
              <div className="space-y-2">
                {project.tasks.map((task, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                      task.completed ? 'bg-green-50' : 'bg-gray-50'
                    }`}
                  >
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                    <span
                      className={`flex-1 ${
                        task.completed ? 'text-gray-500 line-through' : 'text-darkBrown'
                      }`}
                    >
                      {task.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Created/Updated Dates */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 pt-4 border-t border-gray-200">
            <div>
              <span className="font-medium">Created:</span>{' '}
              {formatDate(project.createdAt)}
            </div>
            <div>
              <span className="font-medium">Last Updated:</span>{' '}
              {formatDate(project.updatedAt)}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 p-4 flex justify-end border-t-2 border-maroon-20">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-maroon text-cream rounded-lg font-semibold hover:bg-darkMaroon transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;