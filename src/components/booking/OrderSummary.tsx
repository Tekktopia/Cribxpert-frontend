import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { CiCircleCheck } from 'react-icons/ci';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface BookingData {
 propertyId: string;
 startDate: Date | null;
 endDate: Date | null;
 guests: number;
 totalPrice: number;
 propertyName: string;
 propertyImages?: string[];
 maxGuests?: number;
}

interface OrderSummaryProps {
 bookingData?: BookingData;
 onBookingUpdate?: (updatedData: BookingData) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
 bookingData, 
 onBookingUpdate 
}) => {
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 const [isCarouselOpen, setIsCarouselOpen] = useState(false);
 const [carouselImageIndex, setCarouselImageIndex] = useState(0);
 const [touchStart, setTouchStart] = useState<number | null>(null);
 const [touchEnd, setTouchEnd] = useState<number | null>(null);
 
 // Editable booking details
 const [startDate, setStartDate] = useState<Date | null>(bookingData?.startDate || null);
 const [endDate, setEndDate] = useState<Date | null>(bookingData?.endDate || null);
 const [guests, setGuests] = useState<number>(bookingData?.guests || 1);
 const [isEditing, setIsEditing] = useState(false);

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

 // Handle guest count changes
 const handleGuestChange = (delta: number) => {
   setGuests((prev) => {
     const next = prev + delta;
     if (next < 1) return 1;
     if (next > maxGuests) return maxGuests;
     return next;
   });
 };

 // Handle saving changes
 const handleSaveChanges = () => {
   if (bookingData && onBookingUpdate) {
     const updatedData = {
       ...bookingData,
       startDate,
       endDate,
       guests,
       totalPrice: calculateTotalPrice()
     };
     onBookingUpdate(updatedData);
   }
   setIsEditing(false);
 };

 // Handle canceling changes
 const handleCancelChanges = () => {
   setStartDate(bookingData?.startDate || null);
   setEndDate(bookingData?.endDate || null);
   setGuests(bookingData?.guests || 1);
   setIsEditing(false);
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

 // Format dates for display
 const formatDate = (date: Date | null) => {
   if (!date) return 'Not selected';
   return new Date(date).toLocaleDateString('en-US', {
     weekday: 'short',
     day: 'numeric',
     month: 'short',
   });
 };

 // Calculate total price based on current selections
 const calculateTotalPrice = () => {
   if (!bookingData) return 170000;
   
   const basePrice = bookingData.totalPrice * 0.8; // Assuming base is 80% of original total
   const cleaningFee = bookingData.totalPrice * 0.1; // 10% for cleaning
   const serviceFee = bookingData.totalPrice * 0.1; // 10% for service
   
   return basePrice + cleaningFee + serviceFee;
 };

 // Calculate breakdown
 const basePrice = bookingData ? bookingData.totalPrice * 0.8 : 160000;
 const cleaningFee = bookingData ? bookingData.totalPrice * 0.1 : 10000;
 const serviceFee = bookingData ? bookingData.totalPrice * 0.1 : 0;
 const totalPrice = calculateTotalPrice();

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

 return (
   <div className="border border-[#E6E6E6] p-4 rounded-lg">
     {/* Property Image Carousel */}
     <div className="relative w-full">
       {propertyImages.length > 0 ? (
         <>
           <div
             className="cursor-pointer"
             onClick={() => openCarousel(currentImageIndex)}
           >
             <img
               src={propertyImages[currentImageIndex]}
               alt={`${bookingData?.propertyName || 'Property'} ${currentImageIndex + 1}`}
               className="w-full h-auto object-cover rounded-md"
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
                     className={`w-2 h-2 rounded-full transition-all ${
                       idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
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
     <div>
       <h2 className="mt-2 text-[#040404] font-[400] text-[14px]">
         {bookingData?.propertyName || 'Property Name'}
       </h2>
       <p className="text-[#6F6F6F] text-[14px] mb-5">
         Federal Capital Territory Gombe
       </p>
       <p className="text-[#999999]">
         ⭐4.5 [115 verified positive feedbacks]
       </p>
       <div className="w-full border border-[#cccccc] bg-[#F1E6F14D]/30 mt-4 p-2 rounded-md">
         <p className="text-[#6F6F6F] font-[400] text-[14px]">
           Great choice! Secure your booking now before it's gone.
         </p>
       </div>
     </div>

     {/* Booking Details - Editable */}
     <div className="mt-5">
       <div className="flex justify-between items-center mb-3">
         <h3 className="text-[#313131] font-[500] text-[16px]">Booking Details</h3>
         {!isEditing ? (
           <button
             onClick={() => setIsEditing(true)}
             className="text-[#006073] text-[14px] font-medium hover:underline"
           >
             Edit
           </button>
         ) : (
           <div className="flex gap-2">
             <button
               onClick={handleSaveChanges}
               className="text-[#006073] text-[14px] font-medium hover:underline"
             >
               Save
             </button>
             <button
               onClick={handleCancelChanges}
               className="text-[#999999] text-[14px] font-medium hover:underline"
             >
               Cancel
             </button>
           </div>
         )}
       </div>

       {!isEditing ? (
         // Display Mode
         <div className="flex md:flex-row flex-col justify-around gap-8">
           <div className="flex flex-col gap-2">
             <h2 className="text-[#6F6F6F] font-[400] text-[14px]">
               Check-in date
             </h2>
             <p className="text-[#6F6F6F] font-[400] text-[14px]">
               {formatDate(startDate)}
             </p>
           </div>
           <div className="flex flex-col gap-2">
             <h2 className="text-[#6F6F6F] font-[400] text-[14px]">
               Check-out date
             </h2>
             <p className="text-[#6F6F6F] font-[400] text-[14px]">
               {formatDate(endDate)}
             </p>
           </div>
           <div className="flex flex-col gap-2">
             <h2 className="text-[#6F6F6F] font-[400] text-[14px]">No of Guest</h2>
             <p className="text-[#6F6F6F] font-[400] text-[14px]">
               {guests} guest{guests > 1 ? 's' : ''}
             </p>
           </div>
         </div>
       ) : (
         // Edit Mode
         <div className="space-y-3">
           {/* Date Selection */}
           <div className="flex gap-3">
             <div className="flex items-start rounded-md bg-white border border-[#E6E6E6] px-4 py-2 w-1/2">
               <div className="w-4 h-4 mr-2 mt-1">
                 <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gray-400">
                   <path d="M8 2v3m8-3v3M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </div>
               <div className="flex-1">
                 <p className="text-[#6F6F6F] text-[12px]">Start date</p>
                 <DatePicker
                   selected={startDate}
                   onChange={(date) => setStartDate(date)}
                   selectsStart
                   startDate={startDate}
                   endDate={endDate}
                   minDate={new Date()}
                   placeholderText="Select start date"
                   className="text-[#313131] text-[14px] font-medium bg-transparent border-none outline-none w-full"
                 />
               </div>
             </div>

             <div className="flex items-start rounded-md bg-white border border-[#E6E6E6] px-4 py-2 w-1/2">
               <div className="w-4 h-4 mr-2 mt-1">
                 <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gray-400">
                   <path d="M8 2v3m8-3v3M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </div>
               <div className="flex-1">
                 <p className="text-[#6F6F6F] text-[12px]">End date</p>
                 <DatePicker
                   selected={endDate}
                   onChange={(date) => setEndDate(date)}
                   selectsEnd
                   startDate={startDate}
                   endDate={endDate}
                   minDate={startDate || new Date()}
                   placeholderText="Select end date"
                   className="text-[#313131] text-[14px] font-medium bg-transparent border-none outline-none w-full"
                 />
               </div>
             </div>
           </div>

           {/* Guests Selection */}
           <div className="flex items-center rounded-md bg-white border border-[#E6E6E6] px-4 py-3">
             <div className="flex flex-col w-full">
               <div className="flex items-center justify-between">
                 <p className="text-[#6F6F6F] text-[14px]">Guests</p>
                 <div className="flex items-center gap-2">
                   <button
                     type="button"
                     className="px-2 py-1 rounded bg-[#f3f3f3] text-[#313131] text-lg font-bold"
                     onClick={() => handleGuestChange(-1)}
                     disabled={guests <= 1}
                   >
                     -
                   </button>
                   <span className="text-[#313131] text-[14px] font-medium min-w-[32px] text-center">
                     {guests} Guest{guests > 1 ? 's' : ''}
                   </span>
                   <button
                     type="button"
                     className="px-2 py-1 rounded bg-[#f3f3f3] text-[#313131] text-lg font-bold"
                     onClick={() => handleGuestChange(1)}
                     disabled={guests >= maxGuests}
                   >
                     +
                   </button>
                 </div>
               </div>
               <p className="text-[#999999] text-xs mt-1">
                 Max guests: {maxGuests}
               </p>
             </div>
           </div>

           {/* Availability Check */}
           <div className="flex items-start gap-2">
             <CiCircleCheck size={20} color="#09974C" />
             <p className="text-[#999999] text-[14px]">Your dates are available</p>
           </div>
         </div>
       )}
     </div>

     {/* Price Breakdown */}
     <div className="mt-4">
       <div className="flex justify-between">
         <p className="text-[#6F6F6F] font-[400] text-[14px]">
           Booking fee[{nights} night{nights !== 1 ? 's' : ''}]
         </p>
         <p className="text-[#6F6F6F] font-[400] text-[14px]">
           NGN {basePrice.toLocaleString()}
         </p>
       </div>
       <div className="flex justify-between mt-2">
         <p className="text-[#6F6F6F] font-[400] text-[14px]">Cleaning Fee</p>
         <p className="text-[#6F6F6F] font-[400] text-[14px]">
           NGN {cleaningFee.toLocaleString()}
         </p>
       </div>
       <div className="flex justify-between mt-2">
         <p className="text-[#6F6F6F] font-[400] text-[14px]">Service Fee</p>
         <p className="text-[#6F6F6F] font-[400] text-[14px]">
           NGN {serviceFee.toLocaleString()}
         </p>
       </div>
       <div className="flex justify-between mt-2">
         <p className="text-[#313131] font-[400] text-[14px]">Total</p>
         <p className="text-[#313131] font-[500] text-[14px]">
           NGN {totalPrice.toLocaleString()}
         </p>
       </div>
       <button
         onClick={() => {
           const form = document.getElementById(
             'booking-form'
           ) as HTMLFormElement;
           if (form) {
             form.requestSubmit();
           }
         }}
         disabled={isSubmitting || isEditing}
         className={`w-full py-3 rounded-lg text-white font-medium mt-4 transition ${
           isSubmitting || isEditing
             ? 'bg-gray-400 cursor-not-allowed'
             : 'bg-[#006073] hover:bg-[#3c8999]'
         }`}
       >
         {isSubmitting ? 'Processing...' : isEditing ? 'Save Changes First' : 'Confirm Booking & Pay'}
       </button>
     </div>

     {/* Image Carousel Overlay */}
     {isCarouselOpen && propertyImages.length > 0 && (
       <div
         className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}
       >
         <button
           onClick={closeCarousel}
           className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors z-60 bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center"
           aria-label="Close carousel"
         >
           <FaTimes />
         </button>

         <div className="absolute top-4 left-4 text-white text-lg z-60 bg-black bg-opacity-50 px-3 py-1 rounded-md">
           {carouselImageIndex + 1} / {propertyImages.length}
         </div>

         {hasMultipleImages && (
           <>
             <button
               onClick={() =>
                 setCarouselImageIndex((prev) =>
                   prev === 0 ? propertyImages.length - 1 : prev - 1
                 )
               }
               className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors z-60 bg-black bg-opacity-50 w-12 h-12 rounded-full flex items-center justify-center"
               aria-label="Previous image"
             >
               <FaChevronLeft />
             </button>

             <button
               onClick={() =>
                 setCarouselImageIndex((prev) =>
                   prev === propertyImages.length - 1 ? 0 : prev + 1
                 )
               }
               className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors z-60 bg-black bg-opacity-50 w-12 h-12 rounded-full flex items-center justify-center"
               aria-label="Next image"
             >
               <FaChevronRight />
             </button>
           </>
         )}

         <div
           className="w-full h-full flex items-center justify-center p-4 cursor-pointer"
           onClick={closeCarousel}
         >
           <div
             className="relative max-w-[80vw] max-h-full"
             onClick={(e) => e.stopPropagation()}
           >
             <img
               src={propertyImages[carouselImageIndex]}
               alt={`${bookingData?.propertyName || 'Property'} ${carouselImageIndex + 1}`}
               className="max-w-full max-h-full object-contain"
             />
           </div>
         </div>

         {hasMultipleImages && (
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black bg-opacity-50 p-2 rounded-lg max-w-full overflow-x-auto">
             {propertyImages.map((src, index) => (
               <button
                 key={index}
                 onClick={() => setCarouselImageIndex(index)}
                 className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                   index === carouselImageIndex
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
           onClick={closeCarousel}
           aria-label="Close carousel"
         ></div>
       </div>
     )}
   </div>
 );
};

export default OrderSummary;