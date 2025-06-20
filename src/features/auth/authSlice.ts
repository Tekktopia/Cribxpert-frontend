import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from './authService';
import { User, AuthState } from './authTypes';

const initialState: AuthState = {
  user: null,
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
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
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
          state.error = null;
          // Store token from the response
          if (payload.accessToken) {
            localStorage.setItem('token', payload.accessToken);
          }
        }
      )
      .addMatcher(authApi.endpoints.login.matchRejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || 'Login failed';
      })
      // Register mutation
      .addMatcher(authApi.endpoints.register.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state) => {
        state.isLoading = false;
        // We don't automatically log in after registration
      })
      .addMatcher(
        authApi.endpoints.register.matchRejected,
        (state, { error }) => {
          state.isLoading = false;
          state.error = error.message || 'Registration failed';
        }
      )
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
          state.user = payload;
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
          localStorage.removeItem('token');
        }
      )
  },
});

// Export actions
export const { setUser, clearUser, updateUserProfile, clearError } =
  authSlice.actions;

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
