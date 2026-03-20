export interface PricingInput {
    basePrice: number;
    cleaningFee: number;
    securityDeposit: number;
    numberOfNights: number;
  }
  
  export interface PricingResult {
    accommodationFee: number;
    serviceFee: number;
    vat: number;
    totalPrice: number;
  }
  
  export function calculatePricing({
    basePrice,
    cleaningFee,
    securityDeposit,
    numberOfNights,
  }: PricingInput): PricingResult {
    const nightlyBase = numberOfNights > 0 ? basePrice * numberOfNights : basePrice;
    const accommodationFee = nightlyBase + cleaningFee;
    const serviceFee = Math.ceil(accommodationFee * 0.05);
    const vat = Math.ceil((accommodationFee + serviceFee) * 0.075);
    const totalPrice = accommodationFee + serviceFee + vat + securityDeposit;
  
    return { accommodationFee, serviceFee, vat, totalPrice };
  }