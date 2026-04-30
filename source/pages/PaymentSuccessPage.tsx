// source/pages/PaymentSuccessPage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { verifyBookingPaymentService } from '@/features/escrow/escrowService';

async function verifyBookingPayment(bookingId: string) {
  return verifyBookingPaymentService(bookingId);
}

const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const bookingId = searchParams.get('bookingId') || '';
  const status = searchParams.get('status') || '';
  const reference = searchParams.get('reference') || '';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  const statusText = useMemo(() => {
    if (verified) return 'Payment verified successfully.';
    if (status) return `Checkout returned with status: ${status}.`;
    return 'Verifying your payment now.';
  }, [status, verified]);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      if (!bookingId) {
        if (mounted) {
          setError('Missing booking ID in redirect URL.');
          setLoading(false);
        }
        return;
      }

      try {
        await verifyBookingPayment(bookingId);

        if (!mounted) return;

        setVerified(true);
        setLoading(false);

        window.setTimeout(() => {
          navigate(`/escrow/${bookingId}`, { replace: true });
        }, 1800);
      } catch (err) {
        if (!mounted) return;

        setError(err instanceof Error ? err.message : 'Payment verification failed');
        setLoading(false);
      }
    };

    void run();

    return () => {
      mounted = false;
    };
  }, [bookingId, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
        <div className="w-16 h-16 bg-[#B8860B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          {verified ? (
            <CheckCircle2 size={28} className="text-green-500" />
          ) : (
            <ShieldCheck size={28} className="text-[#B8860B]" />
          )}
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-2">
          {verified ? 'Payment Successful' : 'Verifying Payment'}
        </h1>

        <p className="text-sm text-gray-500 mb-4">{statusText}</p>

        {reference && (
          <div className="bg-gray-50 rounded-xl p-3 mb-4 text-left">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Checkout Reference
            </p>
            <p className="text-sm font-semibold text-gray-800 break-all">
              {reference}
            </p>
          </div>
        )}

        {bookingId && (
          <div className="bg-gray-50 rounded-xl p-3 mb-4 text-left">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Booking ID
            </p>
            <p className="text-sm font-semibold text-gray-800 break-all">
              {bookingId}
            </p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-3 mt-2">
            <div className="w-8 h-8 border-4 border-[#B8860B] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-gray-500">
              Please wait while we confirm your payment.
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-left">
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={() => navigate(bookingId ? `/escrow/${bookingId}` : '/my-bookings')}
              className="mt-3 w-full bg-[#B8860B] text-white font-semibold py-3 px-4 rounded-xl"
            >
              Return to Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;