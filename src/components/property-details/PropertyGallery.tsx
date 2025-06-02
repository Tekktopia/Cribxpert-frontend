import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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

  // Use all available images or default to the first one if only one image
  const allImages = images.length ? images : [images[0]];

  return (
    <div className="flex flex-col mt-4 sm:mt-8 md:flex-row items-center justify-center py-3 px-4 sm:px-6 lg:px-8 gap-4">
      {/* Mobile Carousel - Only visible on mobile */}
      <div className="relative w-full block md:hidden">
        <div className="relative w-full">
          {/* Current Image */}
          <OptimizedImage
            src={allImages[mobileImageIndex]}
            alt={`${propertyName} ${mobileImageIndex + 1}`}
            className="w-full h-[250px] sm:h-[350px] object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>

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
                <div className="relative w-full">
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
                    <div key={index} className="relative">
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
                  <div className="relative md:w-1/2">
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
                      <div key={index} className="relative">
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
                <div className="flex gap-4 w-full">
                  {/* Primary image */}
                  <div className="relative md:w-1/2">
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
                      <div key={index} className="relative">
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
                      className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-md text-sm font-medium shadow-md"
                      onClick={() => alert('View all photos clicked')}
                    >
                      View all {allImages.length} photos
                    </button>
                  )}
                </div>
              );
          }
        })()}
      </div>
    </div>
  );
};

export default PropertyGallery;
