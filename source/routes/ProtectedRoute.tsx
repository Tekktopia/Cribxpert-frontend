import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectIsAuthenticated,
  selectAuthLoading,
} from '@/features/auth/authSlice';
import Spinner from '@/shared/components/Spinner';
import { JSX, useEffect } from 'react';
import { easeInOut, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectPath?: string;
}

const ProtectedRoute = ({
  children,
  redirectPath = '/login',
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authLoading = useSelector(selectAuthLoading);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  };
  
  const pageTransition = {
    type: "tween" as const,
    ease: easeInOut,
    duration: 1
  };

  // Handle redirects with animation
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      // Set a small timeout to allow animation to complete
      const timer = setTimeout(() => {
        navigate(redirectPath, { state: { from: location }, replace: true });
      }, 1000); // Match this with your animation duration
      
      return () => clearTimeout(timer);
    }
  }, [authLoading, isAuthenticated, navigate, redirectPath, location]);

  // Show loading spinner while checking auth status
  if (authLoading) {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="flex items-center justify-center min-h-screen"
      >
        <Spinner size="large" />
      </motion.div>
    );
  }

  // If not authenticated, show a fading out animation before redirect
  if (!isAuthenticated) {
    return (
      <motion.div
        initial="in"
        animate="out"
        variants={pageVariants}
        transition={pageTransition}
        className="flex items-center justify-center min-h-screen"
      >
        <Spinner size="large" />
      </motion.div>
    );
  }

  // Render the protected content with a smooth fade-in animation
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default ProtectedRoute;