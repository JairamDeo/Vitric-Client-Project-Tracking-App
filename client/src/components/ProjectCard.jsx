import React, { useState, useEffect, useRef } from 'react';

const ProjectCard = React.memo(({ projectName, clientName, progress, status }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef(null);

  // Intersection Observer - Works on ALL devices including mobile
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation when card enters viewport
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Small delay before starting animation
          setTimeout(() => {
            setAnimatedProgress(progress);
          }, 200);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of card is visible
        rootMargin: '0px 0px -50px 0px', // Start slightly before fully visible
      }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, [progress, hasAnimated]);

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
    <div 
      ref={cardRef}
      className="bg-white rounded-xl shadow-custom p-6 hover:shadow-lg transition-all duration-300 border border-maroon-20 animate-slideUp"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-darkBrown mb-1">{projectName}</h3>
          <p className="text-sm text-gray-600">{clientName}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
      
      {/* Progress Bar - Animated on Mobile & Desktop */}
      <div className="mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className={`h-2.5 rounded-full ${getProgressColor(progress)}`}
            style={{ 
              width: `${animatedProgress}%`,
              transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'width',
              transform: 'translateZ(0)', // Force GPU acceleration
            }}
          />
        </div>
      </div>
      <p className="text-sm text-darkBrown font-medium">{progress}% Complete</p>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;