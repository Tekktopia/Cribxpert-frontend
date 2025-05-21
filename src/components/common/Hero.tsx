import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  images: string[];
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  interval?: number; // Auto-rotation interval in ms, default 5000
  showArrows?: boolean;
  showDots?: boolean;
  height?: string;
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
  height = 'h-[600px]',
  overlayOpacity = 50,
}) => {
  // State for tracking current image index
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Auto-rotate images
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(rotationInterval);
  }, [images.length, interval]);

  // Function to manually navigate to a specific slide
  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div
      className={`relative w-full ${height} bg-cover bg-center transition-all duration-700 ease-in-out`}
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-${overlayOpacity}`}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#E6E6E6] mb-4 max-w-3xl">
          {title}
        </h1>
        <p className="text-sm sm:text-base font-medium text-[#E6E6E6] mb-6">
          {subtitle}
        </p>
        <Link to={buttonLink}>
          <button className="bg-[#730071] px-6 py-2 rounded-md text-white text-sm md:text-base">
            {buttonText}
          </button>
        </Link>
      </div>

      {/* Carousel Navigation Dots */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
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

      {/* Left/Right Navigation Arrows */}
      {showArrows && images.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20"
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              )
            }
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20"
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
              )
            }
            aria-label="Next slide"
          >
            →
          </button>
        </>
      )}
    </div>
  );
};

export default Hero;
