import React from 'react';
import { useLocation } from 'react-router-dom';
import danger from '@/assets/icons/danger.png';
import Header, { HeaderSpacer } from '@/components/layout/Header';
import OrderSummary from '@/components/booking/OrderSummary';
import Booking from '@/components/booking/Booking';

interface BookingData {
  propertyId: string;
  startDate: Date | null;
  endDate: Date | null;
  guests: number;
  totalPrice: number;
  propertyName: string;
}

const BookNowPage: React.FC = () => {
  const location = useLocation();
  const bookingData = location.state as BookingData;

  // If no booking data, show a message or redirect
  if (!bookingData) {
    return (
      <>
        <Header />
        <HeaderSpacer />
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
      </>
    );
  }
  return (
    <div>
      <Header />
      <HeaderSpacer />
      <div className="container mx-auto m-5 px-5 w-full">
        <h2 className="md:text-2xl container mx-auto text-xl text-[#040404] mb-6">
          Begin your booking
        </h2>
        <div className="p-2 container mx-auto max-w-[1280px] h-auto border border-[#cccccc] bg-[#f1e6f1]/60 rounded-md flex items-center gap-2">
          <img src={danger} alt="Danger Icon" className="w-[20px] h-[20px]" />
            <p className="text-[#6F6F6F] md:text-md text-sm">
            Booking for {bookingData.propertyName} •{" "}
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
            <OrderSummary bookingData={bookingData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookNowPage;
