// src/components/LoadingPage.jsx
import './LoadingPage.css';

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 z-50">
        <h1>Loading ...</h1>
      <div className="w-4/5 h-2 bg-gray-300 rounded-full overflow-hidden mt-6">
        <div className="h-full w-1/2 bg-blue-500 animate-progress"></div>
      </div>
    </div>
  );
};

export default LoadingPage;