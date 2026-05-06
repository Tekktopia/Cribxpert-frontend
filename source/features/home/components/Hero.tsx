import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '@/shared/components/OptimizedImage';

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
  fullHeight?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  images,
  title,
  subtitle,
  buttonText,
  buttonLink,
  interval = 5000,
  showDots = true,
  overlayOpacity = 60,
  fullHeight = true,
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
    <div className={`relative w-full overflow-hidden premium-transition ${fullHeight ? 'h-screen' : 'h-[60vh] lg:h-[80vh]'}`}>
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

      {/* Content - Bottom Left */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end items-start h-full text-left text-white px-[2%] pb-24">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic mb-6 leading-[1.1] tracking-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg font-medium text-neutral-100/80 mb-10 max-w-xl leading-relaxed uppercase tracking-[0.3em] text-[11px]">
            {subtitle}
          </p>
          <Link to={buttonLink}>
            <button className="premium-transition border border-white/50 text-white px-10 py-3.5 rounded-full text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-neutral-900 shadow-premium hover:shadow-premium-hover">
              {buttonText}
            </button>
          </Link>
        </div>
      </div>

      {/* Carousel Navigation Dashes - Bottom Right */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-12 right-[4%] z-20 flex gap-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-[2px] transition-all duration-500 hover:cursor-pointer ${
                currentImageIndex === index
                  ? 'w-12 bg-white'
                  : 'w-8 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(Hero);