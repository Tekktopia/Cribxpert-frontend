import React, { useState } from 'react';
import { BookingsType } from '@/types';
import chevronLeft from '../../assets/icons/chevron-left.svg';
import chevronRight from '../../assets/icons/chevron-right.svg';
type BookingsTableProps = {
  bookings: BookingsType[];
};

const BookingsTable: React.FC<BookingsTableProps> = ({ bookings }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

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

        {currentBookings.map((booking, index) => (
          <div
            key={index}
            className="hidden lg:flex  justify-between items-center py-4 border-b border-neutralLight"
          >
            <span className="text-neutralDark">{booking.id}</span>
            <div className="flex items-center gap-4">
              <img
                src={booking.image}
                alt={booking.name}
                className="w-20 h-[70px] rounded-md object-cover"
              />
              <span className="text-neutralDark">{booking.name}</span>
            </div>
            <div>
              <span className="text-neutralDark">{booking.checkin}</span>
            </div>
            <div>
              <span className="text-neutralDark">{booking.checkout}</span>
            </div>
            <div>
              <span>{booking.status}</span>
            </div>
            <button
              type="button"
              className="bg-transparent items-center justify-center text-white px-[5px] rounded-[5px] py-[8px] gap-4 w-[112px] hover:bg-primary hover:text-white flex border-[1.5px] border-primary text-[12px] sm:text-[14px] text-primary"
            >
              View Details
            </button>
          </div>
        ))}
        {/* Mobile */}
        {currentBookings.map((booking, index) => (
          <div
            key={index}
            className="flex  lg:hidden flex-col justify-between items-center py-4 border-b border-neutralLight"
          >
            <div className="flex flex-col items-center gap-4">
              <img
                src={booking.image}
                alt={booking.name}
                className="w-full rounded-md object-cover"
              />
            </div>
            <div className="mt-4 flex justify-between w-full items-center gap-2">
              <span className="text-neutralDark">{booking.name}</span>
              <span className="text-[12px] px-2 py-1">{booking.status}</span>
            </div>
            <div className="flex  w-full items-center gap-2">
              <p className="text-[#6F6F6F]">Booking</p>
              <span className="text-neutral">{booking.id}</span>
            </div>

            <div className="flex my-2 self-start justify-between w-3/4 items-start gap-2">
              <div>
                <p className="text-[#6F6F6F]">Check-in</p>
                <span className="text-neutralDark text-[14px]">
                  {booking.checkin}
                </span>
              </div>
              <div>
                <p className="text-[#6F6F6F]">Check-out</p>
                <span className="text-neutralDark text-[14px]">
                  {booking.checkout}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="bg-transparent items-center justify-center text-white px-[5px] rounded-[5px] py-[8px] gap-4 w-full hover:bg-primary  flex border-[1.5px] border-primary text-[12px] sm:text-[14px] text-primary"
              //   onClick={}
            >
              View Details
            </button>
          </div>
        ))}

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
            {/* <span className="px-4 py-2 w-8 h-8 p-[6px] rounded-lg bg-">{` ${currentPage}`}</span> */}

            <div className="flex items-center gap-2 ">
              {/* {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;

                if (
                  page === 1 ||
                  page === currentPage ||
                  page === totalPages ||
                  (page <= 3 && currentPage <= 3) ||
                  (page >= currentPage &&
                    page <= currentPage + 1 &&
                    currentPage > 2)
                ) {
                  return (
                    <button
                      key={page}
                      //   onClick={() => setCurrentPage(page)}
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`px-3 py-1 w-8 text-center rounded  ${
                        page === currentPage
                          ? 'bg-primary text-white'
                          : 'bg-accent text-primary'
                      }`}
                    >
                      {page}
                    </button>
                  );
                }

                // Show ellipsis once between page ranges
                if (
                  (page === 4 && currentPage <= 3) ||
                  (page === currentPage + 2 && currentPage < totalPages - 2)
                ) {
                  return <span key={`dots-${page}`}>...</span>;
                }

                return null;
              })} */}

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
              //   onClick={() =>
              //     setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              //   }
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
