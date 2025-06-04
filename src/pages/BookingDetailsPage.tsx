import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { bookingsData } from '@/utils/data';
import leftArrow from '../assets/icons/arrow-left-01.svg';
import printer from '../assets/icons/printer.svg';
import edit from '../assets/icons/edit-2.svg';
import message from '../assets/icons/message.svg';
import StatusButton from '@/components/BookingComponents/StatusButton';
import Details from '@/components/BookingDetailsComponents/Details';
import Rules from '@/components/BookingDetailsComponents/Rules';
import Host from '@/components/BookingDetailsComponents/Host';
import Listing from '@/components/BookingDetailsComponents/Listing';
import CancellationPolicy from '@/components/BookingDetailsComponents/CancellationPolicy';
import Payment from '@/components/BookingDetailsComponents/Payment';
import Ratings from '@/components/BookingDetailsComponents/Ratings';

const BookingDetailsPage: React.FC = () => {
  //   const selectedBooking = useBookingStore((state) => state.selectedBooking);

  //   if (!selectedBooking) return <div>No booking found</div>;
  const navigate = useNavigate();
  const { id } = useParams();
  const booking = bookingsData.find((b) => b.id === id);

  if (!booking) {
    return <div className="p-6 text-red-500">Booking not found.</div>;
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex text-[#313131] "
      >
        <img src={leftArrow} alt={booking.name} />
        Back to bookings
      </button>
      <div className="flex lg:flex-row flex-col justify-between">
        <div
          className="flex w-full flex-col gap-[40px] 
        "
        >
          <img
            src={booking.image}
            alt={booking.name}
            className="w-full max-w-xl rounded mb-4"
          />
          <div className="flex flex-col lg:flex-row justify-between lg:items-center">
            <div className="flex justify-between items-center gap-4">
              <h1 className="text-[#313131] text-center font-bold text-lg lg:text-xl">
                Booking #{booking.id}
              </h1>
              <StatusButton status={booking.status} type="details" />
            </div>
            <div className="flex items-center mt-2">
              <img
                src={printer}
                alt=""
                className="w-8 h-8 border-[1.5px] border-primary rounded-md p-1 mr-2 hover:bg-primary/45  transition-colors duration-300"
              />
              {(booking.status === 'pending' ||
                booking.status === 'confirmed') && (
                <img
                  src={edit}
                  alt=""
                  className="w-8 h-8 border-[1.5px] border-primary rounded-md p-1 mr-2 hover:bg-primary/45 transition-colors duration-300"
                />
              )}
              <img
                src={message}
                alt=""
                className="w-8 h-8 border-[1.5px] border-primary rounded-md p-1 mr-2 hover:bg-primary/45 transition-colors duration-300"
              />
            </div>
          </div>
          <hr />
          <Listing />
          <hr />

          <Details />
          <hr />
          {['pending', 'confirmed', 'cancelled'].includes(booking.status) && (
            <Rules />
          )}

          <hr />
          <Host />
          <hr />
          {['pending', 'confirmed', 'cancelled'].includes(booking.status) && (
            <CancellationPolicy />
          )}
          {booking.status === 'completed' && <Ratings />}
        </div>
        <div className="w-full flex">
          {/* {(booking.status === 'pending' || booking.status === 'confirmed' || ) && (
            <Payment />
          )} */}
          {['pending', 'confirmed', 'completed'].includes(booking.status) && (
            <Payment />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
