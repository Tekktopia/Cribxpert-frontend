// ─── Escrow Status ────────────────────────────────────────────────────────────

export type EscrowStatus =
  | 'AWAITING_PAYMENT'    // Guest hasn't paid — show bank details
  | 'FUNDS_HELD'          // Money received, sitting in Cribxpert escrow
  | 'DELIVERY_CONFIRMED'  // Guest confirmed apartment is fine
  | 'DISBURSED'           // Host has been paid out
  | 'DISPUTED'            // Guest raised a problem
  | 'REFUNDED';           // Admin decided to refund guest

// ─── Payment Details (NGN Virtual Account) ────────────────────────────────────

export interface PaymentDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  currency: 'NGN';
}

export interface WalletResponse {
  status: 'READY' | 'PENDING';
  message?: string;
  paymentDetails?: PaymentDetails;
}

// ─── Booking Escrow State ─────────────────────────────────────────────────────

export interface BookingEscrowStatus {
  bookingId: string;
  escrowStatus: EscrowStatus;
  message: string;
  transactionStatus?: string;
}

// ─── Disbursement ─────────────────────────────────────────────────────────────

export interface DisbursePayload {
  bookingId: string;
  hostUserTag: string;
  amount: string;
  customerId: string;
  adminId: string;
}

export interface DisburseResult {
  success: boolean;
  bookingId: string;
  transactionId: string;
  reference: string;
  amountDisbursed: string;
  currency: string;
  fees: string;
  status: string;
}

// ─── Redux State ──────────────────────────────────────────────────────────────

export interface EscrowState {
  // Wallet
  walletStatus: 'idle' | 'loading' | 'ready' | 'pending' | 'failed';
  paymentDetails: PaymentDetails | null;

  // Booking escrow status
  escrowStatus: EscrowStatus | null;
  escrowMessage: string;
  escrowLoading: boolean;

  // Guest registration
  guestId: string | null;
  registerLoading: boolean;
  registerError: string | null;

  // Confirm delivery / dispute
  actionLoading: boolean;
  actionSuccess: boolean;
  actionError: string | null;

  // Admin disbursement
  disburseLoading: boolean;
  disburseResult: DisburseResult | null;
  disburseError: string | null;

  error: string | null;
}
