import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShieldCheck, Clock, MapPin, CalendarDays } from 'lucide-react';
import type { RootState } from '../store/store';
import type { User } from '../features/auth/authTypes';
import { useEscrow } from '../hooks/useEscrow';
import { EscrowStatusTracker }  from '../features/escrow/components/EscrowStatusTracker';
import { EscrowPaymentDetails } from '../features/escrow/components/EscrowPaymentDetails';
import { ConfirmDelivery }       from '../features/escrow/components/ConfirmDelivery';

// ─────────────────────────────────────────────────────────────────────────────
// EscrowPaymentPage
//
// Route suggestion: /bookings/:bookingId/payment
//
// Add to your RouteConfig.tsx:
//   { path: '/bookings/:bookingId/payment', element: <EscrowPaymentPage /> }
// ─────────────────────────────────────────────────────────────────────────────

const EscrowPaymentPage: React.FC = () => {
  const { bookingId = '' } = useParams<{ bookingId: string }>();

  // Pull the logged-in user from your existing auth slice
  const user = useSelector((state: RootState) => state.auth.user);

  // Pull booking details from your existing booking slice
  // Adjust the selector path to match your actual bookingSlice shape
  const booking = useSelector((state: RootState) =>
    // @ts-ignore — adjust to your actual slice shape
    state.bookings?.currentBooking || state.bookings?.bookingDetails
  );

  // szndUserId is stored after guest registration via POST /api/escrow/guests/register
  // Add szndUserId to your User interface in authTypes.ts once you store it on the user object
  const szndUserId = (user as User & { szndUserId?: string })?.szndUserId || '';
  const guestId = user?._id || '';

  const {
    escrowStatus,
    escrowLoading,
    walletReady,
    walletStatus,
    paymentDetails,
    refresh,
  } = useEscrow({ bookingId, szndUserId });

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (escrowLoading && !escrowStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#B8860B] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">

        {/* ── Page header ──────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#B8860B]/10 rounded-xl flex items-center justify-center">
            <ShieldCheck size={20} className="text-[#B8860B]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Secure Payment</h1>
            <p className="text-xs text-gray-500">Protected by Cribxpert Escrow</p>
          </div>
        </div>

        {/* ── Booking summary card ──────────────────────────────────────────── */}
        {booking && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h2 className="font-bold text-gray-900 text-base mb-3">
              {booking.listing?.title || booking.apartmentName || 'Your Booking'}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: <CalendarDays size={14} className="text-gray-400" />,
                  label: 'Check-in',
                  value: booking.checkIn
                    ? new Date(booking.checkIn).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })
                    : '—',
                },
                {
                  icon: <CalendarDays size={14} className="text-gray-400" />,
                  label: 'Check-out',
                  value: booking.checkOut
                    ? new Date(booking.checkOut).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })
                    : '—',
                },
                {
                  icon: <MapPin size={14} className="text-gray-400" />,
                  label: 'Location',
                  value: booking.listing?.address || booking.location || '—',
                },
                {
                  icon: <ShieldCheck size={14} className="text-gray-400" />,
                  label: 'Total',
                  value: `₦${Number(booking.totalPrice || booking.totalAmount || 0).toLocaleString('en-NG')}`,
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
        )}

        {/* ── Status tracker ────────────────────────────────────────────────── */}
        {escrowStatus && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Payment Progress
            </p>
            <EscrowStatusTracker status={escrowStatus} />
          </div>
        )}

        {/* ── Step 1: Show bank details if awaiting payment ─────────────────── */}
        {(escrowStatus === 'AWAITING_PAYMENT' || !escrowStatus) && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Step 1 — Make Your Payment
            </p>

            {walletStatus === 'loading' && (
              <div className="flex items-center gap-2 py-4 text-gray-400">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Loading payment details...</span>
              </div>
            )}

            {walletStatus === 'pending' && (
              <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
                <Clock size={20} className="text-amber-500 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">
                    Setting up your payment account
                  </p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Your dedicated NGN bank account is being prepared. This typically takes up to 24 hours.
                    We'll notify you by email when it's ready.
                  </p>
                </div>
              </div>
            )}

            {walletReady && paymentDetails && (
              <EscrowPaymentDetails
                paymentDetails={paymentDetails}
                amountNGN={
                  booking?.totalPrice?.toString() ||
                  booking?.totalAmount?.toString() ||
                  '0'
                }
                bookingId={bookingId}
              />
            )}
          </div>
        )}

        {/* ── Step 2: Confirm delivery after payment received ───────────────── */}
        {escrowStatus === 'FUNDS_HELD' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Step 2 — Confirm Your Stay
            </p>
            <ConfirmDelivery
              bookingId={bookingId}
              guestId={guestId}
              onConfirmed={refresh}
              onDisputed={refresh}
            />
          </div>
        )}

        {/* ── Delivery confirmed state ──────────────────────────────────────── */}
        {escrowStatus === 'DELIVERY_CONFIRMED' && (
          <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShieldCheck size={28} className="text-green-500" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">
              Delivery Confirmed ✓
            </h3>
            <p className="text-sm text-gray-500">
              Payment will be released to the host shortly.
              Thank you for using Cribxpert!
            </p>
          </div>
        )}

        {/* ── Disbursed ─────────────────────────────────────────────────────── */}
        {escrowStatus === 'DISBURSED' && (
          <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-6 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">All Done!</h3>
            <p className="text-sm text-gray-500">
              The host has been paid. Enjoy your stay and don't forget to leave a review!
            </p>
          </div>
        )}

        {/* ── Disputed ─────────────────────────────────────────────────────── */}
        {escrowStatus === 'DISPUTED' && (
          <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShieldCheck size={28} className="text-red-500" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Dispute Under Review</h3>
            <p className="text-sm text-gray-500">
              Cribxpert is reviewing your case. Funds remain safely held.
              Expect a response within 24 hours.
            </p>
          </div>
        )}

        {/* ── Escrow trust badge ────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-2 py-2">
          <ShieldCheck size={14} className="text-gray-400" />
          <p className="text-xs text-gray-400">
            Payments are protected by Cribxpert Escrow — funds only release when you confirm
          </p>
        </div>

      </div>
    </div>
  );
};

export default EscrowPaymentPage;