import React from 'react';

// Authentication & User Management Pages
import SignUp from '@/pages/SignUp';
import Login from '@/pages/Login';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Onboarding from '@/pages/Onboarding';
import ProfilePage from '@/pages/ProfilePage';

// Main Feature Pages
import Home from '@/pages/Home';
import DiscoverPage from '@/pages/DiscoverPage';
import PropertyDetail from '@/pages/PropertyDetail';
import SavedListing from '@/pages/SavedListing/SavedListing';
import BookingsPage from '@/pages/BookingsPage';
import BookNowPage from '@/pages/BookNowPage';

// Support & Utility Pages
import PaymentMethod from '@/pages/PaymentMethod';
import SupportPage from '@/pages/SupportPage';
import SupportInfo from '@/pages/SupportInfo';
import NotificationPage from '@/pages/NotificationPage';
import NotFound404 from '@/pages/NotFound404';
import VerifyEmail from '@/pages/VerifyEmail';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  protected: boolean;
  authRoute?: boolean; // New property to identify auth routes
  title: string;
  children?: RouteConfig[];
}

const routeConfig: RouteConfig[] = [
  // Public routes
  {
    path: '/',
    element: <Home />,
    protected: false,
    title: 'Home',
  },
  {
    path: '/propertydetail/:name',
    element: <PropertyDetail />,
    protected: false,
    title: 'Property Details',
  },
  {
    path: '/discover',
    element: <DiscoverPage />,
    protected: false,
    title: 'Discover Properties',
  },

  // Auth routes
  {
    path: '/sign-up',
    element: <SignUp />,
    protected: false,
    authRoute: true,
    title: 'Sign Up',
  },
  {
    path: '/verify-email/:token',
    element: <VerifyEmail />,
    protected: false,
    title: 'Verify Email',
  },
  {
    path: '/login',
    element: <Login />,
    protected: false,
    authRoute: true,
    title: 'Login',
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    protected: false,
    authRoute: true,
    title: 'Forgot Password',
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
    protected: false,
    authRoute: true,
    title: 'Reset Password',
  },

  // Protected routes
  {
    path: '/my-bookings',
    element: <BookingsPage />,
    protected: true,
    title: 'My Bookings',
  },
  {
    path: '/book-now',
    element: <BookNowPage />,
    protected: true,
    title: 'Book Now',
  },
  {
    path: '/payments',
    element: <PaymentMethod />,
    protected: true,
    title: 'Payment Methods',
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    protected: true,
    title: 'My Profile',
  },
  {
    path: '/saved-listings',
    element: <SavedListing />,
    protected: true,
    title: 'Saved Listings',
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
    protected: false,
    title: 'Complete Your Profile',
  },
  {
    path: '/notification',
    element: <NotificationPage />,
    protected: true,
    title: 'Notifications',
  },

  // Support routes
  {
    path: '/support',
    element: <SupportPage />,
    protected: false,
    title: 'Support',
  },
  {
    path: '/support-info',
    element: <SupportInfo />,
    protected: false,
    title: 'Support Information',
  },

  // 404 route - must be last
  {
    path: '*',
    element: <NotFound404 />,
    protected: false,
    title: 'Page Not Found',
  },
];

export default routeConfig;
