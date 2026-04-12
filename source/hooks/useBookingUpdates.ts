import { useEffect } from 'react';
import { useSocket } from '@/shared/context/SocketContext';
import { useDispatch } from 'react-redux';
import { bookingApi } from '@/features/bookings/bookingService';

/**
 * Hook to listen for real-time booking updates
 * Automatically refetches booking data when updates occur
 */
export const useBookingUpdates = () => {
  const { socket, isConnected } = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isConnected || !socket) return;

    // Listen for new bookings (for hosts)
    const handleNewBooking = (data: any) => {
      console.log('📦 New booking received:', data);
      
      // Invalidate bookings cache to refetch latest data
      dispatch(bookingApi.util.invalidateTags(['Booking']));
      
      // Optional: Show toast notification
      // toast.success(`New booking from ${data.guestName}!`);
    };

    // Listen for booking creation confirmation (for guests)
    const handleBookingCreated = (data: any) => {
      console.log('✅ Booking created:', data);
      
      // Invalidate bookings cache to refetch
      dispatch(bookingApi.util.invalidateTags(['Booking']));
      
      // Optional: Show toast
      // toast.success('Booking confirmed!');
    };

    // Listen for booking status updates (confirmed, cancelled, etc.)
    const handleBookingUpdated = (data: any) => {
      console.log('🔄 Booking updated:', data);
      
      // Invalidate bookings cache
      dispatch(bookingApi.util.invalidateTags(['Booking']));
      
      // Optional: Show toast with status
      // toast.info(`Booking ${data.status}`);
    };

    // Listen for booking cancellations
    const handleBookingCancelled = (data: any) => {
      console.log('❌ Booking cancelled:', data);
      
      // Invalidate bookings cache
      dispatch(bookingApi.util.invalidateTags(['Booking']));
      
      // Optional: Show toast
      // toast.warning('Booking cancelled');
    };

    // Register event listeners
    socket.on('booking:new', handleNewBooking);
    socket.on('booking:created', handleBookingCreated);
    socket.on('booking:updated', handleBookingUpdated);
    socket.on('booking:cancelled', handleBookingCancelled);

    // Cleanup on unmount
    return () => {
      socket.off('booking:new', handleNewBooking);
      socket.off('booking:created', handleBookingCreated);
      socket.off('booking:updated', handleBookingUpdated);
      socket.off('booking:cancelled', handleBookingCancelled);
    };
  }, [isConnected, socket, dispatch]);
};

