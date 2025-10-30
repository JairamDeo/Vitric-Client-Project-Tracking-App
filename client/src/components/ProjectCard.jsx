import React, { useState, useEffect } from 'react';

const ProjectCard = React.memo(({ projectName, clientName, progress, status }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);

    return () => clearTimeout(timer);
  }, [progress]);

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
    <div className="bg-white rounded-xl shadow-custom p-6 hover:shadow-lg transition-all duration-300 border border-maroon-20 animate-slideUp">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-darkBrown mb-1">{projectName}</h3>
          <p className="text-sm text-gray-600">{clientName}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
      
      {/* Progress Bar with Animation */}
      <div className="mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${getProgressColor(progress)}`}
            style={{ width: `${animatedProgress}%` }}
          ></div>
        </div>
      </div>
      <p className="text-sm text-darkBrown font-medium">{progress}% Complete</p>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;