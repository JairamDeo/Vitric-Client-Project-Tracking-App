import React from 'react';

const LoadingBar = ({ text = 'Dashboard' }) => {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <div className="w-64 h-2 bg-lightPink rounded-full overflow-hidden">
          <div className="h-full bg-maroon rounded-full animate-pulse" style={{
            width: '60%',
            animation: 'loading 1.5s ease-in-out infinite'
          }}></div>
        </div>
        <p className="text-darkBrown mt-4 font-medium">Loading {text}...</p>
      </div>
      <style>{`
        @keyframes loading {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingBar;