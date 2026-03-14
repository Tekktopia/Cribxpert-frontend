import React, { useState } from 'react';
import { Copy, CheckCheck, Clock, ShieldCheck, Building2 } from 'lucide-react';
import type { PaymentDetails } from '../escrowTypes';

interface Props {
  paymentDetails: PaymentDetails;
  amountNGN: string;
  bookingId: string;
}

// ─── Copy Field ───────────────────────────────────────────────────────────────

const CopyField: React.FC<{ label: string; value: string; highlight?: boolean }> = ({
  label,
  value,
  highlight,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-3">
      <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
        {label}
      </p>
      <div
        className={`
          flex items-center justify-between gap-3 px-4 py-3 rounded-xl border
          ${highlight
            ? 'bg-yellow-50 border-yellow-200'
            : 'bg-gray-50 border-gray-200'
          }
        `}
      >
        <span
          className={`font-semibold text-sm tracking-wide ${
            highlight ? 'text-yellow-900 text-base' : 'text-gray-800'
          }`}
        >
          {value}
        </span>
        <button
          onClick={handleCopy}
          className={`
            shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
            transition-all duration-200
            ${copied
              ? 'bg-green-100 text-green-700'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }
          `}
        >
          {copied ? (
            <>
              <CheckCheck size={13} />
              Copied
            </>
          ) : (
            <>
              <Copy size={13} />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const EscrowPaymentDetails: React.FC<Props> = ({
  paymentDetails,
  amountNGN,
  bookingId,
}) => {
  const formattedAmount = `₦${Number(amountNGN).toLocaleString('en-NG')}`;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <ShieldCheck size={16} className="text-green-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">Cribxpert Secure Escrow Account</p>
          <p className="text-xs text-gray-500">Transfer the exact amount below</p>
        </div>
      </div>

      {/* Bank details card */}
      <div className="bg-white border-2 border-green-200 rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
          <Building2 size={16} className="text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">{paymentDetails.bankName}</span>
        </div>

        <CopyField
          label="Account Number"
          value={paymentDetails.accountNumber}
          highlight={false}
        />
        <CopyField
          label="Account Name"
          value={paymentDetails.accountName}
          highlight={false}
        />
        <CopyField
          label="Amount to Transfer"
          value={formattedAmount}
          highlight={true}
        />
        <CopyField
          label="Payment Reference (use this!)"
          value={bookingId.slice(0, 20).toUpperCase()}
          highlight={false}
        />
      </div>

      {/* Info banner */}
      <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3">
        <Clock size={16} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 leading-relaxed">
          Payment confirmation typically appears within{' '}
          <strong>1–2 business hours</strong>. Your funds are held
          safely in escrow and only released after you confirm the
          apartment matches the listing.
        </p>
      </div>
    </div>
  );
};
