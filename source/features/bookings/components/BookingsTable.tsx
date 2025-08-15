import React, { useState } from 'react';
import { Booking } from '@/features/bookings/bookingService';
import { navigationIcons } from '@/assets';
import { useNavigate } from 'react-router';
import StatusButton from './StatusButton';
import { RefreshCw } from 'lucide-react';
// import { useBookingStore } from '@/store/bookingStore';

const { chevronLeft, chevronRight } = navigationIcons;

type BookingsTableProps = {
  bookings: Booking[];
  error?: string | null;
  onRetry?: () => void;
};

const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  error,
  onRetry,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

  const navigate = useNavigate();
  // const setSelectedBooking = useBookingStore(
  //   (state) => state.setSelectedBooking
  // );
  const handleViewDetails = (id: string) => {
    navigate(`/booking/${id}`);
  };

  // Helper to map Booking to UI fields
  const mapBookingToUI = (booking: Booking) => {
    let image = '';
    if (booking.listing.listingImg && booking.listing.listingImg.length > 0) {
      // Use fileUrl if present, otherwise fallback to the value itself (for legacy data)
      const firstImg = booking.listing.listingImg[0];
      image = typeof firstImg === 'string' ? firstImg : firstImg.fileUrl || '';
    }
    return {
      id: booking._id,
      image,
      name: booking.listing.name,
      checkin: new Date(booking.startDate).toLocaleDateString(),
      checkout: new Date(booking.endDate).toLocaleDateString(),
      status: booking.status,
      description: booking.listing.description,
    };
  };

  // Show error state with retry button
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Failed to load bookings
          </h3>
          <p className="text-gray-500 mb-4">{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-[#1D5C5C] text-white px-6 py-2 rounded-lg hover:bg-[#164444] transition flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  // Show empty state (no bookings found)
  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <img
          src={'/images/no-bookings.png'}
          alt="No bookings"
          className="w-[50%] h-auto object-contain mb-4"
        />
        {/* <p className="text-lg text-gray-500">No bookings found.</p> */}
      </div>
    );
  }

  return (
    <div className="pt-10">
      <div className="w-full bg-white rounded-lg shadow-md p-7 border border-[#E2E8F0]">
        <div className="hidden lg:flex justify-between items-center mb-4 pb-3 text-neutralDark text-[20px]  font-semibold">
          <h1>Booking ID</h1>
          <h1>Property Name</h1>
          <h1>Check-in Date</h1>
          <h1>Check-out Date</h1>
          <h1>Booking Status</h1>
          <h1>Action</h1>
        </div>
        <hr className="border hidden lg:flex border-neutralLight w-full" />

        {currentBookings.map((booking, index) => {
          const uiBooking = mapBookingToUI(booking);
          return (
            <div
              key={index}
              className="hidden lg:flex  justify-between items-center py-4 border-b border-neutralLight"
            >
              <span className="text-neutralDark">{uiBooking.id}</span>
              <div className="flex items-center gap-4">
                <img
                  src={uiBooking.image}
                  alt={uiBooking.name}
                  className="w-20 h-[70px] rounded-md object-cover"
                />
                <span className="text-neutralDark">{uiBooking.name}</span>
              </div>
              <div>
                <span className="text-neutralDark">{uiBooking.checkin}</span>
              </div>
              <div>
                <span className="text-neutralDark">{uiBooking.checkout}</span>
              </div>
              <div>
                <StatusButton status={uiBooking.status} />
              </div>
              <button
                type="button"
                className="bg-transparent items-center justify-center  px-[5px] rounded-[5px] py-[8px] gap-4 w-[112px] hover:bg-primary hover:text-white flex border-[1.5px] border-primary text-[12px] sm:text-[14px] text-primary"
                onClick={() => {
                  handleViewDetails(uiBooking.id);
                }}
              >
                View Details
              </button>
            </div>
          );
        })}
        {/* Mobile */}
        {currentBookings.map((booking, index) => {
          const uiBooking = mapBookingToUI(booking);
          return (
            <div
              key={index}
              className="flex  lg:hidden flex-col justify-between items-center py-4 border-b border-neutralLight"
            >
              <div className="flex flex-col items-center gap-4">
                <img
                  src={uiBooking.image}
                  alt={uiBooking.name}
                  className="w-full rounded-md object-cover"
                />
              </div>
              <div className="mt-4 flex justify-between w-full items-center gap-2">
                <span className="text-neutralDark">{uiBooking.name}</span>
                <span className="text-[12px] px-2 py-1">
                  {uiBooking.status}
                </span>
              </div>
              <div className="flex  w-full items-center gap-2">
                <p className="text-[#6F6F6F]">Booking</p>
                <span className="text-neutral">{uiBooking.id}</span>
              </div>

              <div className="flex my-2 self-start justify-between w-3/4 items-start gap-2">
                <div>
                  <p className="text-[#6F6F6F]">Check-in</p>
                  <span className="text-neutralDark text-[14px]">
                    {uiBooking.checkin}
                  </span>
                </div>
                <div>
                  <p className="text-[#6F6F6F]">Check-out</p>
                  <span className="text-neutralDark text-[14px]">
                    {uiBooking.checkout}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="bg-transparent items-center justify-center hover:text-white px-[5px] rounded-[5px] py-[8px] gap-4 w-full hover:bg-primary flex border-[1.5px] border-primary text-[12px] sm:text-[14px] text-primary"
              >
                View Details
              </button>
            </div>
          );
        })}

        <div className="flex flex-col lg:flex-row justify-between items-center  mt-4 gap-4">
          <div>
            <span className="px-4 md:text-[16px] text-[12px]  py-2">{` Showing Page ${currentPage} of ${totalPages}`}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2  bg-accent rounded disabled:opacity-50"
            >
              <img src={chevronLeft} alt="<" />
            </button>

            <div className="flex items-center gap-2 ">
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 w-8 text-center text-[14px] rounded ${
                      page === currentPage
                        ? 'bg-primary text-white'
                        : 'bg-accent text-primary'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2  bg-accent rounded disabled:opacity-50"
            >
              <img src={chevronRight} alt=">" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsTable;
