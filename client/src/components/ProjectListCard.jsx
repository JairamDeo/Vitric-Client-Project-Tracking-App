import React from 'react';
import { Calendar, Eye, Edit, Trash2 } from 'lucide-react';

const ProjectListCard = ({ 
  projectName, 
  clientName, 
  status, 
  progress = 0, 
  deadline,
  onViewDetails,
  onEdit,
  onDelete,
  isAdmin = false
}) => {
  // Status badge colors
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

  // Progress bar color
  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Format deadline
  const formatDeadline = (deadline) => {
    if (!deadline) return 'No deadline';
    const date = new Date(deadline);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-custom hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-maroon-20 p-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-darkBrown mb-1 line-clamp-2">
            {projectName || 'Untitled Project'}
          </h3>
          <p className="text-sm text-gray-600 truncate">
            {clientName || 'No client assigned'}
          </p>
        </div>
        
        {/* Status Badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)} whitespace-nowrap ml-2`}>
          {status || 'Pending'}
        </span>
      </div>

      {/* Progress Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-darkBrown">Progress</span>
          <span className="text-sm font-bold text-maroon">{progress}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Deadline */}
      <div className="flex items-center gap-2 text-darkBrown mb-4">
        <Calendar className="w-4 h-4 text-maroon" />
        <span className="text-sm">
          Due: {formatDeadline(deadline)}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t-2 border-maroon-20">
        {/* View Details Button */}
        <button
          onClick={onViewDetails}
          className="flex-1 px-4 py-2 bg-maroon text-cream rounded-lg font-medium text-sm hover:bg-darkMaroon transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>

        {/* Edit Button - Only for Admin */}
        {isAdmin && onEdit && (
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium text-sm hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center"
            title="Edit Project"
          >
            <Edit className="w-4 h-4" />
          </button>
        )}

        {/* Delete Button - Only for Admin */}
        {isAdmin && onDelete && (
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium text-sm hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center"
            title="Delete Project"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProjectListCard);