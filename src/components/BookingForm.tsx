import React, { useState } from 'react';
import { PropertyListing } from '@/types';
import calender from '../assets/icons/calendar.png';
import certified from '../assets/icons/certified.png';
import { ChevronDown } from 'lucide-react';
import { CiCircleCheck } from 'react-icons/ci';
import { Link } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export interface BookingFormProps {
  property: PropertyListing;
}

const BookingForm: React.FC<BookingFormProps> = ({ property }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number>(1);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Maximum guests is the number of guests
  const maxGuests = property.guestNo || 1;

  const handleGuestChange = (delta: number) => {
    setGuests((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > maxGuests) return maxGuests;
      return next;
    });
  };

  // Dummy charges
  const cleaningFee = property.cleaningFee || 0; 
  const securityDepositFee = property.securityDeposit || 0;
  const tax = (property.basePrice * 0.1).toFixed(2); // Assuming a 10% tax on the base price

  // Calculate total price
  const totalPrice = (property.basePrice || 0) + cleaningFee + securityDepositFee + parseFloat(tax);

  return (
    <>
      <div className="w-full max-w-[480px] bg-white shadow-md border border-[#E6E6E6] rounded-lg p-5">
        {/* Price & Cancellation */}
        <div className="mb-4">
          <h4 className="text-[#000] text-[14px] font-bold">
            NGN {property.basePrice} <span className="font-normal">/night</span>
          </h4>
          <p className="text-[#6F6F6F] text-[14px]">All fees included</p>
          <hr className="border-[#E6E6E6] my-3" />
        </div>

        <div className="mb-4">
          <h4 className="text-[#6F6F6F] text-[14px] font-medium">
            Free cancellation
          </h4>
          <p className="text-[#6F6F6F] text-[14px]">
            Before{' '}
            {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
              undefined,
              {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              }
            )}
          </p>
        </div>

        {/* Date Selection */}
        <div className="flex gap-3">
          <div className="flex items-start rounded-md bg-white border border-[#E6E6E6] px-4 py-2 w-1/2">
            <img
              src={calender}
              alt="Calendar"
              className="w-[16px] h-[16px] mr-2"
            />
            <div>
              <p className="text-[#6F6F6F] text-[12px]">Start date</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                placeholderText="Select start date"
                className="text-[#313131] text-[14px] font-medium bg-transparent border-none outline-none"
              />
            </div>
          </div>

          <div className="flex items-start rounded-md bg-white border border-[#E6E6E6] px-4 py-2 w-1/2">
            <img
              src={calender}
              alt="Calendar"
              className="w-[16px] h-[16px] mr-2"
            />
            <div>
              <p className="text-[#6F6F6F] text-[12px]">End date</p>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || new Date()}
                placeholderText="Select end date"
                className="text-[#313131] text-[14px] font-medium bg-transparent border-none outline-none"
              />
            </div>
          </div>
        </div>

        {/* Guests Selection */}
        <div className="flex items-center rounded-md bg-white border border-[#E6E6E6] px-4 py-3 mt-3">
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
        <div className="flex items-start mt-3 gap-2 ">
          <CiCircleCheck size={20} color="#09974C" />
          <p className="text-[#999999] text-[14px]">Your dates are available</p>
        </div>

        <div
          className="flex items-center gap-2 justify-center text-[#6F6F6F] text-[14px] font-medium cursor-pointer mt-1"
          onClick={() => setShowBreakdown((prev) => !prev)}
        >
          View price breakdown <ChevronDown size={20} color="#006073" />
        </div>

        {/* Price Breakdown */}
        {showBreakdown && (
          <div className="bg-[#f9f9f9] rounded-md p-4 mt-2 mb-2 text-[14px] text-[#313131]">
            <div className="flex justify-between mb-1">
              <span>Base Price</span>
              <span>NGN {property.basePrice}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Cleaning Fee</span>
              <span>NGN {cleaningFee}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Service Fee</span>
              <span>NGN {securityDepositFee}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Tax</span>
              <span>NGN {tax}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>NGN {totalPrice}</span>
            </div>
          </div>
        )}

        {/* Price & Breakdown */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-[#313131] text-[16px] font-medium">Total Price</p>
          <h3 className="text-[#070707] text-[16px] font-semibold">
            NGN {totalPrice}
          </h3>
        </div>

        {/* CTA Button */}
        <Link
          to="/book-now"
          state={{
            propertyId: property._id,
            startDate,
            endDate,
            guests,
            totalPrice,
            propertyName: property.name,
          }}
        >
          <button className="bg-[#006073] w-full py-3 rounded-lg text-white font-medium mt-4 hover:bg-[#3c8999] transition">
            Book Now
          </button>
        </Link>

        {/* Confidence Guarantee */}
        <div className="flex items-center justify-center mt-3 text-[#070707] text-[14px]">
          <img
            src={certified}
            alt="Certified"
            className="w-[16px] h-[16px] mr-2"
          />
          <p>Book with confidence guarantee</p>
        </div>
      </div>
      <div className="py-8 text-center ">
        <p className="text-[#313131] text-[14px]">
          Property ID <strong>{property._id}</strong>
        </p>
        <p className="text-[#006073] font-[400] text-[14px] mt-3 cursor-pointer hover:underline">
          Contact host
        </p>
      </div>
    </>
  );
};

export default BookingForm;
