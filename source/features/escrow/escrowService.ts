import { supabase } from '@/lib/supabase';
import type {
  WalletResponse,
  BookingEscrowStatus,
  DisbursePayload,
  DisburseResult,
} from './escrowTypes';

// Sznd API keys are secret — all escrow calls proxy through Supabase Edge Functions
const EDGE_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/escrow`;

async function edgeRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token ?? '';
  const response = await fetch(`${EDGE_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options?.headers ?? {}),
    },
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(json?.error ?? json?.message ?? 'Request failed');
  return json as T;
}

export const registerGuestService = async (details: {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  dateOfBirth: string;
}): Promise<{ guestId: string; message: string; currency: string }> => {
  return edgeRequest('/guests/register', {
    method: 'POST',
    body: JSON.stringify(details),
  });
};

export const getGuestWalletService = async (
  szndUserId: string
): Promise<WalletResponse> => {
  return edgeRequest(`/guests/${szndUserId}/wallet`);
};

export const getBookingEscrowStatusService = async (
  bookingId: string
): Promise<BookingEscrowStatus> => {
  return edgeRequest(`/bookings/${bookingId}/status`);
};

export const confirmDeliveryService = async (
  bookingId: string,
  guestId: string
): Promise<{ success: boolean; status: string; message: string }> => {
  return edgeRequest(`/bookings/${bookingId}/confirm-delivery`, {
    method: 'POST',
    body: JSON.stringify({ guestId }),
  });
};

export const raiseDisputeService = async (
  bookingId: string,
  payload: { guestId: string; reason: string; description: string }
): Promise<{ success: boolean; status: string; message: string }> => {
  return edgeRequest(`/bookings/${bookingId}/dispute`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const disburseToHostService = async (
  payload: DisbursePayload
): Promise<DisburseResult> => {
  const { bookingId, ...body } = payload;
  return edgeRequest(`/bookings/${bookingId}/disburse`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const getTransactionHistoryService = async (
  szndUserId: string,
  page = 1
): Promise<{ data: unknown[]; pagination: unknown }> => {
  return edgeRequest(`/users/${szndUserId}/transactions?page=${page}`);
};

export const verifyBookingPaymentService = async (
  bookingId: string
): Promise<{ success: boolean; status: string; message: string }> => {
  return edgeRequest(`/bookings/${bookingId}/verify-payment`);
};
