import { useEffect } from 'react';

interface ReviewCarouselProps {
  carouselId: string;
  slidesPerView: number;
  totalSlides: number;
}

/**
 * ReviewCarousel component adds carousel functionality to review cards
 */
const ReviewCarousel = ({
  carouselId,
  slidesPerView,
  totalSlides,
}: ReviewCarouselProps) => {
  useEffect(() => {
    // Initialize carousel functionality when component mounts
    const initCarousel = () => {
      const carousel = document.getElementById(
        `reviews-carousel-${carouselId}`
      );
      const prevButton = document.getElementById(`prev-reviews-${carouselId}`);
      const nextButton = document.getElementById(`next-reviews-${carouselId}`);
      const currentSlideEl = document.getElementById(
        `current-slide-${carouselId}`
      );
      const totalSlidesEl = document.getElementById(
        `total-slides-${carouselId}`
      );

      if (!carousel || !prevButton || !nextButton) return;

      let currentSlide = 0;
      const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;

      // Update slide counter if elements exist
      if (currentSlideEl && totalSlidesEl) {
        currentSlideEl.textContent = '1';
        totalSlidesEl.textContent = (maxSlide + 1).toString();
      }

      // For grid layouts
      const updateCarouselGrid = (index: number) => {
        if (carousel) {
          // For grid layouts, we need to transform using translateX
          carousel.style.transform = `translateX(-${index * 100}%)`;

          // Update slide indicators
          if (currentSlideEl) {
            currentSlideEl.textContent = (index + 1).toString();
          }

          // Update mobile dots if on mobile
          if (carouselId === 'sm') {
            const dots = document.querySelectorAll('.carousel-dot');
            dots.forEach((dot, i) => {
              if (i === index) {
                dot.classList.add('bg-[#8B2B89]');
                dot.classList.remove('bg-[#E6E6E6]');
              } else {
                dot.classList.add('bg-[#E6E6E6]');
                dot.classList.remove('bg-[#8B2B89]');
              }
            });
          }
        }
      };

      // Move to previous slide
      const goToPrevSlide = () => {
        currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
        updateCarouselGrid(currentSlide);
      };

      // Move to next slide
      const goToNextSlide = () => {
        currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
        updateCarouselGrid(currentSlide);
      };

      // Add event listeners to buttons
      prevButton.addEventListener('click', goToPrevSlide);
      nextButton.addEventListener('click', goToNextSlide);

      // Initialize dots for mobile
      if (carouselId === 'sm') {
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
          dot.addEventListener('click', () => {
            currentSlide = i;
            updateCarouselGrid(currentSlide);
          });
        });
      }

      // Clean up
      return () => {
        prevButton.removeEventListener('click', goToPrevSlide);
        nextButton.removeEventListener('click', goToNextSlide);
      };
    };

    // Initialize after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(initCarousel, 100);

    // Clean up
    return () => clearTimeout(timeoutId);
  }, [carouselId, slidesPerView, totalSlides]);

  return null; // This is just a functionality component, doesn't render anything
};

export default ReviewCarousel;
