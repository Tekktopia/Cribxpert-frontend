import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import OptimizedImage from '@/shared/components/OptimizedImage';

interface PropertyGalleryProps {
  images: string[];
  propertyName: string;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({
  images,
  propertyName,
}) => {
  const [mobileImageIndex, setMobileImageIndex] = useState(0);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselImageIndex, setCarouselImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Use all available images or default to the first one if only one image
  const allImages = images.length ? images : [images[0]];

  // Handle opening carousel
  const openCarousel = (imageIndex: number) => {
    setCarouselImageIndex(imageIndex);
    setIsCarouselOpen(true);
  };

  // Handle closing carousel
  const closeCarousel = () => {
    setIsCarouselOpen(false);
  };

  // Handle touch events for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // Swipe left - next image
      setCarouselImageIndex((prev) =>
        prev === allImages.length - 1 ? 0 : prev + 1
      );
    }

    if (isRightSwipe) {
      // Swipe right - previous image
      setCarouselImageIndex((prev) =>
        prev === 0 ? allImages.length - 1 : prev - 1
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isCarouselOpen) return;

      switch (e.key) {
        case 'Escape':
          closeCarousel();
          break;
        case 'ArrowLeft':
          setCarouselImageIndex((prev) =>
            prev === 0 ? allImages.length - 1 : prev - 1
          );
          break;
        case 'ArrowRight':
          setCarouselImageIndex((prev) =>
            prev === allImages.length - 1 ? 0 : prev + 1
          );
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCarouselOpen, allImages.length]);

  // Prevent body scroll when carousel is open
  useEffect(() => {
    if (isCarouselOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCarouselOpen]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center py-6 gap-4">
      {/* Mobile Carousel - Only visible on mobile */}
      <div className="relative w-full block md:hidden">
        <div className="relative w-full">
          {/* Current Image */}
          <div
            className="cursor-pointer"
            onClick={() => openCarousel(mobileImageIndex)}
          >
            <OptimizedImage
              src={allImages[mobileImageIndex]}
              alt={`${propertyName} ${mobileImageIndex + 1}`}
              className="w-full h-[250px] sm:h-[350px] object-cover "
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 "></div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setMobileImageIndex((prev) =>
                prev === 0 ? allImages.length - 1 : prev - 1
              )
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center z-10"
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={() =>
              setMobileImageIndex((prev) =>
                prev === allImages.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center z-10"
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {allImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setMobileImageIndex(idx)}
                className={`w-2 h-2 rounded-full ${
                  idx === mobileImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
            {mobileImageIndex + 1} / {allImages.length}
          </div>
        </div>
      </div>

      {/* Desktop Gallery - Cinematic Hero Layout */}
      <div className="hidden md:block w-full">
        <div className="relative aspect-[21/9] overflow-hidden group cursor-pointer" onClick={() => openCarousel(0)}>
          <OptimizedImage
            src={allImages[0]}
            alt={propertyName}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500"></div>
          
          {/* Subtle info overlay */}
          <div className="absolute bottom-12 left-12 text-white">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              View Cinematic Gallery
            </span>
          </div>

          {/* Show all photos button */}
          {allImages.length > 1 && (
            <button
              className="absolute bottom-8 right-8 bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-neutral-900 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                openCarousel(0);
              }}
            >
              Gallery / {allImages.length}
            </button>
          )}
        </div>
      </div>

      {/* Image Carousel Overlay */}
      {isCarouselOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button */}
          <button
            onClick={closeCarousel}
            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors z-60 bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center"
            aria-label="Close carousel"
          >
            <FaTimes />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 text-white text-lg z-60 bg-black bg-opacity-50 px-3 py-1 rounded-md">
            {carouselImageIndex + 1} / {allImages.length}
          </div>

          {/* Previous Button */}
          {allImages.length > 1 && (
            <button
              onClick={() =>
                setCarouselImageIndex((prev) =>
                  prev === 0 ? allImages.length - 1 : prev - 1
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors z-60 bg-black bg-opacity-50 w-12 h-12 rounded-full flex items-center justify-center"
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* Next Button */}
          {allImages.length > 1 && (
            <button
              onClick={() =>
                setCarouselImageIndex((prev) =>
                  prev === allImages.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors z-60 bg-black bg-opacity-50 w-12 h-12 rounded-full flex items-center justify-center"
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
          )}

          {/* Main Image */}
          <div
            className="w-full h-full flex items-center justify-center p-4 cursor-pointer"
            onClick={closeCarousel}
          >
            <div
              className="relative max-w-[80vw] max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <OptimizedImage
                src={allImages[carouselImageIndex]}
                alt={`${propertyName} ${carouselImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          {/* Thumbnail Navigation */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black bg-opacity-50 p-2  max-w-full overflow-x-auto">
              {allImages.map((src, index) => (
                <button
                  key={index}
                  onClick={() => setCarouselImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    index === carouselImageIndex
                      ? 'border-white'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <OptimizedImage
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={closeCarousel}
            aria-label="Close carousel"
          ></div>
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;
