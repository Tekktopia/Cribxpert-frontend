import React, { useState, useEffect } from 'react';
import makinwa from '@/assets/images/Makinwaa.png';

interface BookingData {
  propertyId: string;
  startDate: Date | null;
  endDate: Date | null;
  guests: number;
  totalPrice: number;
  propertyName: string;
}

interface OrderSummaryProps {
  bookingData?: BookingData;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ bookingData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Calculate the number of nights
  const calculateNights = () => {
    if (!bookingData?.startDate || !bookingData?.endDate) return 0;
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
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

  // Calculate breakdown (these could come from the API or be calculated)
  const basePrice = bookingData ? bookingData.totalPrice * 0.8 : 160000; // Assuming base is 80% of total
  const cleaningFee = bookingData ? bookingData.totalPrice * 0.1 : 10000; // 10% for cleaning
  const serviceFee = bookingData ? bookingData.totalPrice * 0.1 : 0; // 10% for service
  const totalPrice = bookingData?.totalPrice || 170000;
  return (
    <div className=" border border-[#E6E6E6] p-4  rounded-lg ">
      <img
        src={makinwa}
        alt="Makinwa "
        className="w-full h-auto object-cover rounded-md"
      />
      <div>
        <h2 className="mt-2 text-[#040404] font-[400] text-[14px] ">
          {bookingData?.propertyName || 'Property Name'}
        </h2>
        <p className="text-[#6F6F6F] text-[14px] mb-5">
          Federal Capital Territory Gombe
        </p>
        <p className="text-[#999999]">
          ⭐4.5 [115 verified positive feedbacks]
        </p>
        <div className="w-full border border-[#cccccc] bg-[#F1E6F14D]/30 mt-4 p-2 rounded-md">
          <p className="text-[#6F6F6F] font-[400]  text-[14px] ">
            Great choice! Secure your booking now before it’s gone.
          </p>
        </div>
      </div>

      <div className="mt-5 flex md:flex-row flex-col justify-around gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-[#6F6F6F] font-[400] text-[14px]">
            Check-in date
          </h2>
          <p className="text-[#6F6F6F] font-[400] text-[14px]">
            {formatDate(bookingData?.startDate || null)}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[#6F6F6F] font-[400] text-[14px]">
            Check-out date
          </h2>
          <p className="text-[#6F6F6F] font-[400] text-[14px]">
            {formatDate(bookingData?.endDate || null)}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[#6F6F6F] font-[400] text-[14px]">No of Guest</h2>
          <p className="text-[#6F6F6F] font-[400] text-[14px]">
            {bookingData?.guests || 1} guest
            {(bookingData?.guests || 1) > 1 ? 's' : ''}
          </p>
        </div>
      </div>
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
            // Trigger the booking form submission
            const form = document.getElementById(
              'booking-form'
            ) as HTMLFormElement;
            if (form) {
              form.requestSubmit();
            }
          }}
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg text-white font-medium mt-4 transition ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#006073] hover:bg-[#3c8999]'
          }`}
        >
          {isSubmitting ? 'Processing...' : 'Confirm Booking & Pay'}
        </button>
      </div>
    </div>
  );
};
export default OrderSummary;
