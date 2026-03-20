import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentHistoryData, PaymentHistoryFilters } from '@/utils/data';

const PaymentHistory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    'all' | 'pending' | 'failed' | 'confirmed'
  >('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters] = useState<PaymentHistoryFilters>({
    status: 'all',
  });
  const itemsPerPage = 4;

  // Filter data based on active tab and filters
  const filteredData = useMemo(() => {
    let filtered = paymentHistoryData;

    // Filter by status
    if (activeTab !== 'all') {
      filtered = filtered.filter(
        (item) => item.paymentStatus.toLowerCase() === activeTab
      );
    }

    // Filter by property name if provided
    if (filters.propertyName) {
      filtered = filtered.filter((item) =>
        item.propertyName
          .toLowerCase()
          .includes(filters.propertyName!.toLowerCase())
      );
    }

    return filtered;
  }, [activeTab, filters]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

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

  const getActionButtonStyle = (status: string) => {
    if (status === 'CONFIRMED') {
      return 'bg-[#2B7B8B] text-white hover:bg-[#2B7B8B]';
    }
    return 'bg-white text-[#2B7B8B] border border-[#2B7B8B] hover:bg-[#2B7B8B] hover:text-white';
  };

  const tabs = [
    { key: 'all', label: 'All Payment' },
    { key: 'pending', label: 'Pending Payments' },
    { key: 'failed', label: 'Failed Payments' },
    { key: 'confirmed', label: 'Confirmed Payments' },
  ];

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <div className="bg-white mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4">
            <div className="flex flex-wrap gap-1 sm:gap-4 mb-4 sm:mb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() =>
                    setActiveTab(
                      tab.key as 'all' | 'pending' | 'failed' | 'confirmed'
                    )
                  }
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'text-[#2B7B8B] border-b-2 border-[#2B7B8B]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filters Button */}
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                />
              </svg>
              Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#2B7B8B] text-white px-4 py-5 sm:px-6">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium">
              <div className="col-span-2">BOOKING ID</div>
              <div className="col-span-3">PROPERTY NAME</div>
              <div className="col-span-2">CHECK-IN DATE</div>
              <div className="col-span-2">CHECK-OUT DATE</div>
              <div className="col-span-2">PAYMENT STATUS</div>
              <div className="col-span-1">ACTION</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {currentData.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No payments found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  No payment records match your current filters.
                </p>
              </div>
            ) : (
              currentData.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-4 sm:px-6 hover:bg-gray-50"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Booking ID */}
                    <div className="col-span-2">
                      <span className="text-[16px] font-medium text-gray-900">
                        {item.bookingId}
                      </span>
                    </div>

                    {/* Property Name */}
                    <div className="col-span-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.propertyImage}
                          alt={item.propertyName}
                          className="w-8 h-8 rounded object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/property-image.jpeg';
                          }}
                        />
                        <span className="text-[16px] font-medium text-gray-900">
                          {item.propertyName}
                        </span>
                      </div>
                    </div>

                    {/* Check-in Date */}
                    <div className="col-span-2">
                      <span className="text-[16px] text-gray-900">
                        {item.checkInDate}
                      </span>
                    </div>

                    {/* Check-out Date */}
                    <div className="col-span-2">
                      <span className="text-[16px] text-gray-900">
                        {item.checkOutDate}
                      </span>
                    </div>

                    {/* Payment Status */}
                    <div className="col-span-2">
                      <span
                        className={`inline-flex px-2 py-2 text-[16px] font-medium rounded-[5px] ${getStatusColor(item.paymentStatus)}`}
                      >
                        {item.paymentStatus}
                      </span>
                    </div>

                    {/* Action */}
                    <div className="col-span-1">
                      <button
                        onClick={() =>
                          navigate(
                            `/payment-history/${item.bookingId.replace('#', '')}`
                          )
                        }
                        className={`text-nowrap items-center px-2 py-2 text-[14px] hover:bg-hoverColor hover:border-none font-medium rounded transition-colors ${getActionButtonStyle(item.paymentStatus)}`}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-[16px] font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(endIndex, filteredData.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredData.length}</span>{' '}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page
                            ? 'z-10 bg-[#2B7B8B] border-[#2B7B8B] text-white'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
