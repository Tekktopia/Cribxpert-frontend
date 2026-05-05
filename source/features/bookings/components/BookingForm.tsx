import React, { useState } from 'react';
import { PropertyListing } from '@/types';
import { ChevronDown } from 'lucide-react';
import { CiCircleCheck } from 'react-icons/ci';
import { Link } from 'react-router';
import 'react-datepicker/dist/react-datepicker.css';
import AvailabilityDatePicker from './AvailabilityDatePicker';
import { useBookingForm } from '@/hooks/useBookingForm';
import { calculatePricing } from '@/utils/pricingUtils';
import InfoTooltip from '@/shared/components/ui/InfoTooltip';
import Title from '@/shared/components/ui/Title';

type TitleType = 'success' | 'error' | 'info' | 'warning';

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

  // modal state for title comp
      const [modal, setModal] = useState<{
        isOpen: boolean;
        type: TitleType;
        title: string;
        message: string;
        primaryAction?: { label: string; onClick: () => void };
        secondaryAction?: { label: string; onClick: () => void };
      }>({
        isOpen: false,
        type: 'info',
        title: '',
        message: '',
      });
    
      // helper func to show modal
      const showModal = (
        type: TitleType,
        title: string,
        message: string,
        primaryAction?: { label: string; onClick: () => void },
        secondaryAction?: { label: string; onClick: () => void }
      ) => {
        setModal({
          isOpen: true,
          type,
          title,
          message,
          primaryAction,
          secondaryAction,
        });
      };
    
      // Helper function to close modal
      const closeModal = () => {
        setModal((prev) => ({ ...prev, isOpen: false }));
      };

  const maxGuests = property.guestNo || 1;

  const handleGuestChange = (delta: number) => {
    const newGuests = Math.max(1, Math.min(maxGuests, formData.guests + delta));
    setFormGuests(newGuests);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid && formData.checkInDate && formData.checkOutDate && onBookingSubmit) {
      onBookingSubmit({
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        guests: formData.guests,
      });
    }
  };

  const propertyImages = property.listingImg
    .map((img) => img.fileUrl)
    .filter((url): url is string => !!url && url.trim() !== '');

  const cleaningFee = property.cleaningFee || 0;
  const securityDeposit = property.securityDeposit || 0;

  const { accommodationFee, serviceFee, vat, totalPrice } = calculatePricing({
    basePrice: property.basePrice,
    cleaningFee,
    securityDeposit,
    numberOfNights,
  });

  return (
    <>
      <div className="w-full max-w-[480px] lg:ml-auto bg-white border border-[#E6E6E6] rounded-lg p-5">
        {/* Price & Cancellation */}
        <div className="mb-4">
          <h4 className="text-[#000] text-[14px] font-bold">
            NGN {accommodationFee.toLocaleString()} <span className="font-normal">/night</span>
          </h4>
          <p className="text-[#6F6F6F] text-[14px]">
            {numberOfNights > 0
              ? `${numberOfNights} night${numberOfNights !== 1 ? 's' : ''} · excl. service fee & VAT`
              : 'Per night · excl. service fee & VAT'}
          </p>
          <hr className="border-[#E6E6E6] my-3" />
        </div>

        <div className="mb-4">
          <h4 className="text-[#6F6F6F] text-[14px] font-medium">Free cancellation</h4>
          <p className="text-[#6F6F6F] text-[14px]">
            Before{' '}
            {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
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

          {/* Guests */}
          <div className="flex items-center rounded-md bg-white border border-[#E6E6E6] px-4 py-3 mt-3">
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between">
                <p className="text-[#6F6F6F] text-[14px]">Guests</p>
                <div className="flex items-center gap-2">
                  <button type="button" className="px-2 py-1 rounded bg-[#f3f3f3] text-[#313131] text-lg font-bold" onClick={() => handleGuestChange(-1)} disabled={formData.guests <= 1}>-</button>
                  <span className="text-[#313131] text-[14px] font-medium min-w-[32px] text-center">
                    {formData.guests} Guest{formData.guests > 1 ? 's' : ''}
                  </span>
                  <button type="button" className="px-2 py-1 rounded bg-[#f3f3f3] text-[#313131] text-lg font-bold" onClick={() => handleGuestChange(1)} disabled={formData.guests >= maxGuests}>+</button>
                </div>
              </div>
              <p className="text-[#999999] text-xs mt-1">Max guests: {maxGuests}</p>
            </div>
          </div>

          {/* Availability Check */}
          <div className="flex items-start mt-3 gap-2">
            <CiCircleCheck size={20} color="#09974C" />
            <p className="text-[#999999] text-[14px]">
              {isFormValid ? 'Your dates are available' : 'Please select dates to check availability'}
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
                  Accommodation Fee{' '}
                </span>
                <span>NGN {accommodationFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Service Fee <span className="text-[#999] text-xs">(5%)</span></span>
                <span>NGN {serviceFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>VAT <span className="text-[#999] text-xs">(7.5%)</span></span>
                <span>NGN {vat.toLocaleString()}</span>
              </div>
              {securityDeposit > 0 && (
                <div className="flex justify-between mb-1">
                  <span className="flex items-center">
                    Security Deposit
                    <InfoTooltip text="A refundable amount held for damages or late cancellations. It's returned in full after checkout if no issues are found." />
                  </span>
                  <span>NGN {securityDeposit.toLocaleString()}</span>
                </div>
              )}
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>NGN {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Total Price */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-[#313131] text-[16px] font-medium">Total Price</p>
            <h3 className="text-[#070707] text-[16px] font-semibold">NGN {totalPrice.toLocaleString()}</h3>
          </div>

          {onBookingSubmit ? (
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting || !isLoggedIn}
              className="bg-[#006073] w-full py-3 rounded-lg text-white font-medium mt-4 hover:bg-[#3c8999] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  showModal(
                    'info',
                    'Login Required',
                    'Please log in to make a booking.',
                    {
                      label: 'Log In',
                      onClick: () => {
                        closeModal();
                        window.location.href = '/login';
                      },
                    },
                    {
                      label: 'Cancel',
                      onClick: closeModal,
                    }
                  );
                }
              }}
            >
              {isLoggedIn ? (isSubmitting ? 'Processing...' : 'Book Now') : 'Login to Book'}
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
                    basePrice: numberOfNights > 0 ? property.basePrice * numberOfNights : property.basePrice,
                    cleaningFee,
                    securityDeposit,
                  }
                  : undefined
              }
              className={`bg-[#006073] w-full py-3 rounded-lg text-white font-medium mt-4 hover:bg-[#3c8999] transition text-center block ${!isFormValid || !isLoggedIn ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={(e) => { if (!isFormValid || !isLoggedIn) e.preventDefault(); }}
            >
              {isLoggedIn ? 'Book Now' : 'Login to Book'}
            </Link>
          )}

          {!isFormValid && (
            <p className="text-sm text-[#999999] text-center mt-2">
              Please select check-in and check-out dates to continue
            </p>
          )}

          {!isLoggedIn && (
            <p className="text-sm text-amber-600 text-center mt-2">
              You need to log in to complete your booking
            </p>
          )}
        </form>

        <div className="flex items-center justify-center mt-3 text-[#070707] text-[14px]">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-[22px] h-[24px] mr-2 text-[#1D5C5C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <p>Stay safe—use Cribxpert for all payments and host messages.</p>
        </div>
      </div>

      <div className="py-8 text-center">
        <p className="text-[#313131] text-[14px]">
          Property ID <strong>{property.propertyId || property._id}</strong>
        </p>
        <p className="text-[#006073] font-[400] text-[14px] mt-3 cursor-pointer hover:underline">Contact host</p>
      </div>

      <Title
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        primaryAction={modal.primaryAction}
        secondaryAction={modal.secondaryAction}
      />
    </>
  );
};

export default BookingForm;