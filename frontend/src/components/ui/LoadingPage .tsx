// LoadingPage.tsx
import { useState, useEffect } from 'react';

interface LoadingPageProps {
  onLoadingComplete: () => void;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prevProgress => {
          const newProgress = prevProgress + 1;
          return newProgress;
        });
      } else {
        onLoadingComplete();
      }
    }, 30);
    
    return () => clearTimeout(timer);
  }, [progress, onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-blue-50 flex flex-col items-center justify-center z-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">Car Rental App</h1>
        
        {/* Car container */}
        <div className="relative w-64 h-20 ">
          {/* Car that moves based on progress */}
          <div 
            className="absolute" 
            style={{ 
              left: `${progress}%`, 
              transform: 'translateX(-100%)' 
            }}
          >
            <CarSVG />
          </div>
        </div>
        
        {/* Loading progress bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="mt-3 text-gray-600">Loading... {progress}%</p>
      </div>
    </div>
  );
};

// Simple Car SVG component
const CarSVG: React.FC = () => (
  <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="13" width="32" height="8" rx="2" fill="#3B82F6" />
    <rect x="4" y="17" width="40" height="4" rx="1" fill="#2563EB" />
    <rect x="10" y="8" width="28" height="8" rx="2" fill="#3B82F6" />
    <circle cx="12" cy="21" r="3" fill="#1F2937" />
    <circle cx="36" cy="21" r="3" fill="#1F2937" />
    <rect x="15" y="10" width="6" height="6" rx="1" fill="#DBEAFE" />
    <rect x="27" y="10" width="6" height="6" rx="1" fill="#DBEAFE" />
  </svg>
);

export default LoadingPage;