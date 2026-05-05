import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlertTriangle, CheckCircle, Send, ShieldAlert } from 'lucide-react';
import type { AppDispatch, RootState } from '../../../store/store';
import { disburseToHost } from '../escrowSlice';
import type { EscrowStatus } from '../escrowTypes';
import Title from '@/shared/components/ui/Title';

type TitleType = 'success' | 'error' | 'info' | 'warning';

interface Props {
  bookingId: string;
  adminId: string;
  hostUserTag: string;     // host's Sznd user tag e.g. "john_host"
  customerId: string;      // guest's Sznd user ID (on_behalf_of)
  amount: string;          // booking total e.g. "150000"
  hostName: string;
  guestName: string;
  apartmentName: string;
  currentStatus: EscrowStatus;
}

const DISBURSABLE_STATUSES: EscrowStatus[] = ['DELIVERY_CONFIRMED', 'FUNDS_HELD'];

export const AdminDisburse: React.FC<Props> = ({
  bookingId,
  adminId,
  hostUserTag,
  customerId,
  amount,
  hostName,
  guestName,
  apartmentName,
  currentStatus,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [overrideAmount, setOverrideAmount] = useState(amount);
  const [confirmStep, setConfirmStep]       = useState(false);

  const { disburseLoading, disburseResult, disburseError } = useSelector(
    (state: RootState) => state.escrow
  );

  // modal state for title comp
        const [modal, setModal] = useState<{
          isOpen: boolean;
          type: TitleType;
          title: string;
          message: string;
          primaryAction?: { label: string; onClick: () => void };
          secondaryAction?: { label: string; onClick: () => void };
        }>({
          isOpen: false,
          type: 'info',
          title: '',
          message: '',
        });
      
        // helper func to show modal
        const showModal = (
          type: TitleType,
          title: string,
          message: string,
          primaryAction?: { label: string; onClick: () => void },
          secondaryAction?: { label: string; onClick: () => void }
        ) => {
          setModal({
            isOpen: true,
            type,
            title,
            message,
            primaryAction,
            secondaryAction,
          });
        };
      
        // Helper function to close modal
        const closeModal = () => {
          setModal((prev) => ({ ...prev, isOpen: false }));
        };

  const canDisburse = DISBURSABLE_STATUSES.includes(currentStatus);
  const isDisbursed = currentStatus === 'DISBURSED' || disburseResult?.success;

  const handleDisburse = async () => {
    try{
      const resultAction = await dispatch(
        disburseToHost({
          bookingId,
          hostUserTag,
          customerId,
          amount: overrideAmount,
          adminId,
        })
      );
      setConfirmStep(false);

      if (disburseToHost.fulfilled.match(resultAction)) {
        showModal(
          'success',
          'Disbursement Complete!',
          `Funds of ₦${Number(overrideAmount).toLocaleString('en-NG')} have been sent to @${hostUserTag}.`,
        );
      } else {
        showModal(
          'error',
          'Disbursement Failed',
          'Failed to disburse funds. Please try again.',
          {
            label: 'Try Again',
            onClick: closeModal,
          }
        );
      }
    } catch (error) {
      console.error('Disburse error:', error);
      setConfirmStep(false);
      showModal(
        'error',
        'Disbursement Failed',
        'An unexpected error occurred. Please try again.',
        {
          label: 'Try Again',
          onClick: closeModal,
        }
      );
    }
  };



  // ── Success state ────────────────────────────────────────────────────────────
  if (isDisbursed) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle size={28} className="text-green-500" />
        </div>
        <h3 className="font-bold text-green-800 text-base mb-1">Disbursement Complete</h3>
        <p className="text-sm text-green-700 mb-4">
          Funds have been sent to <strong>@{hostUserTag}</strong>
        </p>
        {disburseResult && (
          <div className="bg-white border border-green-200 rounded-xl p-3 text-left space-y-1.5">
            {[
              { label: 'Transaction ID', value: (disburseResult.transactionId || '').slice(0, 20) + '...' },
              { label: 'Reference',      value: disburseResult.reference },
              { label: 'Amount Sent',    value: `₦${Number(disburseResult.amountDisbursed).toLocaleString('en-NG')}` },
              { label: 'Fees',           value: `₦${Number(disburseResult.fees).toLocaleString('en-NG')}` },
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-xs">
                <span className="text-gray-500">{row.label}</span>
                <span className="font-semibold text-gray-800">{row.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Booking summary */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <h4 className="font-semibold text-gray-800 text-sm mb-3">{apartmentName}</h4>
        {[
          { label: 'Guest',  value: guestName },
          { label: 'Host',   value: `${hostName} (@${hostUserTag})` },
          { label: 'Status', value: currentStatus.replace('_', ' ') },
        ].map((row) => (
          <div key={row.label} className="flex justify-between text-sm">
            <span className="text-gray-500">{row.label}</span>
            <span className="font-medium text-gray-800">{row.value}</span>
          </div>
        ))}
      </div>

      {/* Warning if not disbursable */}
      {!canDisburse && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
          <ShieldAlert size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            Cannot disburse — booking status is <strong>{currentStatus}</strong>.
            Disbursement requires <strong>DELIVERY_CONFIRMED</strong> or <strong>FUNDS_HELD</strong>.
          </p>
        </div>
      )}

      {/* Amount field */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
          Disbursement Amount (NGN)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₦</span>
          <input
            type="number"
            value={overrideAmount}
            onChange={(e) => setOverrideAmount(e.target.value)}
            className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-gray-400"
          />
        </div>
        {overrideAmount !== amount && (
          <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
            <AlertTriangle size={11} />
            Amount differs from original booking total of ₦{Number(amount).toLocaleString('en-NG')}
          </p>
        )}
      </div>

      {/* Error */}
      {disburseError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <AlertTriangle size={16} className="text-red-500 shrink-0" />
          <p className="text-sm text-red-700">{disburseError}</p>
        </div>
      )}

      {/* Action */}
      {!confirmStep ? (
        <button
          onClick={() => setConfirmStep(true)}
          disabled={!canDisburse || disburseLoading}
          className={`
            w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all
            ${canDisburse && !disburseLoading
              ? 'bg-[#B8860B] hover:bg-yellow-700 active:scale-[0.98] text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <Send size={16} />
          Release ₦{Number(overrideAmount).toLocaleString('en-NG')} to @{hostUserTag}
        </button>
      ) : (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 space-y-3">
          <p className="text-sm font-semibold text-amber-900">
            ⚠️ Confirm releasing ₦{Number(overrideAmount).toLocaleString('en-NG')} to @{hostUserTag}?
            <span className="block font-normal text-amber-700 mt-0.5">
              This action cannot be undone.
            </span>
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setConfirmStep(false)}
              className="flex-1 py-2.5 border border-gray-200 bg-white rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDisburse}
              disabled={disburseLoading}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all
                ${disburseLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#B8860B] hover:bg-yellow-700 active:scale-[0.98]'
                }
              `}
            >
              {disburseLoading ? 'Processing...' : '✓ Confirm & Disburse'}
            </button>
          </div>
        </div>
      )}

      <Title
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        primaryAction={modal.primaryAction}
        secondaryAction={modal.secondaryAction}
      />
    </div>
  );
};