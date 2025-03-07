import React from 'react';
import danger from '../../assets/icons/danger.png';
import Header from '../../components/layout/Header';
import OrderSummary from './OrderSummary';
import Booking from './Booking';
const BookingPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="md:m-8 m-5 w-full">
        <h2 className="md:text-2xl text-xl text-[#040404] mb-6">
          Begin your booking
        </h2>
        <div className="p-2 max-w-[1280px] h-auto border border-[#cccccc] bg-[#f1e6f1]/60 rounded-md flex items-center gap-2">
          <img src={danger} alt="Danger Icon" className="w-[20px] h-[20px]" />
          <p className="text-[#6F6F6F] md:text-md text-sm">
            Price and availability may change. Free cancellation until Jan 17,
            2025.
          </p>
        </div>
      </div>
      <div className="container mx-auto p-6">
        <div className="flex flex-col-reverse md:flex-row justify-around gap-8">
          <div className="md:w-1/2">
            <Booking />
          </div>
          <div className="md:w-1/2">
            <OrderSummary />
          </div>
        </div>
      </div>
    </>
  );
};
export default BookingPage;
