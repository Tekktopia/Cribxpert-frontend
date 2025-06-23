import React, { useState } from 'react';
import StepOne from '@/components/reset-password/StepOne';
import StepTwo from '@/components/reset-password/StepTwo';
import { Link } from 'react-router';
import AuthLeftSide from '@/components/common/AuthLeftSide';

const ResetPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    password: '',
  });

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image Section */}
      <AuthLeftSide/>

      {/* Right Side - Login Section*/}
      <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-auto mr-auto mb-8">
          <Link to={'/'}>
            <h1 className="font-bold text-[20px] text-[#1D5C5C]">CribXpert</h1>
          </Link>
        </div>
        {step === 1 && (
          <StepOne
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        )}

        {step === 2 && <StepTwo />}

        {step === 1 && (
          <p className="mt-6">
            If you didn’t receive a link!{' '}
            <span className="text-red-500">Resend</span>
          </p>
        )}
      </div>
    </div>
  );
};
export default ResetPassword;
