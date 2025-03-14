import React, { useState } from 'react';
import StepOne from '@/components/reset-password/StepOne';
import StepTwo from '@/components/reset-password/StepTwo';

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
      <div className="w-1/2 h-full relative">
        <img
          src="/authsidepane1.png"
          alt="Login Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#73007166] opacity-50"></div>
      </div>

      {/* Right Side - Login Section*/}
      <div className="relative w-1/2 flex flex-col items-center justify-center p-8">
        {step === 1 && (
          <StepOne formData={formData} setFormData={setFormData} />
        )}

        {step === 2 && <StepTwo />}

        {step === 1 ? (
          <button
            onClick={nextStep}
            className="w-full max-w-[422px] p-3 mx-auto bg-[#730071] text-white font-semibold rounded-md flex items-center justify-center gap-2 mt-12"
          >
            Continue
          </button>
        ) : (
          <a
            href="/login"
            className="w-full max-w-[422px] p-3 mx-auto bg-[#730071] text-white font-semibold rounded-md flex items-center justify-center gap-2 mt-12"
          >
            <button>Login</button>
          </a>
        )}

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
