import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      {/* Infinity symbol animation */}
      <div className="relative w-32 h-16">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="
            animate-infinity 
            w-16 h-16 
            border-4 border-transparent
            border-t-blue-500 border-r-blue-500 
            rounded-full
          "></div>
          <div className="
            animate-infinity-reverse 
            w-16 h-16 
            border-4 border-transparent
            border-b-blue-500 border-l-blue-500 
            rounded-full
            absolute top-0 right-0
          "></div>
        </div>
      </div>
      
      {/* Optional pulsing text */}
      <p className="text-blue-500 animate-pulse">
        Loading your dream cars...
      </p>

      {/* Custom styles for the animation */}
      <style>{`
        @keyframes infinity {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(90deg);
          }
          50% {
            transform: rotate(180deg);
          }
          75% {
            transform: rotate(270deg);
          }
        }
        @keyframes infinity-reverse {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-90deg);
          }
          50% {
            transform: rotate(-180deg);
          }
          75% {
            transform: rotate(-270deg);
          }
        }
        .animate-infinity {
          animation: infinity 2s linear infinite;
        }
        .animate-infinity-reverse {
          animation: infinity-reverse 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;

// export default ;