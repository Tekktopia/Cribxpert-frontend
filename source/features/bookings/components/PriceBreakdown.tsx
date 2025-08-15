import React from 'react';

interface PriceBreakdownProps {
  nights: number;
  basePrice: number;
  cleaningFee: number;
  serviceFee: number;
  totalPrice: number;
  isSubmitting: boolean;
  isEditing: boolean;
  onConfirm: () => void;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  nights,
  basePrice,
  cleaningFee,
  serviceFee,
  totalPrice,
  isSubmitting,
  isEditing,
  onConfirm,
}) => (
  <div className="mt-4">
    <div className="flex justify-between">
      <p className="text-[#6F6F6F] font-[400] text-[14px]">
        Booking fee[{nights} night{nights !== 1 ? 's' : ''}]
      </p>
      <p className="text-[#6F6F6F] font-[400] text-[14px]">
        NGN {basePrice.toLocaleString()}
      </p>
    </div>
    <div className="flex justify-between mt-2">
      <p className="text-[#6F6F6F] font-[400] text-[14px]">Cleaning Fee</p>
      <p className="text-[#6F6F6F] font-[400] text-[14px]">
        NGN {cleaningFee.toLocaleString()}
      </p>
    </div>
    <div className="flex justify-between mt-2">
      <p className="text-[#6F6F6F] font-[400] text-[14px]">Service Fee</p>
      <p className="text-[#6F6F6F] font-[400] text-[14px]">
        NGN {serviceFee.toLocaleString()}
      </p>
    </div>
    <div className="flex justify-between mt-2">
      <p className="text-[#313131] font-[400] text-[14px]">Total</p>
      <p className="text-[#313131] font-[500] text-[14px]">
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
