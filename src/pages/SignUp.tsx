import React, { useState } from 'react';
import StepOne from '@/components/sign-up/StepOne';
import StepTwoMain from '@/components/sign-up/StepTwoMain';

const SignUp: React.FC = () => {
  const [step, setStep] = useState(1);
  const [methodSelected, setMethodSelected] = useState<string | null>(
    'Email Address'
  );

  //Necessary onboarding info
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image Section */}
      <div className="w-1/2 hidden sm:block h-full relative">
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
          email={email}
          phoneNumber={phoneNumber}
          password={password}
          setEmail={setEmail}
          setPhoneNumber={setPhoneNumber}
          setPassword={setPassword}
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
