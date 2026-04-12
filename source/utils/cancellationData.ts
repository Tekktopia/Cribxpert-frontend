export interface CancellationPeriod {
  deadline: string;
  refundType: string;
  description: string;
}

export const CANCELLATION_PERIODS: CancellationPeriod[] = [
  {
    deadline: 'Before Jan 17',
    refundType: 'FULL REFUND',
    description:
      "Cancel your reservation before Jan 17 at 11:59 PM, and you'll get a full refund. Times are based on the property's local time.",
  },
  {
    deadline: 'Before Jan 24',
    refundType: 'PARTIAL REFUND',
    description:
      "If you cancel your reservation before Jan 24 at 11:59 PM, you'll get a refund of 50% of the amount paid (minus the service fee). Times are based on the property's local time.",
  },
  {
    deadline: 'After Jan 24',
    refundType: 'NO REFUND',
    description: "After that, you won't get a refund.",
  },
];
