import StepOne from '@/features/auth/components/forgot-password/StepOne';
import StepTwo from '@/features/auth/components/forgot-password/StepTwo';
import React, { useState } from 'react';
import AuthLeftSide from '@/features/auth/components/AuthLeftSide';
import { supabase } from '@/lib/supabase';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const [methodSelected, setMethodSelected] = useState<string | null>('Email Address');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const requestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (methodSelected !== 'Email Address') {
      setError('Phone reset is not yet supported');
      return;
    }

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    const { error: sbError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${import.meta.env.VITE_FRONTEND_URL || window.location.origin}/reset-password`,
    });
    setIsLoading(false);

    if (sbError) {
      setError(sbError.message || 'Failed to send reset link');
      return;
    }

    setStep(2);
  };

  // Stub — Supabase uses link-based recovery, no OTP to verify
  const verifyResetCode = async (_code: string): Promise<boolean> => false;

  return (
    <div className="flex h-screen">
      <AuthLeftSide />

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
          isLoading={isLoading}
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
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
export default ForgotPassword;
