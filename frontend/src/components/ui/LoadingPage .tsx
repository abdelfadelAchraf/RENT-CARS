import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LoadingPageProps {
  onLoadingComplete: () => void;
  loadingText?: string;
  duration?: number;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ 
  onLoadingComplete, 
  loadingText = "Preparing your ride...", 
  duration = 3000 
}) => {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Calculate step duration based on total duration
  const stepDuration = duration / 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(onLoadingComplete, 500); // Small delay before callback
          return 100;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, [onLoadingComplete, stepDuration]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: { width: `${progress}%`, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={isComplete ? "exit" : "hidden"}
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Car Rental App
        </h1>
        
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-blue-700">
              {loadingText}
            </span>
            <span className="text-sm font-medium text-blue-700">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <motion.div
              ref={progressRef}
              className="h-2.5 rounded-full bg-blue-600"
              variants={progressBarVariants}
              initial="hidden"
              animate="visible"
            />
          </div>
        </div>
        
        {/* Additional loading indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Car SVG component
const CarSVG: React.FC = () => (
  <svg
    width="48"
    height="24"
    viewBox="0 0 48 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-md"
  >
    {/* Car body */}
    <path
      d="M8 12H40C42.2091 12 44 13.7909 44 16V20C44 20.5523 43.5523 21 43 21H5C4.44772 21 4 20.5523 4 20V16C4 13.7909 5.79086 12 8 12Z"
      fill="#3B82F6"
    />
    {/* Car top */}
    <path
      d="M14 6H34C36.2091 6 38 7.79086 38 10V12H10V10C10 7.79086 11.7909 6 14 6Z"
      fill="#2563EB"
    />
    {/* Windows */}
    <path
      d="M16 8H32C32.5523 8 33 8.44772 33 9V11C33 11.5523 32.5523 12 32 12H16C15.4477 12 15 11.5523 15 11V9C15 8.44772 15.4477 8 16 8Z"
      fill="#93C5FD"
    />
    {/* Wheels */}
    <circle cx="12" cy="18" r="3" fill="#1E3A8A" />
    <circle cx="36" cy="18" r="3" fill="#1E3A8A" />
    {/* Wheel details */}
    <circle cx="12" cy="18" r="1" fill="#3B82F6" />
    <circle cx="36" cy="18" r="1" fill="#3B82F6" />
    {/* Headlights */}
    <circle cx="42" cy="14" r="1" fill="#FBBF24" />
  </svg>
);

export default LoadingPage;