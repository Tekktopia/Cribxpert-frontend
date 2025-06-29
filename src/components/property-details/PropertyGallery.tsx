import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import OptimizedImage from '@/components/common/OptimizedImage';

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
    <div className="flex flex-col mt-4 sm:mt-8 md:flex-row items-center justify-center py-3 px-4 sm:px-6 lg:px-8 gap-4">
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
              className="w-full h-[250px] sm:h-[350px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>
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

      {/* Desktop Gallery - Only visible on medium screens and up */}
      <div className="hidden md:block w-full">
        {(() => {
          switch (allImages.length) {
            case 1:
              // Single image layout - full width
              return (
                <div
                  className="relative w-full cursor-pointer"
                  onClick={() => openCarousel(0)}
                >
                  <OptimizedImage
                    src={allImages[0]}
                    alt={propertyName}
                    className="w-full h-[350px] md:h-[500px] object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>
                </div>
              );

            case 2:
              // Two images layout - side by side
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {allImages.map((src, index) => (
                    <div
                      key={index}
                      className="relative cursor-pointer"
                      onClick={() => openCarousel(index)}
                    >
                      <OptimizedImage
                        src={src}
                        alt={`${propertyName} ${index + 1}`}
                        className="w-full h-64 md:h-[350px] object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              );

            case 3:
              // Three images layout - one large, two small
              return (
                <div className="flex flex-col md:flex-row w-full gap-4">
                  {/* Primary image */}
                  <div
                    className="relative md:w-1/2 cursor-pointer"
                    onClick={() => openCarousel(0)}
                  >
                    <OptimizedImage
                      src={allImages[0]}
                      alt={propertyName}
                      className="w-full h-64 md:h-[350px] object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>
                  </div>

                  {/* Two smaller images stacked */}
                  <div className="flex flex-col md:w-1/2 gap-4">
                    {allImages.slice(1, 3).map((src, index) => (
                      <div
                        key={index}
                        className="relative cursor-pointer"
                        onClick={() => openCarousel(index + 1)}
                      >
                        <OptimizedImage
                          src={src}
                          alt={`${propertyName} ${index + 2}`}
                          className="w-full h-32 md:h-[168px] object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                </div>
              );

            default:
              // 4+ images layout - one large, four smaller in grid
              return (
                <div className="flex gap-4 w-full relative">
                  {/* Primary image */}
                  <div
                    className="relative md:w-1/2 cursor-pointer"
                    onClick={() => openCarousel(0)}
                  >
                    <OptimizedImage
                      src={allImages[0]}
                      alt={propertyName}
                      className="w-full h-64 md:h-[350px] object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>
                  </div>

                  {/* Grid for Small Images */}
                  <div className="grid grid-cols-2 gap-4 md:w-1/2">
                    {allImages.slice(1, 5).map((src, index) => (
                      <div
                        key={index}
                        className="relative cursor-pointer"
                        onClick={() => openCarousel(index + 1)}
                      >
                        <OptimizedImage
                          src={src}
                          alt={`${propertyName} ${index + 2}`}
                          className="w-full h-32 md:h-[168px] object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>
                      </div>
                    ))}
                  </div>

                  {/* Show "View all photos" button if there are more than 5 images */}
                  {allImages.length > 5 && (
                    <button
                      className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-gray-100 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        openCarousel(0);
                      }}
                    >
                      View all {allImages.length} photos
                    </button>
                  )}
                </div>
              );
          }
        })()}
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
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black bg-opacity-50 p-2 rounded-lg max-w-full overflow-x-auto">
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
