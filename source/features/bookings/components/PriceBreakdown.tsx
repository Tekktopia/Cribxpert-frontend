import React from 'react';
import InfoTooltip from '@/shared/components/ui/InfoTooltip';

interface PriceBreakdownProps {
  nights: number;
  accommodationFee: number;
  serviceFee: number;
  vat: number;
  securityDeposit: number;
  totalPrice: number;
  isSubmitting: boolean;
  isEditing: boolean;
  onConfirm: () => void;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  nights,
  accommodationFee,
  serviceFee,
  vat,
  securityDeposit,
  totalPrice,
  isSubmitting,
  isEditing,
  onConfirm,
}) => (
  <div className="mt-4">
    <div className="flex justify-between">
      <p className="text-[#6F6F6F] font-[400] text-[14px]">
        Accommodation Fee{' '}
        <span className="text-[12px] text-[#999]">
          (Base + Cleaning · {nights} night{nights !== 1 ? 's' : ''})
        </span>
      </p>
      <p className="text-[#6F6F6F] font-[400] text-[14px]">
        NGN {accommodationFee.toLocaleString()}
      </p>
    </div>

    <div className="flex justify-between mt-2">
      <p className="text-[#6F6F6F] font-[400] text-[14px]">
        Service Fee <span className="text-[12px] text-[#999]">(5%)</span>
      </p>
      <p className="text-[#6F6F6F] font-[400] text-[14px]">
        NGN {serviceFee.toLocaleString()}
      </p>
    </div>

    <div className="flex justify-between mt-2">
      <p className="text-[#6F6F6F] font-[400] text-[14px]">
        VAT <span className="text-[12px] text-[#999]">(7.5%)</span>
      </p>
      <p className="text-[#6F6F6F] font-[400] text-[14px]">
        NGN {vat.toLocaleString()}
      </p>
    </div>

    {securityDeposit > 0 && (
      <div className="flex justify-between mt-2">
        <p className="text-[#6F6F6F] font-[400] text-[14px] flex items-center">
          Security Deposit
          <InfoTooltip text="A refundable amount held for damages or late cancellations. It's returned in full after checkout if no issues are found." />
        </p>
        <p className="text-[#6F6F6F] font-[400] text-[14px]">
          NGN {securityDeposit.toLocaleString()}
        </p>
      </div>
    )}

    <div className="flex justify-between mt-3 pt-3 border-t border-[#E6E6E6]">
      <p className="text-[#313131] font-[500] text-[14px]">Total</p>
      <p className="text-[#313131] font-[600] text-[14px]">
        NGN {totalPrice.toLocaleString()}
      </p>
    </div>

    <button
      onClick={onConfirm}
      disabled={isSubmitting || isEditing}
      className={`w-full py-3 rounded-lg text-white font-medium mt-4 transition ${
        isSubmitting || isEditing
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-[#006073] hover:bg-[#3c8999]'
      }`}
    >
      {isSubmitting
        ? 'Processing...'
        : isEditing
          ? 'Save Changes First'
          : 'Confirm Booking & Pay'}
    </button>
  </div>
);

export default PriceBreakdown;