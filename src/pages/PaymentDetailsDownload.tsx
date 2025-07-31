import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { paymentHistoryDetailsData, PaymentHistoryDetail } from '@/utils/data';

function formatCurrency(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

const PaymentDetailsDownload = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Find invoice data by id
  const invoiceData: PaymentHistoryDetail | undefined =
    paymentHistoryDetailsData.find((item) => item.bookingId === `#${id}`);

  if (!invoiceData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-8 w-full max-w-md text-center">
          <h2 className="font-semibold text-lg mb-2">Invoice not found</h2>
          <p className="text-gray-600 mb-4">
            The invoice details you're looking for don't exist.
          </p>
          <button
            onClick={() => navigate('/payments')}
            className="bg-[#116A7B] text-white px-6 py-2 rounded-md hover:bg-[#0E5663] transition-colors font-medium"
          >
            Back to payments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
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
      {/* Centered Card */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-8 w-full max-w-2xl">
          {/* Invoice Header */}
          <div className="mb-6">
            <h2 className="font-semibold text-base mb-2">
              Invoice {invoiceData.bookingId}
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <div className="mb-1">Date:</div>
                <div className="font-medium">
                  {invoiceData.bookingDate} {invoiceData.bookingTime}
                </div>
              </div>
              <div>
                <div className="mb-1">Listing Name:</div>
                <div className="font-medium">{invoiceData.listingName}</div>
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="border-t border-gray-200 mb-4"></div>
          {/* Stay Details */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-700 mb-4">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-500" />
              <span>Check In:</span>
              <span className="ml-1 font-medium text-gray-900">
                {invoiceData.checkIn}
              </span>
            </div>
            <div>
              <span>Nights:</span>
              <span className="ml-1 font-medium text-gray-900">
                {invoiceData.nights}
              </span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-500" />
              <span>Check Out:</span>
              <span className="ml-1 font-medium text-gray-900">
                {invoiceData.checkOut}
              </span>
            </div>
            <div>
              <span>Guests:</span>
              <span className="ml-1 font-medium text-gray-900">
                {invoiceData.guests.total} (Adults {invoiceData.guests.adults},
                Children {invoiceData.guests.children})
              </span>
            </div>
          </div>
          {/* Divider */}
          <div className="border-t border-gray-200 mb-4"></div>
          {/* Payment Details */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">
              Payment Details
            </h3>
            <div className="flex justify-between text-sm mb-1 text-gray-700">
              <span>Sub Total</span>
              <span>{formatCurrency(invoiceData.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1 text-gray-700">
              <span>Security Deposit</span>
              <span>{formatCurrency(invoiceData.securityDeposit)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1 text-gray-700">
              <span>Service Charge</span>
              <span>{formatCurrency(invoiceData.serviceCharge)}</span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between font-semibold text-gray-900">
              <span>Total Amount Paid</span>
              <span>{formatCurrency(invoiceData.totalAmount)}</span>
            </div>
          </div>
          {/* Divider */}
          <div className="border-t border-gray-200 mb-4"></div>
          {/* Payment Method & Date */}
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <div>
              <div className="font-medium text-gray-900">Payment Method</div>
              <div className="text-gray-700">{invoiceData.paymentMethod}</div>
            </div>
            <div>
              <div className="font-medium text-gray-900">Payment Date</div>
              <div className="text-gray-700">
                {invoiceData.paymentDate} {invoiceData.paymentTime}
              </div>
            </div>
          </div>
          {/* Download PDF Button */}
          <button className="w-full bg-[#116A7B] text-white px-6 py-2 rounded-md hover:bg-[#0E5663] transition-colors font-medium mt-2">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsDownload;
