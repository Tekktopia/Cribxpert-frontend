import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { EscrowState, DisbursePayload } from './escrowTypes';
import {
  registerGuestService,
  getGuestWalletService,
  getBookingEscrowStatusService,
  confirmDeliveryService,
  raiseDisputeService,
  disburseToHostService,
} from './escrowService';

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: EscrowState = {
  walletStatus:    'idle',
  paymentDetails:  null,
  escrowStatus:    null,
  escrowMessage:   '',
  escrowLoading:   false,
  guestId:         null,
  registerLoading: false,
  registerError:   null,
  actionLoading:   false,
  actionSuccess:   false,
  actionError:     null,
  disburseLoading: false,
  disburseResult:  null,
  disburseError:   null,
  error:           null,
};

// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const registerGuest = createAsyncThunk(
  'escrow/registerGuest',
  async (
    details: {
      email: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      countryCode: string;
      dateOfBirth: string;
    },
    { rejectWithValue }
  ) => {
    try {
      return await registerGuestService(details);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const fetchGuestWallet = createAsyncThunk(
  'escrow/fetchGuestWallet',
  async (szndUserId: string, { rejectWithValue }) => {
    try {
      return await getGuestWalletService(szndUserId);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const fetchBookingEscrowStatus = createAsyncThunk(
  'escrow/fetchBookingEscrowStatus',
  async (bookingId: string, { rejectWithValue }) => {
    try {
      return await getBookingEscrowStatusService(bookingId);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const confirmDelivery = createAsyncThunk(
  'escrow/confirmDelivery',
  async (
    { bookingId, guestId }: { bookingId: string; guestId: string },
    { rejectWithValue }
  ) => {
    try {
      return await confirmDeliveryService(bookingId, guestId);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const raiseDispute = createAsyncThunk(
  'escrow/raiseDispute',
  async (
    payload: { bookingId: string; guestId: string; reason: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const { bookingId, ...rest } = payload;
      return await raiseDisputeService(bookingId, rest);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const disburseToHost = createAsyncThunk(
  'escrow/disburseToHost',
  async (payload: DisbursePayload, { rejectWithValue }) => {
    try {
      return await disburseToHostService(payload);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const escrowSlice = createSlice({
  name: 'escrow',
  initialState,
  reducers: {
    resetActionState(state) {
      state.actionLoading = false;
      state.actionSuccess = false;
      state.actionError   = null;
    },
    resetDisburseState(state) {
      state.disburseLoading = false;
      state.disburseResult  = null;
      state.disburseError   = null;
    },
    clearEscrowError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {

    // ── Register Guest ────────────────────────────────────────────────────────
    builder
      .addCase(registerGuest.pending, (state) => {
        state.registerLoading = true;
        state.registerError   = null;
      })
      .addCase(registerGuest.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.guestId         = action.payload.guestId;
      })
      .addCase(registerGuest.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError   = action.payload as string;
      });

    // ── Fetch Wallet ──────────────────────────────────────────────────────────
    builder
      .addCase(fetchGuestWallet.pending, (state) => {
        state.walletStatus = 'loading';
      })
      .addCase(fetchGuestWallet.fulfilled, (state, action) => {
        if (action.payload.status === 'READY' && action.payload.paymentDetails) {
          state.walletStatus   = 'ready';
          state.paymentDetails = action.payload.paymentDetails;
        } else {
          state.walletStatus = 'pending';
        }
      })
      .addCase(fetchGuestWallet.rejected, (state, action) => {
        state.walletStatus = 'failed';
        state.error        = action.payload as string;
      });

    // ── Booking Escrow Status ─────────────────────────────────────────────────
    builder
      .addCase(fetchBookingEscrowStatus.pending, (state) => {
        state.escrowLoading = true;
      })
      .addCase(fetchBookingEscrowStatus.fulfilled, (state, action) => {
        state.escrowLoading = false;
        state.escrowStatus  = action.payload.escrowStatus;
        state.escrowMessage = action.payload.message;
      })
      .addCase(fetchBookingEscrowStatus.rejected, (state, action) => {
        state.escrowLoading = false;
        state.error         = action.payload as string;
      });

    // ── Confirm Delivery ──────────────────────────────────────────────────────
    builder
      .addCase(confirmDelivery.pending, (state) => {
        state.actionLoading  = true;
        state.actionSuccess  = false;
        state.actionError    = null;
      })
      .addCase(confirmDelivery.fulfilled, (state) => {
        state.actionLoading  = false;
        state.actionSuccess  = true;
        state.escrowStatus   = 'DELIVERY_CONFIRMED';
      })
      .addCase(confirmDelivery.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError   = action.payload as string;
      });

    // ── Raise Dispute ─────────────────────────────────────────────────────────
    builder
      .addCase(raiseDispute.pending, (state) => {
        state.actionLoading = true;
        state.actionSuccess = false;
        state.actionError   = null;
      })
      .addCase(raiseDispute.fulfilled, (state) => {
        state.actionLoading = false;
        state.actionSuccess = true;
        state.escrowStatus  = 'DISPUTED';
      })
      .addCase(raiseDispute.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError   = action.payload as string;
      });

    // ── Disburse to Host ──────────────────────────────────────────────────────
    builder
      .addCase(disburseToHost.pending, (state) => {
        state.disburseLoading = true;
        state.disburseResult  = null;
        state.disburseError   = null;
      })
      .addCase(disburseToHost.fulfilled, (state, action) => {
        state.disburseLoading = false;
        state.disburseResult  = action.payload;
        state.escrowStatus    = 'DISBURSED';
      })
      .addCase(disburseToHost.rejected, (state, action) => {
        state.disburseLoading = false;
        state.disburseError   = action.payload as string;
      });
  },
});

export const {
  resetActionState,
  resetDisburseState,
  clearEscrowError,
} = escrowSlice.actions;

export default escrowSlice.reducer;