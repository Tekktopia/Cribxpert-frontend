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
// import ListingMgmtPage from '@/pages/ListingManagementPage';
import PaymentDetailsDownload from '@/pages/PaymentDetailsDownload';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  protected: boolean;
  authRoute?: boolean; // New property to identify auth routes
  title: string;
  children?: RouteConfig[];
  header?: boolean;
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
  },{
     path: '/my-listing',
     element: <MyListing />,
     protected: false,
     title: 'My Listing',
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
    protected: false,
    authRoute: true,
    title: 'Complete Your Profile',
  },
  {
    path: '/notification',
    element: <NotificationPage />,
    protected: false,
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
  {
    path: '/message',
    element: <Message />,
    protected: true,
    title: 'Message',
  },

  //Must be removed in production
  //This is a simple page to manage listing in development with admin priviledges
  // {
  //   path: '/listing-management',
  //   element: <ListingMgmtPage />,
  //   protected: true,
  //   title: 'Listing Management',
  //   header: false,
  // },

  // 404 route - must be last
  {
    path: '*',
    element: <NotFound404 />,
    protected: false,
    title: 'Page Not Found',
  },
];

export default routeConfig;
