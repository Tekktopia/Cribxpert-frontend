// Auth barrel — re-exports the slice reducer and new Supabase-based actions.

import authReducer, {
  setSession,
  setProfile,
  clearSession,
  setAuthLoading,
  setAuthError,
  updateUserProfile,
  selectCurrentUser,
  selectProfile,
  selectSession,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from './authSlice';

export {
  setSession,
  setProfile,
  clearSession,
  setAuthLoading,
  setAuthError,
  updateUserProfile,
  selectCurrentUser,
  selectProfile,
  selectSession,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
};

export default authReducer;
