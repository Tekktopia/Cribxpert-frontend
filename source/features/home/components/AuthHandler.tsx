import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetCurrentUserQuery } from '@/features/auth/authService';
import { setUser, setIsAuthenticated } from '@/features/auth/authSlice';

const AuthHandler = () => {
  const dispatch = useDispatch();
  const [shouldFetchUser, setShouldFetchUser] = useState(false);

  // Extract token from URL params and store in sessionStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Store token in sessionStorage
      sessionStorage.setItem('token', token);

      // Trigger user fetch after token is stored
      setShouldFetchUser(true);

      // Clean up URL by removing the token parameter
      urlParams.delete('token');
      const newUrl =
        window.location.pathname +
        (urlParams.toString() ? '?' + urlParams.toString() : '');
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  // Fetch current user when token is available
  const {
    data: currentUser,
    error: userError,
    isSuccess: userSuccess,
  } = useGetCurrentUserQuery(undefined, {
    skip: !shouldFetchUser,
  });

  // Handle user authentication response
  useEffect(() => {
    if (shouldFetchUser) {
      if (userSuccess && currentUser) {
        // User is authenticated - set user data and auth state
        dispatch(setUser(currentUser.user));
        dispatch(setIsAuthenticated(true));
      } else if (userError) {
        // Authentication failed - remove token and keep user signed out
        sessionStorage.removeItem('token');
        dispatch(setIsAuthenticated(false));
      }
      // Reset the fetch trigger
      setShouldFetchUser(false);
    }
  }, [shouldFetchUser, userSuccess, currentUser, userError, dispatch]);

  // This component doesn't render anything
  return null;
};

export default AuthHandler;
