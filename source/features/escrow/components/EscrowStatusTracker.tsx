import React from 'react';
import { CheckCircle, Clock, AlertCircle, ShieldCheck, Banknote, XCircle } from 'lucide-react';
import type { EscrowStatus } from '../escrowTypes';

interface Props {
  status: EscrowStatus;
}

const STEPS: {
  key: EscrowStatus;
  label: string;
  icon: React.ReactNode;
}[] = [
  { key: 'AWAITING_PAYMENT',   label: 'Payment Pending',      icon: <Clock size={16} /> },
  { key: 'FUNDS_HELD',         label: 'Funds in Escrow',      icon: <ShieldCheck size={16} /> },
  { key: 'DELIVERY_CONFIRMED', label: 'Delivery Confirmed',   icon: <CheckCircle size={16} /> },
  { key: 'DISBURSED',          label: 'Host Paid',            icon: <Banknote size={16} /> },
];

const STATUS_ORDER: EscrowStatus[] = [
  'AWAITING_PAYMENT',
  'FUNDS_HELD',
  'DELIVERY_CONFIRMED',
  'DISBURSED',
];

export const EscrowStatusTracker: React.FC<Props> = ({ status }) => {
  // Handle special off-track statuses
  if (status === 'DISPUTED') {
    return (
      <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
        <AlertCircle size={20} className="text-red-500 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-red-700">Dispute Under Review</p>
          <p className="text-xs text-red-500 mt-0.5">
            Cribxpert is reviewing your case. Funds remain safely held. Expect a response within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'REFUNDED') {
    return (
      <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
        <XCircle size={20} className="text-gray-500 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-gray-700">Payment Refunded</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Your payment has been refunded. Please allow 3–5 business days.
          </p>
        </div>
      </div>
    );
  }

  const currentIndex = STATUS_ORDER.indexOf(status);

  return (
    <div className="w-full">
      {/* Step indicators */}
      <div className="flex items-center justify-between mb-2">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive    = index === currentIndex;
          const isPending   = index > currentIndex;

          return (
            <React.Fragment key={step.key}>
              {/* Step circle */}
              <div className="flex flex-col items-center gap-1 flex-1">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                    ${isCompleted ? 'bg-green-500 text-white' : ''}
                    ${isActive    ? 'bg-[#B8860B] text-white ring-4 ring-yellow-100' : ''}
                    ${isPending   ? 'bg-gray-100 text-gray-400' : ''}
                  `}
                >
                  {isCompleted ? <CheckCircle size={16} /> : step.icon}
                </div>
                <span
                  className={`text-[10px] text-center leading-tight font-medium
                    ${isCompleted ? 'text-green-600' : ''}
                    ${isActive    ? 'text-[#B8860B]' : ''}
                    ${isPending   ? 'text-gray-400'  : ''}
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <div
                  className={`
                    h-0.5 flex-1 mx-1 mb-5 transition-all duration-500
                    ${index < currentIndex ? 'bg-green-400' : 'bg-gray-200'}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
