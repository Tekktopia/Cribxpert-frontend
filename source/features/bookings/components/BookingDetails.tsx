import React from 'react';
import DatePicker from 'react-datepicker';
import { CiCircleCheck } from 'react-icons/ci';

interface BookingDetailsProps {
  startDate: Date | null;
  endDate: Date | null;
  guests: number;
  maxGuests: number;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onGuestChange: (delta: number) => void;
  onSave: () => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  startDate,
  endDate,
  guests,
  maxGuests,
  onStartDateChange,
  onEndDateChange,
  onGuestChange,
  onSave,
}) => {
  // Call onSave after each change
  const handleStartDateChange = (date: Date | null) => {
    onStartDateChange(date);
    onSave();
  };
  const handleEndDateChange = (date: Date | null) => {
    onEndDateChange(date);
    onSave();
  };
  const handleGuestChange = (delta: number) => {
    onGuestChange(delta);
    onSave();
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-[#313131] font-[500] text-[16px]">Booking Details</h3>
      </div>
      <div className="space-y-3">
        {/* Date Selection */}
        <div className="flex gap-3">
          <div className="flex items-start rounded-md bg-white border border-[#E6E6E6] px-4 py-2 w-1/2">
            <div className="w-4 h-4 mr-2 mt-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-full h-full text-gray-400"
              >
                <path
                  d="M8 2v3m8-3v3M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[#6F6F6F] text-[12px]">Start date</p>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                placeholderText="Select start date"
                className="text-[#313131] text-[14px] font-medium bg-transparent border-none outline-none w-full"
              />
            </div>
          </div>
          <div className="flex items-start rounded-md bg-white border border-[#E6E6E6] px-4 py-2 w-1/2">
            <div className="w-4 h-4 mr-2 mt-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-full h-full text-gray-400"
              >
                <path
                  d="M8 2v3m8-3v3M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[#6F6F6F] text-[12px]">End date</p>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || new Date()}
                placeholderText="Select end date"
                className="text-[#313131] text-[14px] font-medium bg-transparent border-none outline-none w-full"
              />
            </div>
          </div>
        </div>
        {/* Guests Selection */}
        <div className="flex items-center rounded-md bg-white border border-[#E6E6E6] px-4 py-3">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between">
              <p className="text-[#6F6F6F] text-[14px]">Guests</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-2 py-1 rounded bg-[#f3f3f3] text-[#313131] text-lg font-bold"
                  onClick={() => handleGuestChange(-1)}
                  disabled={guests <= 1}
                >
                  -
                </button>
                <span className="text-[#313131] text-[14px] font-medium min-w-[32px] text-center">
                  {guests} Guest{guests > 1 ? 's' : ''}
                </span>
                <button
                  type="button"
                  className="px-2 py-1 rounded bg-[#f3f3f3] text-[#313131] text-lg font-bold"
                  onClick={() => handleGuestChange(1)}
                  disabled={guests >= maxGuests}
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-[#999999] text-xs mt-1">
              Max guests: {maxGuests}
            </p>
          </div>
        </div>
        {/* Availability Check */}
        <div className="flex items-start gap-2">
          <CiCircleCheck size={20} color="#09974C" />
          <p className="text-[#999999] text-[14px]">Your dates are available</p>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
