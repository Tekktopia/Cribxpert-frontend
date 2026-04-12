import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle, AlertTriangle, ChevronDown, X } from 'lucide-react';
import type { AppDispatch, RootState } from '../../../store/store';
import { confirmDelivery, raiseDispute } from '../escrowSlice';

interface Props {
  bookingId: string;
  guestId: string;
  onConfirmed?: () => void;
  onDisputed?: () => void;
}

const DISPUTE_REASONS = [
  { value: 'NOT_AS_DESCRIBED',   label: 'Apartment not as described' },
  { value: 'SAFETY_CONCERN',     label: 'Safety concern' },
  { value: 'HOST_NO_SHOW',       label: "Host didn't show up" },
  { value: 'AMENITIES_MISSING',  label: 'Amenities missing or broken' },
  { value: 'CLEANLINESS',        label: 'Cleanliness issues' },
  { value: 'OTHER',              label: 'Other' },
];

// ─── Dispute Modal ────────────────────────────────────────────────────────────

const DisputeModal: React.FC<{
  onSubmit: (reason: string, description: string) => void;
  onClose: () => void;
  loading: boolean;
}> = ({ onSubmit, onClose, loading }) => {
  const [reason,      setReason]      = useState('');
  const [description, setDescription] = useState('');
  const [open,        setOpen]        = useState(false);

  const selectedLabel = DISPUTE_REASONS.find(r => r.value === reason)?.label;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        {/* Modal header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-gray-900 text-base">Raise a Dispute</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Cribxpert will review and respond within 24 hours
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Reason dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
              Reason *
            </label>
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white text-left hover:border-gray-300 transition-colors"
              >
                <span className={reason ? 'text-gray-900' : 'text-gray-400'}>
                  {selectedLabel || 'Select a reason'}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
                />
              </button>

              {open && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                  {DISPUTE_REASONS.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => { setReason(r.value); setOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors
                        ${reason === r.value ? 'bg-red-50 text-red-700 font-medium' : 'text-gray-700'}
                      `}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
              Details (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe the issue in detail..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:border-gray-400 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-5 pt-0">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => reason && onSubmit(reason, description)}
            disabled={!reason || loading}
            className={`flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all
              ${!reason || loading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600 active:scale-[0.98]'
              }
            `}
          >
            {loading ? 'Submitting...' : 'Submit Dispute'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const ConfirmDelivery: React.FC<Props> = ({
  bookingId,
  guestId,
  onConfirmed,
  onDisputed,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showDispute, setShowDispute] = useState(false);
  const [showConfirmStep, setShowConfirmStep] = useState(false);

  const { actionLoading, actionSuccess, actionError } = useSelector(
    (state: RootState) => state.escrow
  );

  const handleConfirm = async () => {
    const result = await dispatch(confirmDelivery({ bookingId, guestId }));
    if (confirmDelivery.fulfilled.match(result)) {
      onConfirmed?.();
    }
    setShowConfirmStep(false);
  };

  const handleDispute = async (reason: string, description: string) => {
    const result = await dispatch(raiseDispute({ bookingId, guestId, reason, description }));
    if (raiseDispute.fulfilled.match(result)) {
      setShowDispute(false);
      onDisputed?.();
    }
  };

  if (actionSuccess) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className="font-bold text-gray-900 text-lg mb-1">Payment Released!</h3>
        <p className="text-sm text-gray-500">
          The host has been notified and will receive payment shortly.
        </p>
      </div>
    );
  }

  return (
    <>
      {showDispute && (
        <DisputeModal
          onSubmit={handleDispute}
          onClose={() => setShowDispute(false)}
          loading={actionLoading}
        />
      )}

      <div className="space-y-4">
        {/* Success banner */}
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <CheckCircle size={18} className="text-green-500 shrink-0" />
          <p className="text-sm font-medium text-green-800">
            Payment confirmed! Your ₦ is safely held in escrow.
          </p>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          Have you checked in and confirmed the apartment matches the listing?
          Click below to release payment to your host, or raise a dispute if there's a problem.
        </p>

        {/* Error */}
        {actionError && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <AlertTriangle size={16} className="text-red-500 shrink-0" />
            <p className="text-sm text-red-700">{actionError}</p>
          </div>
        )}

        {/* Confirm step — two-step for safety */}
        {!showConfirmStep ? (
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirmStep(true)}
              className="flex-[2] flex items-center justify-center gap-2 py-3.5 bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white rounded-xl font-bold text-sm transition-all"
            >
              <CheckCircle size={16} />
              Apartment is fine — Release Payment
            </button>
            <button
              onClick={() => setShowDispute(true)}
              className="flex-1 py-3.5 border-2 border-red-400 text-red-500 rounded-xl font-semibold text-sm hover:bg-red-50 transition-colors"
            >
              Dispute
            </button>
          </div>
        ) : (
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 space-y-3">
            <p className="text-sm font-semibold text-green-800">
              ✅ Confirm you want to release payment to the host?
              <span className="font-normal block text-green-700 mt-0.5">
                This cannot be undone.
              </span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmStep(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Go back
              </button>
              <button
                onClick={handleConfirm}
                disabled={actionLoading}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all
                  ${actionLoading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 active:scale-[0.98]'
                  }
                `}
              >
                {actionLoading ? 'Processing...' : 'Yes, Release Payment'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};