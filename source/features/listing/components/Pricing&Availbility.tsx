import React, { useEffect } from 'react';
import InfoTooltip from '@/shared/components/ui/InfoTooltip';

interface PricingPageProps {
  basePrice: string;
  setBasePrice: React.Dispatch<React.SetStateAction<string>>;
  securityDeposit: string;
  setSecurityDeposit: React.Dispatch<React.SetStateAction<string>>;
  cleaningFee: string;
  setCleaningFee: React.Dispatch<React.SetStateAction<string>>;
  availableFrom: string;
  setAvailableFrom: React.Dispatch<React.SetStateAction<string>>;
  availableUntil: string;
  setAvailableUntil: React.Dispatch<React.SetStateAction<string>>;
}

const PricingPage: React.FC<PricingPageProps> = ({
  basePrice,
  setBasePrice,
  securityDeposit,
  setSecurityDeposit,
  cleaningFee,
  setCleaningFee,
  availableFrom,
  setAvailableFrom,
  availableUntil,
  setAvailableUntil,
}) => {
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const numeric = Number(basePrice.replace(/\D/g, ''));
    if (numeric > 0) {
      setSecurityDeposit(String(Math.round(numeric * 0.1)));
    } else {
      setSecurityDeposit('');
    }
  }, [basePrice, setSecurityDeposit]);

  const formatNumberWithCommas = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    if (!numericValue) return '';
    return Number(numericValue).toLocaleString('en-US');
  };

  const getNumericValue = (value: string): string => value.replace(/\D/g, '');

  const handleBasePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasePrice(getNumericValue(e.target.value));
  };

  const handleCleaningFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCleaningFee(getNumericValue(e.target.value));
  };

  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Pricing</h3>

      <section className="mb-6">
        <label htmlFor="base-price" className="block mb-2 font-medium p-2">
          Base Price (per night)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
          <input
            id="base-price"
            type="text"
            placeholder="0.00"
            className="w-full border border-neutralLight p-2 pl-8 rounded"
            value={basePrice ? formatNumberWithCommas(basePrice) : ''}
            onChange={handleBasePriceChange}
          />
        </div>

        <label htmlFor="security-deposit" className="flex items-center mb-2 font-medium p-2">
          Security Deposit
          <InfoTooltip text="The security deposit protects your property from damages or late cancellations. If there are no issues after checkout, the full amount is returned to the guest." />
          <span className="ml-2 text-xs text-gray-400 font-normal">(Auto-calculated at 10% of base price)</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
          <input
            id="security-deposit"
            type="text"
            placeholder="Auto-calculated"
            className="w-full border border-neutralLight p-2 pl-8 rounded bg-gray-50 text-gray-500 cursor-not-allowed"
            value={securityDeposit ? formatNumberWithCommas(securityDeposit) : ''}
            readOnly
            disabled
          />
        </div>

        <label htmlFor="cleaning-fee" className="block mb-2 font-medium p-2">
          Cleaning Fee
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
          <input
            id="cleaning-fee"
            type="text"
            placeholder="0.00"
            className="w-full border border-neutralLight p-2 pl-8 rounded"
            value={cleaningFee ? formatNumberWithCommas(cleaningFee) : ''}
            onChange={handleCleaningFeeChange}
          />
        </div>
      </section>

      <h3 className="text-xl font-semibold mb-4">Availability</h3>

      <section>
        <label htmlFor="available-from" className="block mb-2 font-medium p-2">
          Available From
        </label>
        <input
          id="available-from"
          type="date"
          className="w-full border border-neutralLight p-2 pl-4 rounded"
          value={availableFrom}
          onChange={(e) => setAvailableFrom(e.target.value)}
          min={today}
        />

        <label htmlFor="available-until" className="block mb-2 font-medium p-2">
          Available Until
        </label>
        <input
          id="available-until"
          type="date"
          className="w-full border border-neutralLight p-2 pl-4 rounded"
          value={availableUntil}
          onChange={(e) => setAvailableUntil(e.target.value)}
          min={availableFrom || today}
        />
      </section>

      <p className="mt-4 p-1 text-sm text-center">
        You'll be able to block specific dates or adjust pricing for certain periods after creating your listing
      </p>
    </>
  );
};

export default PricingPage;