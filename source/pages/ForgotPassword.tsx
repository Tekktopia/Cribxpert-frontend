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
      // const method = methodSelected === 'Email Address' ? 'email' : 'phone';

      const response = await forgotPassword({
        email: identifier,
      }).unwrap();

      // console.log(response)

      if (response.message === 'password reset link sent') {
        setStep(2); // Move to Step Two
      } else {
        throw new Error(response.data.message || 'Failed to send reset code');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // console.error('Error requesting password reset: ', err.data.message);
      setError(err.data.message || 'An error occurred during the request');
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
