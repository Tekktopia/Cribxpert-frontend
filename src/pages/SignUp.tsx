import React, { useState } from 'react';
import StepOne from '@/components/sign-up/StepOne';
import StepFour from '@/components/sign-up/StepFour';
import StepTwoMain from '@/components/sign-up/StepTwoMain';

const SignUp: React.FC = () => {
  const [step, setStep] = useState(1);
  const [methodSelected, setMethodSelected] = useState<string | null>(
    'Email Address'
  );

  //Necessary onboarding info
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  console.log(email, phoneNumber);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image Section */}
      <div className="w-1/2 h-full relative">
        <img
          src={`${'/authsidepane' + step + '.png'}`}
          alt="Signup Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#73007166] opacity-50"></div>
      </div>

      {/* Right Side - Signup Section */}
      {step === 1 && (
        <StepOne
          nextStep={nextStep}
          methodSelected={methodSelected}
          setMethodSelected={setMethodSelected}
          setEmail={setEmail}
          setPhoneNumber={setPhoneNumber}
        />
      )}

      {step === 2 && (
        <StepTwoMain
          nextStep={nextStep}
          methodSelected={methodSelected}
          email={email}
        />
      )}

      {step === 3 && <StepFour />}
    </div>
  );
};

export default SignUp;
