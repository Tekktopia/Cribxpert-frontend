import React, { useState, useEffect } from 'react';
import StepOne from '@/features/auth/components/reset-password/StepOne';
import StepTwo from '@/features/auth/components/reset-password/StepTwo';
import { useNavigate } from 'react-router-dom';
import AuthLeftSide from '@/features/auth/components/AuthLeftSide';
import { supabase } from '@/lib/supabase';

const ResetPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ password: '' });
  const [recoveryReady, setRecoveryReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase fires PASSWORD_RECOVERY when user follows the reset link.
    // detectSessionInUrl: true (set in supabase.ts) handles the hash fragment.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setRecoveryReady(true);
      }
    });

    // Also check for an existing recovery session on mount (page reload case)
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setRecoveryReady(true);
      else {
        // Give the hash-fragment processing a moment before redirecting
        setTimeout(() => {
          if (!recoveryReady) navigate('/forgot-password');
        }, 2000);
      }
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextStep = () => setStep((prev) => prev + 1);

  const handleResetPassword = async (password: string): Promise<boolean> => {
    setError('');
    setIsLoading(true);
    const { error: sbError } = await supabase.auth.updateUser({ password });
    setIsLoading(false);

    if (sbError) {
      setError(sbError.message || 'Failed to reset password');
      return false;
    }

    nextStep();
    return true;
  };

  return (
    <div className="flex h-screen">
      <AuthLeftSide />

      <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        {step === 1 && (
          <StepOne
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            handleResetPassword={handleResetPassword}
            isLoading={isLoading}
            error={error}
          />
        )}

        {step === 2 && <StepTwo />}
      </div>
    </div>
  );
};
export default ResetPassword;
