import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/features/auth/authSlice';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Component that prevents authenticated users from accessing auth pages
 * Redirects authenticated users to the home page or specified route
 */
const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  redirectTo = '/',
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // If user is authenticated, redirect them away from auth pages
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // If user is not authenticated, allow access to auth pages
  return <>{children}</>;
};

export default AuthGuard;
