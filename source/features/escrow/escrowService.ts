import axios from 'axios';
import type {
  WalletResponse,
  BookingEscrowStatus,
  DisbursePayload,
  DisburseResult,
} from './escrowTypes';

// Points to YOUR Express backend — never calls Sznd directly
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const escrowApi = axios.create({
  baseURL: `${API_BASE}/api/escrow`,
  withCredentials: true, // send auth cookies
});

// ─── Guest Registration ───────────────────────────────────────────────────────

export const registerGuestService = async (details: {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  dateOfBirth: string;
}): Promise<{ guestId: string; message: string; currency: string }> => {
  const response = await escrowApi.post('/guests/register', details);
  return response.data;
};

// ─── Virtual Wallet ───────────────────────────────────────────────────────────

export const getGuestWalletService = async (
  szndUserId: string
): Promise<WalletResponse> => {
  const response = await escrowApi.get(`/guests/${szndUserId}/wallet`);
  return response.data;
};

// ─── Booking Escrow Status ────────────────────────────────────────────────────

export const getBookingEscrowStatusService = async (
  bookingId: string
): Promise<BookingEscrowStatus> => {
  const response = await escrowApi.get(`/bookings/${bookingId}/status`);
  return response.data;
};

// ─── Confirm Delivery ─────────────────────────────────────────────────────────

export const confirmDeliveryService = async (
  bookingId: string,
  guestId: string
): Promise<{ success: boolean; status: string; message: string }> => {
  const response = await escrowApi.post(`/bookings/${bookingId}/confirm-delivery`, {
    guestId,
  });
  return response.data;
};

// ─── Raise Dispute ────────────────────────────────────────────────────────────

export const raiseDisputeService = async (
  bookingId: string,
  payload: { guestId: string; reason: string; description: string }
): Promise<{ success: boolean; status: string; message: string }> => {
  const response = await escrowApi.post(`/bookings/${bookingId}/dispute`, payload);
  return response.data;
};

// ─── Admin: Disburse Funds to Host ───────────────────────────────────────────

export const disburseToHostService = async (
  payload: DisbursePayload
): Promise<DisburseResult> => {
  const { bookingId, ...body } = payload;
  const response = await escrowApi.post(`/bookings/${bookingId}/disburse`, body);
  return response.data;
};

// ─── Transaction History ──────────────────────────────────────────────────────

export const getTransactionHistoryService = async (
  szndUserId: string,
  page = 1
): Promise<{ data: any[]; pagination: any }> => {
  const response = await escrowApi.get(`/users/${szndUserId}/transactions`, {
    params: { page },
  });
  return response.data;
};
