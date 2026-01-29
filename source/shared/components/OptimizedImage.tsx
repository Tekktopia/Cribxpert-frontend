import React, { useState, useCallback, memo } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  priority = false,
  onLoad: externalOnLoad,
  onError: externalOnError,
}) => {
  // Treat empty or invalid src as error so we never show spinner forever
  const hasValidSrc = typeof src === 'string' && src.trim().length > 0;
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(!hasValidSrc);
  const [fadeIn, setFadeIn] = useState(false);

  // Handle image load with callback
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    // Add slight delay for a smoother transition
    setTimeout(() => setFadeIn(true), 50);
    if (externalOnLoad) externalOnLoad();
  }, [externalOnLoad]);

  // Handle image error with callback
  const handleError = useCallback(() => {
    setHasError(true);
    if (externalOnError) externalOnError();
  }, [externalOnError]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton with pulse effect - only show when we have a valid src and image hasn't loaded */}
      {hasValidSrc && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="h-full w-full flex items-center justify-center">
            <svg 
              className="animate-spin h-8 w-8 text-gray-400" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      )}

      {/* Actual image - only render when we have a valid src */}
      {hasValidSrc && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : loading}
          width={width}
          height={height}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-all duration-500 ${
            fadeIn ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Error fallback with improved styling */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 text-gray-400 mb-2"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-gray-500 text-sm">Image not available</span>
        </div>
      )}
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(OptimizedImage);