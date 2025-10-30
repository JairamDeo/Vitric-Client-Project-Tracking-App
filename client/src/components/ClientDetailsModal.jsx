import React, { useState } from 'react';
import { X, Edit2, Trash2, Mail, Phone, Briefcase } from 'lucide-react';

const ClientDetailsModal = React.memo(({ client, onClose, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!client) return null;

  const handleDelete = () => {
    onDelete(client.id);
    onClose();
  };

  const handleEdit = () => {
    onEdit(client);
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
          <div className="bg-white border-b-2 border-maroon-20 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-maroon w-14 h-14 rounded-full flex items-center justify-center shadow-md">
                <span className="text-cream font-bold text-xl">
                  {client.name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-darkBrown">{client.name}</h2>
                <p className="text-sm text-gray-600">{client.projectCount} Projects</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-lightPink rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6 text-darkBrown" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Client Info */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-custom border border-maroon-20">
              <h3 className="text-lg font-bold text-darkBrown mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-maroon mr-3" />
                  <span className="text-darkBrown">{client.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-maroon mr-3" />
                  <span className="text-darkBrown">{client.phone}</span>
                </div>
              </div>
            </div>

            {/* Projects List */}
            <div className="bg-white rounded-xl p-6 shadow-custom border border-maroon-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-darkBrown flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-maroon" />
                  Projects ({client.projects.length})
                </h3>
              </div>

              {client.projects.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No projects yet</p>
              ) : (
                <div className="space-y-3">
                  {client.projects.map((project, index) => (
                    <div
                      key={project.id}
                      className="bg-cream p-4 rounded-lg border border-maroon-20 hover:shadow-md transition-all duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-darkBrown mb-1">{project.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                          <div className="flex items-center gap-3 text-sm">
                            <span className={`px-3 py-1 rounded-full font-medium ${
                              project.status === 'Completed' 
                                ? 'bg-green-100 text-green-700 border border-green-200'
                                : project.status === 'In Progress'
                                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                : 'bg-orange-100 text-orange-700 border border-orange-200'
                            }`}>
                              {project.status}
                            </span>
                            <span className="text-darkBrown">{project.progress}% Complete</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="bg-white border-t-2 border-maroon-20 p-6 flex gap-3 justify-end">
            <button
              onClick={handleEdit}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-md"
            >
              <Edit2 className="w-4 h-4" />
              Edit Client
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-md"
            >
              <Trash2 className="w-4 h-4" />
              Delete Client
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
              <h3 className="text-xl font-bold text-darkBrown mb-2">Delete Client?</h3>
              <p className="text-darkBrown mb-6">
                Are you sure you want to delete <strong>{client.name}</strong>? This action cannot be undone and will remove all associated projects.
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

ClientDetailsModal.displayName = 'ClientDetailsModal';

export default ClientDetailsModal;