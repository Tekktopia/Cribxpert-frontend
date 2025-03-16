import StepOne from '@/components/forgot-password/StepOne';
import StepTwoMain from '@/components/sign-up/StepTwoMain';
import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const [methodSelected, setMethodSelected] = useState<string | null>(
    'Email Address'
  );

  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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
      {step === 1 && (
        <StepOne
          nextStep={nextStep}
          methodSelected={methodSelected}
          setMethodSelected={setMethodSelected}
          email={email}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setEmail={setEmail}
        />
      )}

      {step === 2 && (
        <StepTwoMain
          methodSelected={methodSelected}
          email={email}
          phoneNumber={phoneNumber}
        />
      )}
    </div>
  );
};
export default ForgotPassword;
