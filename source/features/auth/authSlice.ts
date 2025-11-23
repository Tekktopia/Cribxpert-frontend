import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from './authService';
import type { User } from './authTypes';

// Define AuthState inline to avoid language server cache issues
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: sessionStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Simple reducers for UI state management
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      if (!action.payload) {
        state.user = null; // Clear user if not authenticated
        sessionStorage.removeItem('token'); // Remove token from local storage
      }
    },

    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem('token');
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  // Add extra reducers to handle RTK Query states
  extraReducers: (builder) => {
    // Login mutation
    builder
      // Get current user query
      .addMatcher(authApi.endpoints.getCurrentUser.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        authApi.endpoints.getCurrentUser.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = payload.user;
          state.error = null;
        }
      )
      .addMatcher(
        authApi.endpoints.getCurrentUser.matchRejected,
        (state, { error }) => {
          state.isLoading = false;
          state.isAuthenticated = false;
          state.user = null;
          state.error = error.message || 'Failed to fetch user';
          sessionStorage.removeItem('token');
        }
    );
    // Login mutation
    builder
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = payload.user;
          state.token = payload.accessToken || sessionStorage.getItem('token');
          state.error = null;
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchRejected,
        (state, { error }) => {
          state.isLoading = false;
          state.isAuthenticated = false;
          state.error = error.message || 'Login failed';
        }
      );
  },
});

// Export actions
export const {
  setUser,
  clearUser,
  updateUserProfile,
  clearError,
  setIsAuthenticated,
} = authSlice.actions;

// Export selectors
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

// Export reducer
export default authSlice.reducer;
