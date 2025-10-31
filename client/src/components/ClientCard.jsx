import React from 'react';
import { Mail, Phone, Eye, Edit, Trash2, Briefcase } from 'lucide-react';

const ClientCard = ({ 
  name, 
  email, 
  phone, 
  projectCount = 0,
  onViewDetails, 
  onEdit, 
  onDelete,
  isAdmin = false 
}) => {
  // Get initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate random color based on name
  const getAvatarColor = (name) => {
    if (!name) return 'bg-gray-400';
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-white rounded-xl shadow-custom hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-maroon-20 overflow-hidden animate-slideUp">
      {/* Card Header with Avatar */}
      <div className="bg-gradient-to-r from-maroon to-darkMaroon p-6">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className={`w-16 h-16 rounded-full ${getAvatarColor(name)} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
            {getInitials(name)}
          </div>
          
          {/* Name and Project Count */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-cream mb-1 truncate">
              {name || 'Unknown Client'}
            </h3>
            <div className="flex items-center gap-2 text-cream">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">
                {projectCount} {projectCount === 1 ? 'Project' : 'Projects'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-3">
        {/* Email */}
        <div className="flex items-center gap-3 text-darkBrown">
          <Mail className="w-5 h-5 text-maroon flex-shrink-0" />
          <span className="text-sm truncate">{email || 'No email'}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 text-darkBrown">
          <Phone className="w-5 h-5 text-maroon flex-shrink-0" />
          <span className="text-sm">{phone || 'No phone'}</span>
        </div>
      </div>

      {/* Card Footer - Action Buttons */}
      <div className="p-4 bg-gray-50 border-t-2 border-maroon-20 flex gap-2">
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
            title="Edit Client"
          >
            <Edit className="w-4 h-4" />
          </button>
        )}

        {/* Delete Button - Only for Admin */}
        {isAdmin && onDelete && (
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium text-sm hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center"
            title="Delete Client"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(ClientCard);