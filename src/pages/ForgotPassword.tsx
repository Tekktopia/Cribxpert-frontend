import StepOne from '@/components/forgot-password/StepOne';
import StepTwo from '@/components/forgot-password/StepTwo';
import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';
import { SignInResource } from '@clerk/types'; // Import the type

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const [methodSelected, setMethodSelected] = useState<string | null>(
    'Email Address'
  );
  const [error, setError] = useState('');

  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // console.log(email);

  const { signIn } = useSignIn();
  const [signInInstance, setSignInInstance] = useState<
    SignInResource | undefined
  >();

  const requestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!signIn) {
      setError('Sign-in instance not available.');
      return;
    }

    try {
      let response;
      if (methodSelected === 'Email Address') {
        response = await signIn.create({
          strategy: 'reset_password_email_code',
          identifier: email,
        });
      } else if (methodSelected === 'Phone Number') {
        response = await signIn.create({
          strategy: 'reset_password_phone_code',
          identifier: phoneNumber,
        });
      }

      if (response?.status === 'needs_first_factor') {
        setSignInInstance(response);
        nextStep(); // Move to Step Two
      } else {
        throw new Error('Failed to send OTP.');
      }
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        console.error('Error requesting password reset: ', err.message);
        setError(err.message);
      }
    }
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image Section */}
      <div className="w-1/2 hidden lg:block h-full relative">
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
        <StepTwo
          methodSelected={methodSelected}
          email={email}
          phoneNumber={phoneNumber}
          signIn={signInInstance}
        />
      )}
    </div>
  );
};
export default ForgotPassword;
