import React from 'react';
import Header from '@/components/layout/Header';
import OrderSummary from "../booking/OrderSummary"
import Booking from "../booking/Booking"

const BookingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-xl md:text-2xl font-medium text-[#040404] mb-4">
          Begin your booking
        </h2>
        
        <div className="bg-[#F1E6F199]/60 rounded-lg p-4 flex items-start gap-3 mb-6">
          
          <p className="text-sm text-[#460045]">
            Price and availability may change. Free cancellation until Jan 17, 2025.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          <Booking />
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;