// source/routes/RouteConfig.tsx
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
import SavedListing from '@/pages/SavedListing';
import BookingsPage from '@/pages/BookingsPage';
import BookNowPage from '@/pages/BookNowPage';
import BookingDetailsPage from '@/pages/BookingDetailsPage';
import MyListing from '../pages/MyListing';
import MyListingDetailPage from '../pages/MyListingDetailPage';

// Support & Utility Pages
import PaymentMethod from '@/pages/PaymentMethod';
import SupportPage from '@/pages/SupportPage';
import SupportInfo from '@/pages/SupportInfo';
import NotificationPage from '@/pages/NotificationPage';
import NotFound404 from '@/pages/NotFound404';
import VerifyEmail from '@/pages/VerifyEmail';
import Message from '@/pages/Message';
import PaymentHistory from '@/pages/PaymentHistory';
import PaymentHistoryDetails from '@/pages/PaymentHistoryDetails';
import TermsAndConditions from '@/pages/TermsAndConditions';
import PrivacyPolicy from '@/pages/PrivacyPolicy';

import PaymentDetailsDownload from '@/pages/PaymentDetailsDownload';
import EscrowPaymentPage from '@/pages/EscrowPaymentPage';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  protected: boolean;
  authRoute?: boolean;
  title: string;
  children?: RouteConfig[];
  header?: boolean;
}

const routeConfig: RouteConfig[] = [
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
  {
    path: '/my-listing',
    element: <MyListing />,
    protected: false,
    title: 'My Listing',
  },
  {
    path: '/my-listing/:id',
    element: <MyListingDetailPage />,
    protected: false,
    title: 'Listing Details',
  },
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
    path: '/booking/:id',
    element: <BookingDetailsPage />,
    protected: true,
    title: 'Booking Details',
  },
  {
    path: '/payments',
    element: <PaymentHistory />,
    protected: true,
    title: 'Payment History',
  },
  {
    path: '/payment-history/:id',
    element: <PaymentHistoryDetails />,
    protected: true,
    title: 'Payment History Details',
  },
  {
    path: '/invoice/:id',
    element: <PaymentDetailsDownload />,
    protected: true,
    title: 'Payment Invoice',
  },
  {
    path: '/pay',
    element: <PaymentMethod />,
    protected: true,
    title: 'Payment Methods',
    header: false,
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
    protected: true,
    title: 'Complete Your Profile',
    header: false,
  },
  {
    path: '/notification',
    element: <NotificationPage />,
    protected: false,
    title: 'Notifications',
  },
  {
    path: '/faqs',
    element: <SupportPage />,
    protected: false,
    title: 'Support',
  },
  {
    path: '/support',
    element: <SupportInfo />,
    protected: false,
    title: 'Support Information',
  },
  {
    path: '/message',
    element: <Message />,
    protected: true,
    title: 'Message',
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditions />,
    protected: false,
    title: 'Terms and Conditions',
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
    protected: false,
    title: 'Privacy Policy',
  },
  {
    path: '/escrow/:bookingId',
    element: <EscrowPaymentPage />,
    protected: true,
    title: 'Secure Payment',
  },
  {
    path: '/payment-success',
    element: <PaymentSuccessPage />,
    protected: true,
    title: 'Payment Success',
  },
  {
    path: '*',
    element: <NotFound404 />,
    protected: false,
    title: 'Page Not Found',
  },
];

export default routeConfig;