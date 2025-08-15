import { Booking } from '@/features/booking/bookingService';

const Listing = ({ booking }: { booking: Booking }) => {
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
              {booking.listing.name} - {booking.listing.description}
            </p>
          </div>
          {['pending', 'confirmed', 'cancelled'].includes(booking.status) && (
            <div className="flex gap-1 items-center mt-2">
              {/* boilerplate */}
              {/* <img src={star} alt="" /> */}
              <p>{booking.listing.rating} [115 verified positive feedbacks]</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
