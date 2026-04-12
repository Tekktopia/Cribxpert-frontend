import React, { useState } from 'react';
import StepOne from '@/features/auth/components/signup/StepOne.tsx';
import StepTwoMain from '@/features/auth/components/signup/StepTwoMain';
import AuthLeftSide from '@/features/auth/components/AuthLeftSide';

const SignUp: React.FC = () => {
  const [step, setStep] = useState(1);
  const [methodSelected, setMethodSelected] = useState<string | null>(
    'Email Address'
  );

  //Necessary onboarding info
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image Section */}
      <AuthLeftSide />

      {/* Right Side - Signup Section */}
      {step === 1 && (
        <StepOne
          nextStep={nextStep}
          methodSelected={methodSelected}
          setMethodSelected={setMethodSelected}
          email={email}
          phoneNumber={phoneNumber}
          setEmail={setEmail}
          setPhoneNumber={setPhoneNumber}
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

export default SignUp;
