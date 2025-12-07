import StepOne from '@/features/auth/components/forgot-password/StepOne';
import StepTwo from '@/features/auth/components/forgot-password/StepTwo';
import React, { useState } from 'react';
import {
  useForgotPasswordMutation,
  useVerifyOtpMutation,
} from '@/features/auth/authService';
import AuthLeftSide from '@/features/auth/components/AuthLeftSide';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const [methodSelected, setMethodSelected] = useState<string | null>(
    'Email Address'
  );
  const [error, setError] = useState('');

  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Use our custom auth service hooks
  const [forgotPassword, { isLoading: isRequestingReset }] =
    useForgotPasswordMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();

  const requestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const identifier =
        methodSelected === 'Email Address' ? email : phoneNumber;
      
      if (!identifier) {
        setError('Please enter your email address');
        return;
      }

      console.log('Sending forgot password request for:', identifier);
      
      const response = await forgotPassword({
        email: identifier,
      }).unwrap();

      console.log('Forgot password response:', response);

      if (response.message === 'password reset link sent') {
        setStep(2); // Move to Step Two
      } else {
        throw new Error(response.message || 'Failed to send reset code');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error requesting password reset - Full error:', err);
      console.error('Error status:', err?.status);
      console.error('Error data:', err?.data);
      console.error('Error message:', err?.message);
      
      // Handle RTK Query error structure
      let errorMessage = 'An error occurred while sending the reset link. Please try again.';
      
      // Check for network errors or timeouts
      if (err?.error === 'FETCH_ERROR' || err?.status === 'FETCH_ERROR') {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (err?.error === 'TIMEOUT_ERROR' || err?.status === 'TIMEOUT_ERROR' || err?.message?.includes('timeout')) {
        errorMessage = 'Request timed out. The server may be slow or unavailable. Please try again.';
      } else if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.data?.error) {
        errorMessage = err.data.error;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (err?.status === 404 || err?.data?.status === 404) {
        errorMessage = 'User not found. Please check your email address.';
      } else if (err?.status === 500 || err?.data?.status === 500) {
        errorMessage = 'Server error. Please try again later or contact support.';
      }
      
      setError(errorMessage);
    }
  };

  const verifyResetCode = async (code: string) => {
    try {
      const response = await verifyOtp({
        identifier: methodSelected === 'Email Address' ? email : phoneNumber,
        otp: code,
        // token: resetToken
      }).unwrap();

      if (response.success) {
        // Handle successful verification (redirect to reset password page)
        // You might want to redirect to a new page or show step 3
        return true;
      } else {
        throw new Error(response.message || 'Invalid verification code');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // console.error('Error verifying OTP: ', err);
      setError(err.message || 'Failed to verify code');
      return false;
    }
  };

  // const nextStep = () => {
  //   setStep((prev) => prev + 1);
  // };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image Section */}
      <AuthLeftSide />

      {/* Right Side - Login Section*/}
      {step === 1 && (
        <StepOne
          methodSelected={methodSelected}
          setMethodSelected={setMethodSelected}
          email={email}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setEmail={setEmail}
          requestReset={requestReset}
          error={error}
          isLoading={isRequestingReset}
        />
      )}

      {step === 2 && (
        <StepTwo
          methodSelected={methodSelected}
          email={email}
          phoneNumber={phoneNumber}
          requestReset={requestReset}
          verifyCode={verifyResetCode}
          error={error}
          isLoading={isVerifyingOtp || isRequestingReset}
        />
      )}
    </div>
  );
};
export default ForgotPassword;
