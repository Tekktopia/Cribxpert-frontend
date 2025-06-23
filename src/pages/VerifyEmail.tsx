import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVerifyEmailQuery } from '@/features/auth/authService';

const VerifyEmail = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  // console.log('Email verification token:', token);

  // Skip the query if no token is provided
  const { isLoading, isSuccess, isError, error } = useVerifyEmailQuery(
    token ?? '',
    { skip: !token }
  );

  useEffect(() => {
    if (isSuccess) {
      // Redirect on successful verification
      navigate('/onboarding');
    } else if (isError) {
      // Redirect on verification error
        // console.error('Email verification failed:', error);
      navigate('/login');
    }
  }, [isSuccess, isError, navigate, error]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Verifying Your Email</h1>
          <p className="text-gray-600 mb-6">
            Please wait while we verify your email address...
          </p>
          {/* Add loading spinner here if desired */}
          <div className="animate-spin h-8 w-8 border-4 border-t-[#1D5C5C] border-r-transparent border-b-[#1D5C5C] border-l-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return null;
};

export default VerifyEmail;
