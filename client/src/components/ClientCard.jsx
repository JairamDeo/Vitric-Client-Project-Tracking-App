import React from 'react';
import { Mail, Phone } from 'lucide-react';

const ClientCard = React.memo(({ client, onViewDetails }) => {
  // Generate initials from client name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate random color for avatar (consistent per client)
  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-green-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-teal-500'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-white rounded-xl shadow-custom p-6 hover:shadow-lg transition-all duration-300 border border-maroon-20 animate-fadeIn">
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className={`${getAvatarColor(client.name)} w-16 h-16 rounded-full flex items-center justify-center shadow-md flex-shrink-0`}>
          <span className="text-white font-bold text-xl">{getInitials(client.name)}</span>
        </div>

        {/* Client Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-darkBrown mb-1">{client.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{client.projectCount} Projects</p>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-darkBrown">
              <Mail className="w-4 h-4 mr-2 text-maroon flex-shrink-0" />
              <span className="truncate">{client.email}</span>
            </div>
            <div className="flex items-center text-sm text-darkBrown">
              <Phone className="w-4 h-4 mr-2 text-maroon flex-shrink-0" />
              <span>{client.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Details Button */}
      <button
        onClick={() => onViewDetails(client)}
        className="w-full py-3 px-4 border-2 border-blue-500 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
      >
        View Details
      </button>
    </div>
  );
});

ClientCard.displayName = 'ClientCard';

export default ClientCard;