import React from 'react';
import DatePicker from 'react-datepicker';
import { CiCircleCheck } from 'react-icons/ci';

interface BookingDetailsProps {
  isEditing: boolean;
  startDate: Date | null;
  endDate: Date | null;
  guests: number;
  maxGuests: number;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onGuestChange: (delta: number) => void;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

const formatDate = (date: Date | null) => {
  if (!date) return 'Not selected';
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
};

const BookingDetails: React.FC<BookingDetailsProps> = ({
  isEditing,
  startDate,
  endDate,
  guests,
  maxGuests,
  onStartDateChange,
  onEndDateChange,
  onGuestChange,
  onSave,
  onCancel,
  onEdit,
}) => (
  <div className="mt-5">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-[#313131] font-[500] text-[16px]">Booking Details</h3>
    {!isEditing ? (
      <button
        onClick={onEdit}
        className="p-2 hover:bg-gray-100 rounded"
        title="Edit"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
        <path d="M14.85 2.85a1.207 1.207 0 0 1 1.7 1.7l-1.1 1.1-1.7-1.7 1.1-1.1ZM3 14.25V17h2.75l8.09-8.09-1.7-1.7L3 14.25Z" stroke="#006073" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    ) : (
      <div className="flex gap-2">
        <button
        onClick={onSave}
        className="p-2 hover:bg-gray-100 rounded"
        title="Save"
        >
        <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
          <path d="M5 10.5l3 3 7-7" stroke="#09974C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </button>
        <button
        onClick={onCancel}
        className="p-2 hover:bg-gray-100 rounded"
        title="Cancel"
        >
        <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
          <path d="M6 6l8 8M14 6l-8 8" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </button>
      </div>
    )}
    </div>
    {!isEditing ? (
      <div className="flex md:flex-row flex-col justify-around gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-[#6F6F6F] font-[400] text-[14px]">
            Check-in date
          </h2>
          <p className="text-[#6F6F6F] font-[400] text-[14px]">
            {formatDate(startDate)}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[#6F6F6F] font-[400] text-[14px]">
            Check-out date
          </h2>
          <p className="text-[#6F6F6F] font-[400] text-[14px]">
            {formatDate(endDate)}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[#6F6F6F] font-[400] text-[14px]">No of Guest</h2>
          <p className="text-[#6F6F6F] font-[400] text-[14px]">
            {guests} guest{guests > 1 ? 's' : ''}
          </p>
        </div>
      </div>
    ) : (
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
                onChange={onStartDateChange}
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
                onChange={onEndDateChange}
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
                  onClick={() => onGuestChange(-1)}
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
                  onClick={() => onGuestChange(1)}
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
    )}
  </div>
);

export default BookingDetails;
