import React from 'react';
import { car } from '@/assets';
import { Booking } from '@/features/bookings/bookingService';

const Details: React.FC<{ booking: Booking }> = ({ booking }) => {
  return (
    <div className="text-[#6F6F6F] p-4">
      <div className="flex lg:flex-row flex-col justify-between lg:items-center mb-4">
        <div className="mb-4 lg:mb-1">
          <h1 className="font-semibold text-[#313131]">Details</h1>
        </div>
        <div className="flex  gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex  lg:items-center gap-2">
              <img src={car} alt="" className="hidden lg:block" />
              <p className="flex flex-col lg:flex-row  lg:items-center gap-2">
                <span className="font-semibold">Check In:</span>
                {booking.startDate}
              </p>
            </div>
            <div className="flex lg:items-center gap-2">
              <img src={car} alt="" className="hidden lg:block" />
              <p className="flex flex-col lg:flex-row lg:items-center gap-2">
                <span className="font-semibold">Check Out:</span>
                {booking.endDate}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p className="flex flex-col lg:flex-row lg:items-center gap-2">
              <span className="font-semibold">Nights:</span>
              {/* Calculate nights between dates */}
              {Math.ceil(
                (new Date(booking.endDate).getTime() -
                  new Date(booking.startDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}
            </p>
            <p className="flex flex-col lg:flex-row lg:items-center gap-2">
              <span className="font-semibold">Guests:</span>
              {booking.travelersNo}(Adults {booking.travelersNo}, Children 1)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
