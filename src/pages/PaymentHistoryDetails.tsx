import { useParams, useNavigate, Link } from 'react-router-dom';
import { paymentHistoryDetailsData, PaymentHistoryDetail } from '@/utils/data';
import { useState, useEffect } from 'react';

const PaymentHistoryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] =
    useState<PaymentHistoryDetail | null>(null);

  useEffect(() => {
    // Find the booking details based on the ID from URL
    const details = paymentHistoryDetailsData.find(
      (item) => item.bookingId === `#${id}`
    );
    console.log(details);
    setBookingDetails(details || null);
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-[#E7F4EE] text-[#09974C]';
      case 'PENDING':
        return 'bg-[#FDF1E8] text-[#E46A11]';
      case 'FAILED':
        return 'bg-[#FEEDEC] text-[#F04438]';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Booking not found
          </h2>
          <p className="text-gray-600 mb-4">
            The booking details you're looking for don't exist.
          </p>
          <button
            onClick={() => navigate('/payments')}
            className="inline-flex items-center px-4 py-2 bg-[#2B7B8B] text-white rounded-md hover:bg-[#2B7B8B] transition-colors"
          >
            Back to Payments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Back Navigation */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/payments')}
          className="inline-flex items-center text-black hover:text-black transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to payments
        </button>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          {/* Booking Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="flex items-center mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold text-gray-900 mr-4">
                {bookingDetails.bookingId}
              </h1>
              <span
                className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(bookingDetails.status)}`}
              >
                {bookingDetails.status}
              </span>
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Property Image */}
            <div className="lg:col-span-1">
              <img
                src={bookingDetails.propertyImage}
                alt={bookingDetails.listingName}
                className="w-full h-48 lg:h-64 object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/property-image.jpeg';
                }}
              />
            </div>

            {/* Booking Details */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {bookingDetails.bookingDate} at {bookingDetails.bookingTime}
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                {bookingDetails.listingName}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    Check In: {bookingDetails.checkIn}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm text-gray-600">
                    Nights: {bookingDetails.nights}
                  </span>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    Check Out: {bookingDetails.checkOut}
                  </span>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    Guests: {bookingDetails.guests.total} (Adults{' '}
                    {bookingDetails.guests.adults}, Children{' '}
                    {bookingDetails.guests.children})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Summary
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Sub Total</span>
                <span className="font-medium">
                  {formatCurrency(bookingDetails.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Security Deposit</span>
                <span className="font-medium">
                  {formatCurrency(bookingDetails.securityDeposit)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Charge</span>
                <span className="font-medium">
                  {formatCurrency(bookingDetails.serviceCharge)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    Total Amount Paid
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatCurrency(bookingDetails.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method and Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Payment Method
              </h4>
              <p className="text-gray-600">{bookingDetails.paymentMethod}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Payment Date
              </h4>
              <p className="text-gray-600">
                {bookingDetails.paymentDate} at {bookingDetails.paymentTime}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mb-8">
            <Link to={`/invoice/${id}`}>
              <button className="w-full sm:w-auto bg-[#2B7B8B] text-white px-6 py-3 rounded-md hover:bg-[#2B7B8B] transition-colors font-medium">
                Download Invoice
              </button>
            </Link>
          </div>

          {/* Refund Policy */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              REFUND POLICY
            </h3>
            <p className="text-gray-600 mb-4">
              Refund eligibility depends on the cancellation policy.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#2B7B8B] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-gray-900">
                    Full Refund:
                  </span>
                  <span className="text-gray-600">
                    {' '}
                    Cancel At Least 7 Days Before Check-In.
                  </span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#2B7B8B] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-gray-900">50% Refund:</span>
                  <span className="text-gray-600">
                    {' '}
                    Cancel At Least 3-6 Days Before Check-In (Minus Service
                    Fees).
                  </span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#2B7B8B] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-gray-900">No Refund:</span>
                  <span className="text-gray-600">
                    {' '}
                    Cancel Less Than 3 Days Before Check-In.
                  </span>
                </div>
              </div>
            </div>
            <button className="border border-[#2B7B8B] text-[#2B7B8B] px-6 py-3 rounded-md hover:bg-[#2B7B8B] hover:text-white transition-colors font-medium">
              Request Refund
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryDetails;
