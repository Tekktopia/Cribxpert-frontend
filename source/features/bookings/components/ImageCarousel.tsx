import React from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

interface ImageCarouselProps {
  images: string[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (idx: number) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  isOpen,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onSelect,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => {
  if (!isOpen || images.length === 0) return null;
  const hasMultipleImages = images.length > 1;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors z-60 bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center"
        aria-label="Close carousel"
      >
        <FaTimes />
      </button>
      <div className="absolute top-4 left-4 text-white text-lg z-60 bg-black bg-opacity-50 px-3 py-1 rounded-md">
        {currentIndex + 1} / {images.length}
      </div>
      {hasMultipleImages && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors z-60 bg-black bg-opacity-50 w-12 h-12 rounded-full flex items-center justify-center"
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors z-60 bg-black bg-opacity-50 w-12 h-12 rounded-full flex items-center justify-center"
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>
        </>
      )}
      <div
        className="w-full h-full flex items-center justify-center p-4 cursor-pointer"
        onClick={onClose}
      >
        <div
          className="relative max-w-[80vw] max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex]}
            alt={`Property ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
      {hasMultipleImages && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black bg-opacity-50 p-2 rounded-lg max-w-full overflow-x-auto">
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-white'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-label="Close carousel"
      ></div>
    </div>
  );
};

export default ImageCarousel;
