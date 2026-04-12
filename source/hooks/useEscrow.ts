import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import {
  fetchGuestWallet,
  fetchBookingEscrowStatus,
} from '../features/escrow/escrowSlice';
import type { EscrowStatus } from '../features/escrow/escrowTypes';

// ─── Terminal statuses — stop polling once reached ────────────────────────────
const TERMINAL_STATUSES: EscrowStatus[] = ['DISBURSED', 'REFUNDED'];

interface UseEscrowOptions {
  bookingId: string;
  szndUserId: string;
  pollInterval?: number; // ms, default 10s
}

export const useEscrow = ({
  bookingId,
  szndUserId,
  pollInterval = 10_000,
}: UseEscrowOptions) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    escrowStatus,
    escrowMessage,
    escrowLoading,
    walletStatus,
    paymentDetails,
    error,
  } = useSelector((state: RootState) => state.escrow);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAll = useCallback(() => {
    dispatch(fetchBookingEscrowStatus(bookingId));

    // Only poll wallet if it's not ready yet
    if (walletStatus !== 'ready') {
      dispatch(fetchGuestWallet(szndUserId));
    }
  }, [dispatch, bookingId, szndUserId, walletStatus]);

  useEffect(() => {
    // Initial fetch
    fetchAll();

    // Stop polling once a terminal status is reached
    const isTerminal = escrowStatus && TERMINAL_STATUSES.includes(escrowStatus);
    if (isTerminal) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    // Set up polling
    intervalRef.current = setInterval(fetchAll, pollInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchAll, pollInterval, escrowStatus]);

  return {
    escrowStatus,
    escrowMessage,
    escrowLoading,
    walletStatus,
    paymentDetails,
    walletReady: walletStatus === 'ready',
    error,
    refresh: fetchAll,
  };
};
