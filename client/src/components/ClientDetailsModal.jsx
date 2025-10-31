import React from 'react';
import { X, Mail, Phone, Briefcase, Calendar } from 'lucide-react';

const ClientDetailsModal = ({ client, onClose }) => {
  if (!client) return null;

  // Format date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-slideUp">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-maroon to-darkMaroon p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-cream mb-1">Client Details</h2>
            <p className="text-cream text-sm opacity-90">Complete client information</p>
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
          {/* Client Information */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-darkBrown mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-maroon" />
              Client Information
            </h3>
            
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Client Name
                </label>
                <p className="text-lg font-semibold text-darkBrown">
                  {client.name || 'N/A'}
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <p className="text-darkBrown">
                  {client.email || 'N/A'}
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <p className="text-darkBrown">
                  {client.phone || 'N/A'}
                </p>
              </div>

              {/* Created Date */}
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Client Since
                </label>
                <p className="text-darkBrown">
                  {formatDate(client.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <h3 className="text-xl font-bold text-darkBrown mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-maroon" />
                Projects
              </span>
              <span className="text-sm font-normal text-gray-600">
                {client.projects?.length || 0} {client.projects?.length === 1 ? 'Project' : 'Projects'}
              </span>
            </h3>

            {!client.projects || client.projects.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No projects assigned yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {client.projects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-white border-2 border-maroon-20 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                  >
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-darkBrown text-lg mb-1">
                          {project.name}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ml-2 whitespace-nowrap ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-600">Progress</span>
                        <span className="text-xs font-bold text-maroon">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-maroon h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {formatDate(project.deadline)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

export default ClientDetailsModal;