import React from 'react';
import car from '../../assets/icons/car.svg';
import { bookingsData } from '@/utils/data';
import { useParams } from 'react-router';

const Details: React.FC = () => {
  const { id } = useParams();
  const booking = bookingsData.find((b) => b.id === id);
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
                {booking.checkin}
              </p>
            </div>
            <div className="flex lg:items-center gap-2">
              <img src={car} alt="" className="hidden lg:block" />
              <p className="flex flex-col lg:flex-row lg:items-center gap-2">
                <span className="font-semibold">Check Out:</span>
                {booking.checkout}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p className="flex flex-col lg:flex-row lg:items-center gap-2">
              <span className="font-semibold">Nights:</span>
              {/* boilerplate */}3
            </p>
            <p className="flex flex-col lg:flex-row lg:items-center gap-2">
              <span className="font-semibold">Guests:</span>
              {/* boilerplate */}
              3(Adults 2, Children 1)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
