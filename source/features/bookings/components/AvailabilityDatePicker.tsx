import React, { useState, useEffect } from 'react';
import { useGetListingUnavailableDatesQuery } from '@/features/properties';
import { isBefore, isEqual } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface AvailabilityDatePickerProps {
  listingId: string;
  onDateSelect: (checkIn: Date | null, checkOut: Date | null) => void;
  selectedCheckIn?: Date | null;
  selectedCheckOut?: Date | null;
  className?: string;
}

const AvailabilityDatePicker: React.FC<AvailabilityDatePickerProps> = ({
  listingId,
  onDateSelect,
  selectedCheckIn,
  selectedCheckOut,
  className = '',
}) => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(
    selectedCheckIn || null
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(
    selectedCheckOut || null
  );

  const {
    data: unavailableDatesData,
    isLoading: isLoadingDates,
    error: datesError,
  } = useGetListingUnavailableDatesQuery(listingId, {
    skip: !listingId,
  });

  // Ensure unavailableDates is always an array of strings
  const unavailableDates: string[] = Array.isArray(
    unavailableDatesData?.unavailableDates
  )
    ? unavailableDatesData.unavailableDates.map(String)
    : [];

  // Convert unavailable dates (array of strings) to Date objects for easier comparison
  const unavailableDateObjects = unavailableDates.map(
    (dateStr) => new Date(dateStr)
  );

  const isDateUnavailable = (date: Date): boolean => {
    return unavailableDateObjects.some((unavailableDate) =>
      isEqual(date.setHours(0, 0, 0, 0), unavailableDate.setHours(0, 0, 0, 0))
    );
  };

  const handleCheckInChange = (date: Date | null) => {
    if (date && isDateUnavailable(date)) {
      return; // Don't allow selection of unavailable dates
    }

    setCheckInDate(date);

    // If check-out is before or equal to new check-in, clear it
    if (
      checkOutDate &&
      date &&
      (isBefore(checkOutDate, date) || isEqual(checkOutDate, date))
    ) {
      setCheckOutDate(null);
      onDateSelect(date, null);
    } else {
      onDateSelect(date, checkOutDate);
    }
  };

  const handleCheckOutChange = (date: Date | null) => {
    if (date && isDateUnavailable(date)) {
      return; // Don't allow selection of unavailable dates
    }

    // Check if any date between check-in and check-out is unavailable
    if (checkInDate && date) {
      const datesBetween = getDatesBetween(checkInDate, date);
      const hasUnavailableDate = datesBetween.some((d) => isDateUnavailable(d));

      if (hasUnavailableDate) {
        return; // Don't allow selection if there are unavailable dates in between
      }
    }

    setCheckOutDate(date);
    onDateSelect(checkInDate, date);
  };

  const getDatesBetween = (start: Date, end: Date): Date[] => {
    const dates = [];
    const currentDate = new Date(start);

    while (isBefore(currentDate, end) || isEqual(currentDate, end)) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  // Update local state when props change
  useEffect(() => {
    setCheckInDate(selectedCheckIn || null);
    setCheckOutDate(selectedCheckOut || null);
  }, [selectedCheckIn, selectedCheckOut]);

  if (isLoadingDates) {
    return (
      <div className={`flex justify-center items-center p-4 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading availability...</span>
      </div>
    );
  }

  if (datesError) {
    return (
      <div className={`text-red-500 p-4 ${className}`}>
        Error loading availability. Please try again.
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Check-in Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-in Date
          </label>
          <DatePicker
            selected={checkInDate}
            onChange={handleCheckInChange}
            minDate={new Date()}
            filterDate={(date: Date) => !isDateUnavailable(date)}
            placeholderText="Select check-in date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {/* Check-out Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-out Date
          </label>
          <DatePicker
            selected={checkOutDate}
            onChange={handleCheckOutChange}
            minDate={
              checkInDate
                ? new Date(checkInDate.getTime() + 86400000)
                : new Date()
            }
            filterDate={(date: Date) =>
              !isDateUnavailable(date) &&
              (checkInDate ? date > checkInDate : true)
            }
            placeholderText="Select check-out date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            dateFormat="yyyy-MM-dd"
            disabled={!checkInDate}
          />
        </div>
      </div>
    </div>
  );
};

export default AvailabilityDatePicker;
