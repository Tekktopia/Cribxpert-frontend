// source/pages/EscrowPaymentPage.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ShieldCheck,
  Clock,
  MapPin,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  RefreshCcw,
} from 'lucide-react';
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from '@/features/auth/authSlice';

type EscrowStatus =
  | 'AWAITING_KYC'
  | 'AWAITING_PAYMENT'
  | 'FUNDS_HELD'
  | 'DELIVERY_CONFIRMED'
  | 'DISBURSED'
  | 'DISPUTED'
  | 'REFUNDED';

type BookingSummary = {
  _id: string;
  listing?: {
    title?: string;
    name?: string;
    address?: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  apartmentName?: string;
  startDate?: string;
  endDate?: string;
  checkIn?: string;
  checkOut?: string;
  location?: string;
  totalPrice?: number;
  totalAmount?: number;
};

type EscrowContextResponse = {
  bookingId: string;
  szndUserId?: string | null;
  kycLink?: string | null;
  kycExpiresAt?: string | null;
  escrowStatus: EscrowStatus;
  walletStatus?: 'pending' | 'ready' | 'failed';
  paymentDetails?: {
    bankName?: string | null;
    accountNumber?: string | null;
    accountName?: string | null;
    currency?: string | null;
  } | null;
  amount?: number;
  currency?: string;
  providerReference?: string | null;
  transactionRef?: string | null;
  booking?: BookingSummary;
};

type VerifyPaymentResponse = {
  bookingId: string;
  escrowStatus: EscrowStatus;
  paymentCompleted: boolean;
  verificationReferenceUsed?: string;
  providerReference?: string | null;
  transactionRef?: string | null;
  verification?: Record<string, unknown>;
};

type ConfirmDeliveryResponse = {
  success: boolean;
  bookingId: string;
  status: EscrowStatus;
  message: string;
};

import { supabase } from '@/lib/supabase';

const EDGE_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/escrow`;

async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token ?? '';

  const response = await fetch(`${EDGE_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error || data?.message || 'Request failed');
  }

  return data as T;
}

function formatDate(value?: string): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';

  return date.toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatCurrency(amount?: number): string {
  return `₦${Number(amount || 0).toLocaleString('en-NG')}`;
}

function getBookingTitle(booking?: BookingSummary): string {
  return (
    booking?.listing?.title ||
    booking?.listing?.name ||
    booking?.apartmentName ||
    'Your Booking'
  );
}

function getBookingLocation(booking?: BookingSummary): string {
  if (!booking) return '—';

  return (
    booking.listing?.address ||
    [booking.listing?.street, booking.listing?.city, booking.listing?.state]
      .filter(Boolean)
      .join(', ') ||
    booking.location ||
    '—'
  );
}

const StatusBadge: React.FC<{ status: EscrowStatus }> = ({ status }) => {
  const labelMap: Record<EscrowStatus, string> = {
    AWAITING_KYC: 'Awaiting KYC',
    AWAITING_PAYMENT: 'Awaiting Payment',
    FUNDS_HELD: 'Funds Held',
    DELIVERY_CONFIRMED: 'Delivery Confirmed',
    DISBURSED: 'Disbursed',
    DISPUTED: 'Disputed',
    REFUNDED: 'Refunded',
  };

  return (
    <div className="inline-flex items-center rounded-full bg-[#B8860B]/10 px-3 py-1 text-xs font-semibold text-[#B8860B]">
      {labelMap[status]}
    </div>
  );
};

