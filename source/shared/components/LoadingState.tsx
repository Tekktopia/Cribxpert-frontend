import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading available properties...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#1D5C5C] mb-4"></div>
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default LoadingState;
