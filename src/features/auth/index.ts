// Export all auth-related functionality from a single file

import authReducer, {
  setUser,
  clearUser,
  updateUserProfile,
  clearError,
  User,
} from './authSlice';

import {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
} from './authService';

// Re-export everything
export {
  setUser,
  clearUser,
  updateUserProfile,
  clearError,
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
};

// Re-export types
export type {
  User,
};

// Export the reducer as the default export
export default authReducer;