const EscrowPaymentPage: React.FC = () => {
  const { bookingId = '' } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const guestId = currentUser?.id || '';

  const [context, setContext] = useState<EscrowContextResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState('');
  const [initializingPayment, setInitializingPayment] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [confirmingDelivery, setConfirmingDelivery] = useState(false);
  const [raisingDispute, setRaisingDispute] = useState(false);
  const [registeringKyc, setRegisteringKyc] = useState(false);

  const loadContext = useCallback(async () => {
    if (!bookingId) return;

    setPageError('');
    try {
      const data = await apiRequest<EscrowContextResponse>(
        `/bookings/${bookingId}/context`
      );
      setContext(data);
    } catch (error) {
      setPageError(
        error instanceof Error ? error.message : 'Failed to load payment context'
      );
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    void loadContext();
  }, [loadContext]);

  useEffect(() => {
    if (!context) return;

    if (context.escrowStatus === 'AWAITING_PAYMENT') {
      const intervalId = window.setInterval(() => {
        void loadContext();
      }, 15000);

      return () => window.clearInterval(intervalId);
    }

    return undefined;
  }, [context, loadContext]);

  const booking = context?.booking;
  const totalAmount = useMemo(
    () => booking?.totalPrice || booking?.totalAmount || context?.amount || 0,
    [booking, context]
  );

  const handleInitializePayment = async () => {
    if (!bookingId) return;

    setInitializingPayment(true);
    setPageError('');

    try {
      const result = await apiRequest<{
        checkoutLink: string;
        transactionRef: string;
        reference: string;
      }>(`/bookings/${bookingId}/initialize-payment`, {
        method: 'POST',
        body: JSON.stringify({}),
      });

      // Redirect to SZND hosted checkout
      window.location.href = result.checkoutLink;
    } catch (error) {
      setPageError(
        error instanceof Error ? error.message : 'Failed to start payment'
      );
      setInitializingPayment(false);
    }
  };

  const handleVerifyPayment = async () => {
    if (!bookingId) return;

    setVerifyingPayment(true);
    setPageError('');

    try {
      const result = await apiRequest<VerifyPaymentResponse>(
        `/bookings/${bookingId}/verify-payment`
      );

      setContext((prev) =>
        prev
          ? {
              ...prev,
              escrowStatus: result.escrowStatus,
            }
          : prev
      );

      await loadContext();
    } catch (error) {
      setPageError(
        error instanceof Error ? error.message : 'Failed to verify payment'
      );
    } finally {
      setVerifyingPayment(false);
    }
  };

  const handleConfirmDelivery = async () => {
    if (!bookingId) return;

    if (!isAuthenticated || !guestId) {
      setPageError('Please log in again to confirm your stay.');
      return;
    }

    setConfirmingDelivery(true);
    setPageError('');

    try {
      await apiRequest<ConfirmDeliveryResponse>(
        `/bookings/${bookingId}/confirm-delivery`,
        {
          method: 'POST',
          body: JSON.stringify({ guestId }),
        }
      );

      await loadContext();
    } catch (error) {
      setPageError(
        error instanceof Error ? error.message : 'Failed to confirm delivery'
      );
    } finally {
      setConfirmingDelivery(false);
    }
  };

  const handleRegisterKyc = async () => {
    if (!currentUser) return;
    setRegisteringKyc(true);
    setPageError('');
    try {
      const result = await apiRequest<{ szndUserId: string; kycLink?: string; kycStatus: string }>(
        '/guests/register',
        {
          method: 'POST',
          body: JSON.stringify({
            email: currentUser.email,
            firstName: currentUser.user_metadata?.first_name || currentUser.email?.split('@')[0] || 'Guest',
            lastName: currentUser.user_metadata?.last_name || 'User',
            phoneNo: currentUser.user_metadata?.phone_no || currentUser.phone || '',
          }),
        }
      );
      if (result.kycLink) {
        window.open(result.kycLink, '_blank');
      }
      await loadContext();
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Failed to start identity verification');
    } finally {
      setRegisteringKyc(false);
    }
  };

  const handleRaiseDispute = async () => {
    if (!bookingId) return;

    setRaisingDispute(true);
    setPageError('');

    try {
      await apiRequest(`/bookings/${bookingId}/dispute`, {
        method: 'POST',
        body: JSON.stringify({
          reason: 'Guest reported an issue with the stay.',
        }),
      });

      await loadContext();
    } catch (error) {
      setPageError(
        error instanceof Error ? error.message : 'Failed to raise dispute'
      );
    } finally {
      setRaisingDispute(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#B8860B] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading secure payment...</p>
        </div>
      </div>
    );
  }

  if (!context) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-lg mx-auto bg-white rounded-2xl border border-red-200 shadow-sm p-6 text-center">
          <h1 className="text-lg font-bold text-gray-900 mb-2">
            Could not load booking payment
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            {pageError || 'Something went wrong while loading this booking.'}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-xl bg-[#B8860B] text-white font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const showKycStep = context.escrowStatus === 'AWAITING_KYC';

  const showPaymentStep =
    context.escrowStatus === 'AWAITING_PAYMENT' ||
    context.escrowStatus === 'FUNDS_HELD' ||
    context.escrowStatus === 'DELIVERY_CONFIRMED' ||
    context.escrowStatus === 'DISBURSED' ||
    context.escrowStatus === 'DISPUTED';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#B8860B]/10 rounded-xl flex items-center justify-center">
            <ShieldCheck size={20} className="text-[#B8860B]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Secure Payment</h1>
            <p className="text-xs text-gray-500">Protected by Cribxpert Escrow</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h2 className="font-bold text-gray-900 text-base">
                {getBookingTitle(booking)}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Booking ID: {context.bookingId}
              </p>
            </div>
            <StatusBadge status={context.escrowStatus} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: <CalendarDays size={14} className="text-gray-400" />,
                label: 'Check-in',
                value: formatDate(booking?.startDate || booking?.checkIn),
              },
              {
                icon: <CalendarDays size={14} className="text-gray-400" />,
                label: 'Check-out',
                value: formatDate(booking?.endDate || booking?.checkOut),
              },
              {
                icon: <MapPin size={14} className="text-gray-400" />,
                label: 'Location',
                value: getBookingLocation(booking),
              },
              {
                icon: <ShieldCheck size={14} className="text-gray-400" />,
                label: 'Total',
                value: formatCurrency(totalAmount),
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-2">
                <div className="mt-0.5">{item.icon}</div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {pageError && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
            <p className="text-sm text-red-700">{pageError}</p>
          </div>
        )}

        {showKycStep && (
          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Step 1 — Verify Your Identity
            </p>

            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4">
              <ShieldCheck size={20} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800">
                  Identity verification required
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  {context.kycLink
                    ? 'Your verification link is ready. Click below to complete it.'
                    : 'We need to verify your identity before you can make a secure payment.'}
                </p>
                {context.kycExpiresAt && (
                  <p className="text-xs text-amber-600 mt-1">
                    Link expires:{' '}
                    {new Date(context.kycExpiresAt).toLocaleString('en-NG', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
              </div>
            </div>

            {context.kycLink ? (
              <a
                href={context.kycLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#B8860B] hover:bg-[#9a7009] text-white font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                <ShieldCheck size={16} />
                Complete Identity Verification
              </a>
            ) : (
              <button
                onClick={handleRegisterKyc}
                disabled={registeringKyc}
                className="flex items-center justify-center gap-2 w-full bg-[#B8860B] hover:bg-[#9a7009] disabled:opacity-60 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                <ShieldCheck size={16} />
                {registeringKyc ? 'Setting up verification...' : 'Start Identity Verification'}
              </button>
            )}
          </div>
        )}

        {showPaymentStep && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              {context.escrowStatus === 'FUNDS_HELD'
                ? 'Step 2 — Confirm Your Stay'
                : 'Step 1 — Payment'}
            </p>

            {context.escrowStatus === 'AWAITING_PAYMENT' && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <CreditCard size={20} className="text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800">
                      Secure card payment
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      You will be redirected to a secure checkout page to complete
                      your payment. Funds are held in escrow until you confirm your
                      stay.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Amount due</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalAmount)}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={handleInitializePayment}
                    disabled={initializingPayment}
                    className="w-full bg-[#B8860B] hover:bg-[#9a7009] disabled:opacity-60 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                  >
                    {initializingPayment ? 'Redirecting to checkout...' : 'Pay Securely'}
                  </button>

                  <button
                    onClick={handleVerifyPayment}
                    disabled={verifyingPayment}
                    className="w-full border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-60 text-gray-800 font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCcw size={16} />
                    {verifyingPayment ? 'Verifying...' : 'I already paid — Verify now'}
                  </button>
                </div>

                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                  <Clock size={14} className="text-gray-400 shrink-0" />
                  <p className="text-xs text-gray-500">
                    After payment, this booking will move to funds-held status until
                    you confirm your stay.
                  </p>
                </div>
              </div>
            )}

            {context.escrowStatus === 'FUNDS_HELD' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <p className="text-xs text-green-700 font-medium">
                    Payment verified — funds are securely held in escrow
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={handleConfirmDelivery}
                    disabled={confirmingDelivery}
                    className="w-full bg-[#B8860B] hover:bg-[#9a7009] disabled:opacity-60 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                  >
                    {confirmingDelivery ? 'Confirming...' : 'Confirm Stay / Release Funds'}
                  </button>

                  <button
                    onClick={handleRaiseDispute}
                    disabled={raisingDispute}
                    className="w-full border border-red-200 bg-white hover:bg-red-50 disabled:opacity-60 text-red-700 font-semibold py-3 px-4 rounded-xl transition-colors"
                  >
                    {raisingDispute ? 'Submitting...' : 'Raise a Dispute'}
                  </button>
                </div>
              </div>
            )}

            {context.escrowStatus === 'DELIVERY_CONFIRMED' && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <h3 className="font-bold text-gray-900 text-lg mb-1">
                  Delivery Confirmed ✓
                </h3>
                <p className="text-sm text-gray-500">
                  Payment will be released to the host shortly.
                </p>
              </div>
            )}

            {context.escrowStatus === 'DISBURSED' && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">All Done!</h3>
                <p className="text-sm text-gray-500">
                  The host has been paid successfully.
                </p>
              </div>
            )}

            {context.escrowStatus === 'DISPUTED' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <h3 className="font-bold text-gray-900 text-lg mb-1">
                  Dispute Under Review
                </h3>
                <p className="text-sm text-gray-500">
                  Cribxpert is reviewing the dispute. Funds remain securely held.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-center gap-2 py-2">
          <ShieldCheck size={14} className="text-gray-400" />
          <p className="text-xs text-gray-400">
            Payments are protected by Cribxpert Escrow
          </p>
        </div>
      </div>
    </div>
  );
};

export default EscrowPaymentPage;