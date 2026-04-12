import { useState, useCallback } from 'react';

interface BookingFormData {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  guests: number;
}

interface UseBookingFormReturn {
  formData: BookingFormData;
  setCheckInDate: (date: Date | null) => void;
  setCheckOutDate: (date: Date | null) => void;
  setGuests: (guests: number) => void;
  setDateRange: (checkIn: Date | null, checkOut: Date | null) => void;
  isFormValid: boolean;
  numberOfNights: number;
  resetForm: () => void;
}

export const useBookingForm = (
  initialGuests: number = 1
): UseBookingFormReturn => {
  const [formData, setFormData] = useState<BookingFormData>({
    checkInDate: null,
    checkOutDate: null,
    guests: initialGuests,
  });

  const setCheckInDate = useCallback((date: Date | null) => {
    setFormData((prev) => ({ ...prev, checkInDate: date }));
  }, []);

  const setCheckOutDate = useCallback((date: Date | null) => {
    setFormData((prev) => ({ ...prev, checkOutDate: date }));
  }, []);

  const setGuests = useCallback((guests: number) => {
    setFormData((prev) => ({ ...prev, guests }));
  }, []);

  const setDateRange = useCallback(
    (checkIn: Date | null, checkOut: Date | null) => {
      setFormData((prev) => ({
        ...prev,
        checkInDate: checkIn,
        checkOutDate: checkOut,
      }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormData({
      checkInDate: null,
      checkOutDate: null,
      guests: initialGuests,
    });
  }, [initialGuests]);

  const isFormValid =
    formData.checkInDate !== null &&
    formData.checkOutDate !== null &&
    formData.guests > 0;

  const numberOfNights =
    formData.checkInDate && formData.checkOutDate
      ? Math.ceil(
          (formData.checkOutDate.getTime() - formData.checkInDate.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  return {
    formData,
    setCheckInDate,
    setCheckOutDate,
    setGuests,
    setDateRange,
    isFormValid,
    numberOfNights,
    resetForm,
  };
};
