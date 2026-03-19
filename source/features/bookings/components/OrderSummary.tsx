import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ImageCarousel from './ImageCarousel';
import PropertyDetails from './PropertyDetails';
import BookingDetails from './BookingDetails';
import PriceBreakdown from './PriceBreakdown';
import AvailabilityDatePicker from './AvailabilityDatePicker';
import type { BookingData } from '@/types';

interface OrderSummaryProps {
  bookingData?: BookingData;
  onBookingUpdate?: (updatedData: BookingData) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  bookingData,
  onBookingUpdate,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselImageIndex, setCarouselImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Editable booking details state
  const [startDate, setStartDate] = useState<Date | null>(
    bookingData?.startDate || null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    bookingData?.endDate || null
  );
  const [guests, setGuests] = useState<number>(bookingData?.guests || 1);

  // Get property images or use a default placeholder
  const propertyImages = bookingData?.propertyImages || [];
  const hasMultipleImages = propertyImages.length > 1;
  const maxGuests = bookingData?.maxGuests || 8;

  // Listen for booking submission events
  useEffect(() => {
    const handleSubmissionStart = () => setIsSubmitting(true);
    const handleSubmissionEnd = () => setIsSubmitting(false);

    window.addEventListener('bookingSubmissionStart', handleSubmissionStart);
    window.addEventListener('bookingSubmissionEnd', handleSubmissionEnd);

    return () => {
      window.removeEventListener(
        'bookingSubmissionStart',
        handleSubmissionStart
      );
      window.removeEventListener('bookingSubmissionEnd', handleSubmissionEnd);
    };
  }, []);

  // Autosave booking changes
  useEffect(() => {
    if (bookingData && onBookingUpdate) {
      const updatedData: BookingData = {
        ...bookingData,
        startDate: startDate || null,
        endDate: endDate || null,
        guests,
        totalPrice: calculateTotalPrice(),
      };
      onBookingUpdate(updatedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, guests]);

  // Handle guest count changes
  const handleGuestChange = (delta: number) => {
    setGuests((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > maxGuests) return maxGuests;
      return next;
    });
  };

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

    if (isLeftSwipe && hasMultipleImages) {
      setCarouselImageIndex((prev) =>
        prev === propertyImages.length - 1 ? 0 : prev + 1
      );
    }

    if (isRightSwipe && hasMultipleImages) {
      setCarouselImageIndex((prev) =>
        prev === 0 ? propertyImages.length - 1 : prev - 1
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isCarouselOpen || !hasMultipleImages) return;

      switch (e.key) {
        case 'Escape':
          closeCarousel();
          break;
        case 'ArrowLeft':
          setCarouselImageIndex((prev) =>
            prev === 0 ? propertyImages.length - 1 : prev - 1
          );
          break;
        case 'ArrowRight':
          setCarouselImageIndex((prev) =>
            prev === propertyImages.length - 1 ? 0 : prev + 1
          );
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCarouselOpen, hasMultipleImages, propertyImages.length]);

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

  // Calculate the number of nights
  const calculateNights = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  const basePrice = bookingData?.basePrice ?? 0;
  const cleaningFee = bookingData?.cleaningFee ?? 0;
  const securityDeposit = bookingData?.securityDeposit ?? 0;
  const accommodationFee = basePrice + cleaningFee;
  const serviceFee = Math.round(accommodationFee * 0.05);
  const vat = Math.round((accommodationFee + serviceFee) * 0.075);
  const totalPrice = accommodationFee + serviceFee + vat + securityDeposit;

  const calculateTotalPrice = () => {
    const base = bookingData?.basePrice ?? 0;
    const cleaning = bookingData?.cleaningFee ?? 0;
    const security = bookingData?.securityDeposit ?? 0;
    const accommodation = base + cleaning;
    return accommodation + Math.round(accommodation * 0.05) + Math.round(accommodation * 0.075) + security;
  };

  // Navigate to next image
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === propertyImages.length - 1 ? 0 : prev + 1
    );
  };

  // Navigate to previous image
  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? propertyImages.length - 1 : prev - 1
    );
  };

  // Handler for date range selection from AvailabilityDatePicker
  const handleDateRangeChange = (
    checkIn: Date | null,
    checkOut: Date | null
  ) => {
    setStartDate(checkIn);
    setEndDate(checkOut);
  };

  return (
    <div className="border border-[#E6E6E6] p-4 rounded-lg">
      {/* Property Image Carousel */}
      <div className="relative w-full">
        {propertyImages.length > 0 ? (
          <>
            <div
              className="cursor-pointer w-full h-[220px] sm:h-[260px] rounded-md overflow-hidden"
              onClick={() => openCarousel(currentImageIndex)}
            >
              <img
                src={propertyImages[currentImageIndex]}
                alt={`${bookingData?.propertyName || 'Property'} ${currentImageIndex + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-5 rounded-md"></div>
            </div>

            {/* Navigation Arrows - Only show if multiple images */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all"
                  aria-label="Previous image"
                >
                  <FaChevronLeft size={12} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all"
                  aria-label="Next image"
                >
                  <FaChevronRight size={12} />
                </button>

                {/* Pagination Dots */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
                  {propertyImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
                  {currentImageIndex + 1} / {propertyImages.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500">No images available</span>
          </div>
        )}
      </div>

      {/* Property Details */}
      <PropertyDetails
        name={bookingData?.propertyName}
        location="Federal Capital Territory Gombe"
        rating={4.5}
        feedbackCount={115}
      />

      {/* Booking Details - Always Editable */}
      <div className="mb-4">
        <AvailabilityDatePicker
          listingId={bookingData?.propertyId || ''}
          onDateSelect={handleDateRangeChange}
          selectedCheckIn={startDate}
          selectedCheckOut={endDate}
          className="flex items-start rounded-md bg-white border border-[#E6E6E6] px-4 py-2 w-full"
        />
      </div>
      <BookingDetails
        startDate={startDate}
        endDate={endDate}
        guests={guests}
        maxGuests={maxGuests}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onGuestChange={handleGuestChange}
        onSave={() => { }}
      />

      {/* Price Breakdown */}
      <PriceBreakdown
        nights={nights}
        accommodationFee={accommodationFee}
        serviceFee={serviceFee}
        vat={vat}
        securityDeposit={securityDeposit}
        totalPrice={totalPrice}
        isSubmitting={isSubmitting}
        isEditing={false}
        onConfirm={() => {
          const form = document.getElementById('booking-form') as HTMLFormElement;
          if (form) form.requestSubmit();
        }}
      />

      {/* Image Carousel Overlay */}
      <ImageCarousel
        images={propertyImages}
        isOpen={isCarouselOpen && propertyImages.length > 0}
        currentIndex={carouselImageIndex}
        onClose={closeCarousel}
        onPrev={() =>
          setCarouselImageIndex((prev) =>
            prev === 0 ? propertyImages.length - 1 : prev - 1
          )
        }
        onNext={() =>
          setCarouselImageIndex((prev) =>
            prev === propertyImages.length - 1 ? 0 : prev + 1
          )
        }
        onSelect={setCarouselImageIndex}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default OrderSummary;
