import React, { useState } from 'react';
import { PropertyListing } from '@/types';
import { certified } from '@/assets';
import { ChevronDown } from 'lucide-react';
import { CiCircleCheck } from 'react-icons/ci';
import { Link } from 'react-router';
import 'react-datepicker/dist/react-datepicker.css';
import AvailabilityDatePicker from './AvailabilityDatePicker';
import { useBookingForm } from '@/hooks/useBookingForm';


export interface BookingFormProps {
  property: PropertyListing;
  onBookingSubmit?: (formData: {
    checkInDate: Date;
    checkOutDate: Date;
    guests: number;
  }) => void;
  isSubmitting?: boolean;
  isLoggedIn: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({
  property,
  onBookingSubmit,
  isSubmitting = false,
  isLoggedIn,
}) => {
  const {
    formData,
    setGuests: setFormGuests,
    setDateRange,
    isFormValid,
    numberOfNights,
  } = useBookingForm();

  const [showBreakdown, setShowBreakdown] = useState(false);

  // Maximum guests is the number of guests
  const maxGuests = property.guestNo || 1;

  const handleGuestChange = (delta: number) => {
    const newGuests = Math.max(1, Math.min(maxGuests, formData.guests + delta));
    setFormGuests(newGuests);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      isFormValid &&
      formData.checkInDate &&
      formData.checkOutDate &&
      onBookingSubmit
    ) {
      onBookingSubmit({
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        guests: formData.guests,
      });
    }
  };

  // Extract property images
  const propertyImages = property.listingImg
    .map((img) => img.fileUrl)
    .filter((url): url is string => !!url && url.trim() !== '');



  const cleaningFee = property.cleaningFee || 0;
  const securityDeposit = property.securityDeposit || 0;
  const baseTotal =
    numberOfNights > 0
      ? numberOfNights * property.basePrice
      : property.basePrice;
  const serviceFee = Math.round((baseTotal + cleaningFee + securityDeposit) * 0.075);
  const totalPrice = baseTotal + cleaningFee + securityDeposit + serviceFee;

  return (
    <>
      <div className="w-full max-w-[480px] lg:ml-auto bg-white border border-[#E6E6E6] rounded-lg p-5">
        {/* Price & Cancellation */}
        <div className="mb-4">
          <h4 className="text-[#000] text-[14px] font-bold">
            NGN {property.basePrice.toLocaleString()} <span className="font-normal">/night</span>
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

        <form onSubmit={handleSubmit}>
          {/* Use the new AvailabilityDatePicker but style it to match the original design */}
          <div className="mb-3 flex gap-3">
            <AvailabilityDatePicker
              listingId={property._id}
              onDateSelect={setDateRange}
              selectedCheckIn={formData.checkInDate}
              selectedCheckOut={formData.checkOutDate}
              minDate={property.avaliableFrom ? new Date(property.avaliableFrom) : null}
              maxDate={property.avaliableUntil ? new Date(property.avaliableUntil) : null}
              className="flex items-start rounded-md bg-white border border-[#E6E6E6] px-4 py-2 w-full"
            />
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
                    disabled={formData.guests <= 1}
                  >
                    -
                  </button>
                  <span className="text-[#313131] text-[14px] font-medium min-w-[32px] text-center">
                    {formData.guests} Guest{formData.guests > 1 ? 's' : ''}
                  </span>
                  <button
                    type="button"
                    className="px-2 py-1 rounded bg-[#f3f3f3] text-[#313131] text-lg font-bold"
                    onClick={() => handleGuestChange(1)}
                    disabled={formData.guests >= maxGuests}
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
          <div className="flex items-start mt-3 gap-2">
            <CiCircleCheck size={20} color="#09974C" />
            <p className="text-[#999999] text-[14px]">
              {isFormValid
                ? 'Your dates are available'
                : 'Please select dates to check availability'}
            </p>
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
                <span>
                  Base Price{numberOfNights > 0 ? ` (${numberOfNights} nights)` : ''}
                </span>
                <span>NGN {baseTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Cleaning Fee</span>
                <span>NGN {cleaningFee.toLocaleString()}</span>
              </div>
              {securityDeposit > 0 && (
                <div className="flex justify-between mb-1">
                  <span>Security Deposit</span>
                  <span>NGN {securityDeposit.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between mb-1">
                <span>Service Fee <span className="text-[#999] text-xs">(7.5%)</span></span>
                <span>NGN {serviceFee.toLocaleString()}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>NGN {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Price & Breakdown */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-[#313131] text-[16px] font-medium">
              Total Price
            </p>
            <h3 className="text-[#070707] text-[16px] font-semibold">
              NGN {totalPrice.toLocaleString()}
            </h3>
          </div>

          {/* CTA Button - Only allow logged in users to book */}
          {onBookingSubmit ? (
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting || !isLoggedIn}
              className="bg-[#006073] w-full py-3 rounded-lg text-white font-medium mt-4 hover:bg-[#3c8999] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoggedIn
                ? isSubmitting
                  ? 'Processing...'
                  : 'Book Now'
                : 'Login to Book'}
            </button>
          ) : (
            <Link
              to={isLoggedIn ? '/book-now' : '/login'}
              state={
                isLoggedIn
                  ? {
                    propertyId: property._id,
                    startDate: formData.checkInDate,
                    endDate: formData.checkOutDate,
                    guests: formData.guests,
                    totalPrice,
                    propertyName: property.name,
                    propertyImages,
                    basePrice: baseTotal,
                    cleaningFee,
                    securityDeposit,
                  }
                  : undefined
              }
              className={`bg-[#006073] w-full py-3 rounded-lg text-white font-medium mt-4 hover:bg-[#3c8999] transition text-center block ${!isFormValid || !isLoggedIn ? 'opacity-50 pointer-events-none' : ''
                }`}
              onClick={(e) => {
                if (!isFormValid || !isLoggedIn) e.preventDefault();
              }}
            >
              {isLoggedIn ? 'Book Now' : 'Login to Book'}
            </Link>
          )}

          {!isFormValid && (
            <p className="text-sm text-[#999999] text-center mt-2">
              Please select check-in and check-out dates to continue
            </p>
          )}
        </form>

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

      <div className="py-8 text-center">
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
