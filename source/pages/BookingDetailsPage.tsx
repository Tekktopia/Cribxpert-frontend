import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectBookingHistory } from '@/features/bookings/bookingSlice';
import { useGetBookingByIdQuery } from '@/features/bookings/bookingService';
import { arrowLeft } from '@/assets';
import StatusButton from '@/features/bookings/components/StatusButton';
import Payment from '@/features/bookings/components/Payment';
import { useBookingUpdates } from '@/hooks/useBookingUpdates';

const BookingDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const bookingsHistory = useSelector(selectBookingHistory);
  const bookingFromStore = bookingsHistory.find((b) => b._id === id);
  const [booking, setBooking] = useState(bookingFromStore);
  
  // Enable real-time booking updates
  useBookingUpdates();
  const {
    data: apiBookingData,
    isLoading: isApiLoading,
    error: apiError,
  } = useGetBookingByIdQuery(id!, { skip: !!bookingFromStore });

  useEffect(() => {
    if (apiBookingData && apiBookingData.booking) {
      setBooking(apiBookingData.booking);
    }
  }, [apiBookingData]);

  // Show loading spinner if API is loading
  if (isApiLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Loading Booking...
            </h2>
            <p className="text-gray-600 mb-6">
              Please wait while we fetch your booking details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show not found only if API is done loading, error, or empty response
  if (
    !isApiLoading &&
    (apiError || (apiBookingData && !apiBookingData.booking))
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Booking Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't find the booking you're looking for. It may have been
              removed or the link might be incorrect.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#006073] text-white rounded-md hover:bg-hoverColor transition-colors duration-200 font-medium"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/my-bookings')}
              className="px-6 py-2 border border-[#006073] text-[#006073] rounded-md hover:bg-[#006073] hover:text-white transition-colors duration-200 font-medium"
            >
              View All Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Only render booking details if booking is set
  if (!booking) return null;

  // Calculate booking metrics
  const checkInDate = new Date(booking.startDate);
  const checkOutDate = new Date(booking.endDate);
  const numberOfNights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Format dates nicely
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatDateShort = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="px-[30px] lg:px-[80px] py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#313131] hover:text-[#006073] transition-colors text-sm"
        >
          <img src={arrowLeft} alt="Back" className="mr-2 w-4 h-4" />
          Back to bookings
        </button>
      </div>

      {/* Main content */}
      <div className="px-[30px] lg:px-[80px] pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Property image and details */}
          <div className="flex-1 max-w-2xl">
            {/* Property image */}
            <div className="mb-6">
              <img
                src={
                  booking.listing.listingImg[0]?.fileUrl ||
                  'https://res.cloudinary.com/dvv4wwuk1/image/upload/v1750192828/shortlet/listingImages/ayqvgn1pocgqlzsy3yci.jpg'
                }
                alt={booking.listing.name}
                className="w-full h-[300px] object-cover rounded-lg"
              />
            </div>

            {/* Booking header with status and actions */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-semibold text-[#313131]">
                Booking #{booking._id.slice(-6).toUpperCase()}
              </h1>
              <div className="flex items-center gap-3">
                <StatusButton
                  status={(booking.status || 'pending').toUpperCase()}
                />
                <div className="flex gap-2">
                  <button className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-1a2 2 0 00-2-2H9a2 2 0 00-2 2v1a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                      />
                    </svg>
                  </button>
                  <button className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Date and Listing Name section */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Date section */}
                <div>
                  <h3 className="font-semibold text-[#313131] mb-3">Date:</h3>
                  <p className="text-[#6F6F6F] text-sm mb-1">
                    {formatDate(new Date(booking.createdAt))}
                  </p>
                  <p className="text-[#6F6F6F] text-sm">
                    {new Date(booking.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                </div>

                {/* Listing Name section */}
                <div>
                  <h3 className="font-semibold text-[#313131] mb-3">
                    Listing Name:
                  </h3>
                  <p className="text-[#6F6F6F] text-sm mb-1">
                    {booking.listing.name}
                  </p>
                  <p className="text-[#6F6F6F] text-sm">
                    {booking.listing.city}, {booking.listing.state}
                  </p>
                </div>
              </div>
            </div>

            {/* Details section */}
            <div className="border-t border-gray-200 pt-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#313131]">Details</h3>
                </div>
                <div className="text-right">
                  <p className="text-[#6F6F6F] text-sm">
                    Nights: {numberOfNights}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-[#6F6F6F] text-sm">
                    Check In: {formatDateShort(checkInDate)}
                  </span>
                </div>
                <div className="text-[#6F6F6F] text-sm">
                  Guests: {booking.travelersNo} (Adults{' '}
                  {Math.max(1, booking.travelersNo - 1)}, Children 1)
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-[#6F6F6F] text-sm">
                    Check Out: {formatDateShort(checkOutDate)}
                  </span>
                </div>
              </div>
            </div>

            {/* Host Information section */}
            <div className="border-t border-gray-200 pt-6 mb-8">
              <h3 className="font-semibold text-[#313131] mb-4">
                Host Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-[#6F6F6F] text-sm">Host Name: </span>
                  <span className="text-[#313131] text-sm">
                    {booking.firstName} {booking.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-[#6F6F6F] text-sm">
                    Contact Details:{' '}
                  </span>
                  <span className="text-[#313131] text-sm">
                    {booking.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Verified Ratings section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-[#313131] mb-6">
                Verified Ratings (1394)
              </h3>

              {/* Rating display */}
              <div className="flex gap-6 mb-8">
                {/* Left side - Main rating */}
                <div className="bg-gray-100 px-8 py-6 rounded-lg text-center min-w-[140px]">
                  <div className="text-5xl font-bold text-[#313131] mb-1">
                    4
                  </div>
                  <div className="text-xl text-[#6F6F6F] mb-3">/5</div>
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < 4 ? 'text-[#006073]' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-[#6F6F6F]">
                    1394 verified ratings
                  </p>
                </div>

                {/* Right side - Rating breakdown */}
                <div className="flex-1">
                  <div className="space-y-3">
                    {[
                      { stars: 5, count: 923 },
                      { stars: 4, count: 602 },
                      { stars: 3, count: 336 },
                      { stars: 2, count: 96 },
                      { stars: 1, count: 216 },
                    ].map((rating) => (
                      <div
                        key={rating.stars}
                        className="flex items-center gap-3"
                      >
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < rating.stars
                                  ? 'text-[#006073]'
                                  : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                          <div
                            className="bg-[#006073] h-2 rounded-full"
                            style={{ width: `${(rating.count / 1394) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-[#6F6F6F] w-12">
                          ({rating.count})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add Your Rating section */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-[#313131] mb-3">
                  Add Your Rating
                </h4>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="text-gray-300 text-lg cursor-pointer hover:text-[#006073] transition-colors"
                    >
                      ☆
                    </span>
                  ))}
                </div>
              </div>

              {/* Leave a Review form */}
              <div>
                <h4 className="text-sm font-medium text-[#313131] mb-4">
                  Leave a Review
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#6F6F6F] mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#006073] focus:ring-1 focus:ring-[#006073]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6F6F6F] mb-1">
                        Email address
                      </label>
                      <input
                        type="email"
                        placeholder="johndoe@cribxpert.com"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#006073] focus:ring-1 focus:ring-[#006073]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#6F6F6F] mb-1">
                      Write a Review
                    </label>
                    <textarea
                      placeholder="Input Field"
                      rows={4}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#006073] focus:ring-1 focus:ring-[#006073] resize-none"
                    />
                  </div>
                  <button className="w-full bg-[#006073] text-white py-3 rounded-md hover:bg-hoverColor transition-colors text-sm font-medium">
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Payment section */}
          <div className="lg:w-80">
            {['pending', 'confirmed', 'completed'].includes(booking.status) && (
              <div className="sticky top-8">
                <Payment />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
