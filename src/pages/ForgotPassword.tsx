import StepOne from '@/components/forgot-password/StepOne';
import StepTwoMain from '@/components/sign-up/StepTwoMain';
import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const [methodSelected, setMethodSelected] = useState<string | null>(
    'Email Address'
  );
  const [error, setError] = useState("")

  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // console.log(email);

  const { signIn } = useSignIn();

  const requestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (methodSelected === 'Email Address') {
        await signIn?.create({
          strategy: 'email_link', // Use magic link strategy
          identifier: email,
          redirectUrl: 'http://localhost:5173/reset-password', // Redirect to reset-password page after clicking the link
        });
      } else if (methodSelected === 'Phone Number') {
        await signIn?.create({
          strategy: 'reset_password_phone_code',
          identifier: phoneNumber,
        });
      }
      nextStep();
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        console.error('Error requesting password reset: ', err.message);
        setError(err.message)
      }
    }
  };

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
          methodSelected={methodSelected}
          setMethodSelected={setMethodSelected}
          email={email}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setEmail={setEmail}
          requestReset={requestReset}
          error={error}
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
