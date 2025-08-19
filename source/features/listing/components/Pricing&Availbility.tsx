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
  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Pricing</h3>

      <section className="mb-6">
        <label htmlFor="base-price" className="block mb-2 font-medium p-2">
          Base Price (per night)
        </label>
        <input
          id="base-price"
          type="number"
          placeholder="₦0.00"
          className="w-full border border-gray-300 p-2 pl-4 rounded"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
        />

        <label htmlFor="security-deposit" className="block mb-2 font-medium p-2">
          Security Deposit
        </label>
        <input
          id="security-deposit"
          type="number"
          placeholder="₦0.00"
          className="w-full border border-gray-300 p-2 pl-4 rounded"
          value={securityDeposit}
          onChange={(e) => setSecurityDeposit(e.target.value)}
        />

        <label htmlFor="cleaning-fee" className="block mb-2 font-medium p-2">
          Cleaning Fee
        </label>
        <input
          id="cleaning-fee"
          type="number"
          placeholder="₦0.00"
          className="w-full border border-gray-300 p-2 pl-4 rounded"
          value={cleaningFee}
          onChange={(e) => setCleaningFee(e.target.value)}
        />
      </section>

      <h3 className="text-xl font-semibold mb-4">Availability</h3>

      <section>
        <label htmlFor="available-from" className="block mb-2 font-medium p-2">
          Available From
        </label>
        <input
          id="available-from"
          type="date"
          className="w-full border border-gray-300 p-2 pl-4 rounded"
          value={availableFrom}
          onChange={(e) => setAvailableFrom(e.target.value)}
        />

        <label htmlFor="available-until" className="block mb-2 font-medium p-2">
          Available Until
        </label>
        <input
          id="available-until"
          type="date"
          className="w-full border border-gray-300 p-2 pl-4 rounded"
          value={availableUntil}
          onChange={(e) => setAvailableUntil(e.target.value)}
        />
      </section>
      <p className="mt-4 p-1 text-sm text-center">
        You’ll be able to block specific dates or adjust pricing for certain periods after creating your listing
      </p>
    </>
  );
};

export default PricingPage;
