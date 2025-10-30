import React, { useState } from 'react';
import { X, Edit2, Trash2, Calendar, User, Mail, Phone, FileText, CheckCircle } from 'lucide-react';

const ProjectDetailsModal = React.memo(({ project, onClose, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!project) return null;

  const handleDelete = () => {
    onDelete(project.id);
    onClose();
  };

  const handleEdit = () => {
    onEdit(project);
  };

  // Determine status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-darkBrown bg-opacity-50 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-cream rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-zoomIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-white border-b-2 border-maroon-20 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-darkBrown">{project.name}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Project Details & Client Information</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-lightPink rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6 text-darkBrown" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Project Information */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-custom border border-maroon-20">
              <h3 className="text-lg font-bold text-darkBrown mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-maroon" />
                Project Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1 block">Description</label>
                  <p className="text-darkBrown">{project.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-maroon" />
                      Deadline
                    </label>
                    <p className="text-darkBrown font-medium">{project.deadline}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1 text-maroon" />
                      Progress
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            project.progress === 100 ? 'bg-green-500' :
                            project.progress >= 40 ? 'bg-blue-500' : 'bg-orange-500'
                          }`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-darkBrown font-bold text-sm">{project.progress}%</span>
                    </div>
                  </div>
                </div>

                {project.tasks && project.tasks.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Tasks</label>
                    <div className="space-y-2">
                      {project.tasks.map((task, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className={`w-4 h-4 rounded flex items-center justify-center ${
                            task.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                          <span className={task.completed ? 'text-gray-500 line-through' : 'text-darkBrown'}>
                            {task.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Client Information */}
            <div className="bg-white rounded-xl p-6 shadow-custom border border-maroon-20">
              <h3 className="text-lg font-bold text-darkBrown mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-maroon" />
                Client Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1 block">Client Name</label>
                  <p className="text-darkBrown font-medium text-lg">{project.client}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Mail className="w-5 h-5 text-maroon mt-1 flex-shrink-0" />
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
                      <p className="text-darkBrown break-all">{project.clientEmail}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Phone className="w-5 h-5 text-maroon mt-1 flex-shrink-0" />
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-1 block">Phone</label>
                      <p className="text-darkBrown">{project.clientPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="bg-white border-t-2 border-maroon-20 p-6 flex gap-3 justify-end">
            <button
              onClick={handleEdit}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-md"
            >
              <Edit2 className="w-4 h-4" />
              Edit Project
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-md"
            >
              <Trash2 className="w-4 h-4" />
              Delete Project
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <>
          <div 
            className="fixed inset-0 bg-darkBrown bg-opacity-70 z-50"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-zoomIn">
              <h3 className="text-xl font-bold text-darkBrown mb-2">Delete Project?</h3>
              <p className="text-darkBrown mb-6">
                Are you sure you want to delete <strong>{project.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-6 py-2 border-2 border-gray-300 text-darkBrown rounded-lg font-medium hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
});

ProjectDetailsModal.displayName = 'ProjectDetailsModal';

export default ProjectDetailsModal;