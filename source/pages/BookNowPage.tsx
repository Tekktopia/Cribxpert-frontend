import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { danger } from '@/assets';
import OrderSummary from '@/features/bookings/components/OrderSummary';
import Booking from '@/features/bookings/components/Booking';
import type { BookingData } from '@/types';

const BookNowPage: React.FC = () => {
  const location = useLocation();
  const initialBookingData = location.state as BookingData;

  // Local state to hold the booking data
  const [bookingData, setBookingData] =
    useState<BookingData>(initialBookingData);

  // Function to handle booking updates
  const handleBookingUpdate = (updatedData: BookingData) => {
    setBookingData(updatedData);
  };

  // If no booking data, show a message or redirect
  if (!bookingData) {
    return (
      <div className="h-full mt-[130px]">
        <div className="container mx-auto p-8 text-center">
          <h2 className="text-2xl text-[#040404] mb-4">
            Invalid Booking Request
          </h2>
          <p className="text-[#6F6F6F] mb-6">
            No booking information found. Please start your booking from a
            property page.
          </p>
          <a
            href="/discover"
            className="bg-[#006073] text-white px-6 py-3 rounded-lg hover:bg-[#3c8999] transition"
          >
            Browse Properties
          </a>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="container mx-auto m-5 px-5 w-full">
        <h2 className="md:text-2xl container mx-auto text-xl text-[#040404] mb-6">
          Begin your booking
        </h2>
        <div className="p-2 container mx-auto max-w-[1280px] h-auto border border-[#cccccc] bg-[#3c899977] rounded-md flex items-center gap-2">
          <img src={danger} alt="Danger Icon" className="w-[20px] h-[20px]" />
          <p className="text-[#6F6F6F] md:text-md text-sm">
            Booking for {bookingData.propertyName} •{' '}
            {bookingData.startDate &&
              (() => {
                const start = new Date(bookingData.startDate);
                const sevenDaysBefore = new Date(start);
                sevenDaysBefore.setDate(start.getDate() - 7);
                return `You can cancel your booking until 7 days before check-in: ${sevenDaysBefore.toLocaleDateString()}`;
              })()}
          </p>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col-reverse md:flex-row justify-around gap-8">
          <div className="md:w-1/2">
            <Booking bookingData={bookingData} />
          </div>
          <div className="md:w-1/2">
            <OrderSummary
              bookingData={bookingData}
              onBookingUpdate={handleBookingUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookNowPage;
