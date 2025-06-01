import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface HeroProps {
  images: string[];
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  interval?: number; // Auto-rotation interval in ms, default 5000
  showArrows?: boolean;
  showDots?: boolean;
  overlayOpacity?: number;
}

const Hero: React.FC<HeroProps> = ({
  images,
  title,
  subtitle,
  buttonText,
  buttonLink,
  interval = 5000,
  showArrows = true,
  showDots = true,
  overlayOpacity = 50,
}) => {
  // State for tracking current image index and loaded state
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  
  // Calculate next image index for preloading
  const nextImageIndex = useMemo(() => 
    currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1, 
  [currentImageIndex, images.length]);

  // Auto-rotate images with useCallback for better performance
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(rotationInterval);
  }, [images.length, interval]);

  // Memoized function to manually navigate to a specific slide
  const goToSlide = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);
  
  // Handle image load with callback
  const handleImageLoad = useCallback((index: number) => {
    setImagesLoaded(prev => ({...prev, [index]: true}));
  }, []);

  return (
    <div className="relative w-full h-[50vh] lg:h-[80vh] overflow-hidden">
      {/* Better image handling with individual images instead of background */}
      {images.map((image, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            currentImageIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          aria-hidden={currentImageIndex !== index}
        >
          <OptimizedImage
            src={image}
            alt={`Hero slide ${index + 1}`}
            width={1920}
            height={1080}
            priority={index === 0 || index === nextImageIndex}
            loading={index <= 1 ? 'eager' : 'lazy'}
            className="w-full h-full object-cover"
            onLoad={() => handleImageLoad(index)}
          />
        </div>
      ))}

      {/* Preload next image */}
      {imagesLoaded[currentImageIndex] && (
        <link rel="preload" href={images[nextImageIndex]} as="image" />
      )}

      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black z-10" 
        style={{ opacity: overlayOpacity / 100 }}
      ></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#E6E6E6] mb-4 max-w-3xl">
          {title}
        </h1>
        <p className="text-sm sm:text-base font-medium text-[#E6E6E6] mb-6">
          {subtitle}
        </p>
        <Link to={buttonLink}>
          <button className="bg-[#730071] hover:bg-[#5c0059] transition-colors px-6 py-2 rounded-md text-white text-sm md:text-base">
            {buttonText}
          </button>
        </Link>
      </div>

      {/* Carousel Navigation Dots - Optimized */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 hover:cursor-pointer rounded-full transition-all ${
                currentImageIndex === index
                  ? 'bg-white scale-125'
                  : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Left/Right Navigation Arrows with improved accessibility and icons */}
      {showArrows && images.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full z-20 flex items-center justify-center"
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              )
            }
            aria-label="Previous slide"
          >
            <FaChevronLeft size={16} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full z-20 flex items-center justify-center"
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
              )
            }
            aria-label="Next slide"
          >
            <FaChevronRight size={16} />
          </button>
        </>
      )}
    </div>
  );
}

export default React.memo(Hero);