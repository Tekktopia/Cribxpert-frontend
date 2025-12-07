import React from 'react';

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
  // Get today's date in YYYY-MM-DD format for min date restriction
  const today = new Date().toISOString().split('T')[0];

  // Helper function to format number with commas
  const formatNumberWithCommas = (value: string): string => {
    // Remove all non-digit characters
    const numericValue = value.replace(/\D/g, '');
    if (!numericValue) return '';
    // Format with commas
    return Number(numericValue).toLocaleString('en-US');
  };

  // Helper function to get numeric value (without commas) for storage
  const getNumericValue = (value: string): string => {
    return value.replace(/\D/g, '');
  };

  // Handler for base price
  const handleBasePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberWithCommas(e.target.value);
    const numeric = getNumericValue(formatted);
    setBasePrice(numeric); // Store numeric value without commas
  };

  // Handler for security deposit
  const handleSecurityDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberWithCommas(e.target.value);
    const numeric = getNumericValue(formatted);
    setSecurityDeposit(numeric); // Store numeric value without commas
  };

  // Handler for cleaning fee
  const handleCleaningFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberWithCommas(e.target.value);
    const numeric = getNumericValue(formatted);
    setCleaningFee(numeric); // Store numeric value without commas
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

        <label htmlFor="security-deposit" className="block mb-2 font-medium p-2">
          Security Deposit
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
          <input
            id="security-deposit"
            type="text"
            placeholder="0.00"
            className="w-full border border-neutralLight p-2 pl-8 rounded"
            value={securityDeposit ? formatNumberWithCommas(securityDeposit) : ''}
            onChange={handleSecurityDepositChange}
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
        You’ll be able to block specific dates or adjust pricing for certain periods after creating your listing
      </p>
    </>
  );
};

export default PricingPage;
