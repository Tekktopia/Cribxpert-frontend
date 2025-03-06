import React, { useState } from "react";
import StepOne from "../components/sign-up/StepOne";
import StepTwo from "../components/sign-up/StepTwo";
import StepThree from "../components/sign-up/StepThree";

const SignUp: React.FC = () => {
  const [step, setStep] = useState(1);
  const [methodSelected, setMethodSelected] = useState<string | null>(null);

  //Necessary onboarding info
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  console.log(email, phoneNumber);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };


  return (
    <div className='flex h-screen'>
      {/* Left Side - Image Section */}
      <div className='w-1/2 h-full relative'>
        <img
          src='/authsidepane.png'
          alt='Signup Background'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-[#73007166] opacity-50'></div>
      </div>

      {/* Right Side - Signup Section */}
      {step === 1 && (
        <StepOne
          nextStep={nextStep}
          methodSelected={methodSelected}
          setMethodSelected={setMethodSelected}
        />
      )}
      {step === 2 && (
        <StepTwo
          nextStep={nextStep}
          methodSelected={methodSelected}
          setEmail={setEmail}
          setPhoneNumber={setPhoneNumber}
        />
      )}
      {step === 3 && (
        <StepThree nextStep={nextStep} methodSelected={methodSelected} />
      )}
    </div>
  );
};

export default SignUp;
