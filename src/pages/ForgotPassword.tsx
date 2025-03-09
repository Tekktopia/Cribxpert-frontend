import StepOne from '@/components/forgot-password/StepOne';
import StepTwo from '@/components/forgot-password/StepTwo';
import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = React.useState('');
  console.log(email);

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
      {step ===1 && (<StepOne
        nextStep={nextStep}
        setEmail={setEmail}
      />)}

      {step ===2 &&(
        <StepTwo
          email={email}
        />
      )}
    </div>
  );
};
export default ForgotPassword;
