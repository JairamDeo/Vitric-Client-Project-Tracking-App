import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const ProjectListCard = React.memo(({ project, onViewDetails }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(project.progress);
    }, 100);

    return () => clearTimeout(timer);
  }, [project.progress]);

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

  // Determine progress bar color
  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 40) return 'bg-blue-500';
    return 'bg-orange-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-custom p-6 hover:shadow-lg transition-all duration-300 border border-maroon-20 animate-fadeIn">
      {/* Project Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-darkBrown">{project.name}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{project.client}</p>
          <div className="flex items-center text-sm text-darkBrown">
            <Clock className="w-4 h-4 mr-1 text-maroon" />
            <span>Deadline: {project.deadline}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-darkBrown">Progress</span>
          <span className="text-sm font-bold text-darkBrown">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${getProgressColor(project.progress)}`}
            style={{ width: `${animatedProgress}%` }}
          ></div>
        </div>
      </div>

      {/* View Details Button */}
      <button
        onClick={() => onViewDetails(project)}
        className="w-full py-3 px-4 border-2 border-blue-500 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
      >
        View Details
      </button>
    </div>
  );
});

ProjectListCard.displayName = 'ProjectListCard';

export default ProjectListCard;