import {
  selectAuthLoading,
  selectIsAuthenticated,
} from '@/features/auth/authSlice';
import routeConfig from '@/routes/RouteConfig';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Footer from './Footer';

const FooterWrapper = () => {
  const location = useLocation();
  const authLoading = useSelector(selectAuthLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Find the current route configuration
  const currentRoute = routeConfig.find(
    (route) =>
      route.path === location.pathname ||
      // Handle dynamic routes with path parameters
      (route.path.includes(':') &&
        location.pathname.match(
          new RegExp(route.path.replace(/:\w+/g, '[^/]+'))
        ))
  );

  // List of auth-related paths where footer should not appear
  const noFooterPaths = [
    '/sign-up',
    '/login',
    '/forgot-password',
    '/reset-password',
    '/onboarding',
    '/discover',
  ];

  // Don't show footer in these cases:
  // 1. Path is in noFooterPaths list, OR
  // 2. Auth is currently loading, OR
  // 3. Route is protected and user is not authenticated
  const shouldHideFooter =
    noFooterPaths.includes(location.pathname) ||
    authLoading ||
    (currentRoute?.protected && !isAuthenticated);

  // Don't render the footer if any conditions to hide it are true
  if (shouldHideFooter) {
    return null;
  }

  // Otherwise, render the footer
  return <Footer />;
};

export default FooterWrapper;
