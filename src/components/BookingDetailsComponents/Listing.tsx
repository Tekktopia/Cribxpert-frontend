import React from 'react';
import star from '../../assets/icons/star.svg';
import { bookingsData } from '@/utils/data';
import { useParams } from 'react-router';

const Listing = () => {
  const { id } = useParams();
  const booking = bookingsData.find((b) => b.id === id);
  return (
    <div className="text-[#6F6F6F] p-4">
      <div className="flex flex-col lg:flex-row gap-6 ">
        <div className="flex flex-col  gap-3 lg:gap-6 w-full">
          <h2 className="font-semibold text-[#313131]">Date:</h2>
          <div className="flex flex-col gap-2">
            {/* boilerplate */}
            <p>December 10, 2024</p>
            {/* boilerplate */}
            <p>04:20pm</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:gap-6 w-full">
          <div>
            <h2 className="font-semibold text-[#313131]">Listing Name:</h2>
          </div>
          <div>
            <p>
              {booking.name} - {booking.description}
            </p>
          </div>
          {['pending', 'confirmed', 'cancelled'].includes(booking.status) && (
            <div className="flex gap-1 items-center mt-2">
              {/* boilerplate */}
              <img src={star} alt="" />
              <p>4.5 [115 verified positive feedbacks]</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
