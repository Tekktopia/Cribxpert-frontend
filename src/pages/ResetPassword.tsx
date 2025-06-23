import React, { useState, useEffect } from 'react';
import StepOne from '@/components/reset-password/StepOne';
import StepTwo from '@/components/reset-password/StepTwo';
import { useNavigate } from 'react-router-dom';
import AuthLeftSide from '@/components/common/AuthLeftSide';
import { useSearchParams } from 'react-router-dom';
import { useResetPasswordMutation } from '@/features/auth/authService';

const ResetPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract token and email from URL parameters
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [formData, setFormData] = useState({
    password: '',
    email: email || '',
    token: token || '',
  });

  const [resetPassword, { isLoading, isSuccess, error }] =
    useResetPasswordMutation();

  // Check if token and email are present when component mounts
  useEffect(() => {
    if (!token || !email) {
      // No token or email in URL, redirect to forgot password page
      navigate('/forgot-password');
    }
  }, [token, email, navigate]);

  // Update formData when token or email changes
  useEffect(() => {
    if (token && email) {
      setFormData((prev) => ({
        ...prev,
        token,
        email,
      }));
    }
  }, [token, email]);

  // Move to success screen when password reset is successful
  useEffect(() => {
    if (isSuccess) {
      nextStep();
    }
  }, [isSuccess]);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleResetPassword = async (password: string) => {
    if (!token || !email) {
      return false;
    }

    try {
      await resetPassword({
        token,
        email,
        newPassword: password,
      }).unwrap();
      return true;
    } catch (err) {
      console.error('Failed to reset password:', err);
      return false;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image Section */}
      <AuthLeftSide />

      {/* Right Side - Login Section*/}
      <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        {/* <div className="w-auto mr-auto mb-8">
          <Link to={'/'}>
            <h1 className="font-bold text-[20px] text-[#1D5C5C]">CribXpert</h1>
          </Link>
        </div> */}
        {step === 1 && (
          <StepOne
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            handleResetPassword={handleResetPassword}
            isLoading={isLoading}
            error={
              error && 'data' in error
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (error as any).data.message
                : ''
            }
          />
        )}

        {step === 2 && <StepTwo />}
      </div>
    </div>
  );
};
export default ResetPassword;
