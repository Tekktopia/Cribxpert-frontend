import React, { useState } from 'react';
import StepOne from '@/components/sign-up/StepOne';
// import StepFour from '@/components/sign-up/StepFour';
import StepTwoMain from '@/components/sign-up/StepTwoMain';
import { useSignUp } from '@clerk/clerk-react';

const SignUpPage: React.FC = () => {
  const {
    signUp,
    // setActive,
    // isLoaded
  } = useSignUp();

  const [step, setStep] = useState(1);
  const [methodSelected, setMethodSelected] = useState<string | null>(
    'Email Address'
  );

  //Necessary onboarding info
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  //   const [code, setCode] = useState(""); // For email verification
  //   const [pendingVerification, setPendingVerification] = useState(false);
  //   const [error, setError] = useState('');

  //   console.log(email, phoneNumber, password);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (methodSelected === 'Email Address') {
        if (!email || !password) {
          throw new Error('Email and password are required');
        }
        // const result =
        await signUp?.create({ emailAddress: email, password });
        // console.log(result);

        await signUp?.prepareEmailAddressVerification({
          strategy: 'email_link',
          redirectUrl: 'http://localhost:5173/onboarding',
        }); // Sends verification email
      } else {
        if (!phoneNumber || !password) {
          throw new Error('Phone number and password are required');
        } else if (phoneNumber.length < 11 || phoneNumber.length > 11) {
          throw new Error('Phone number must be 11 digits');
        }

        await signUp?.create({ phoneNumber, password });
        await signUp?.preparePhoneNumberVerification(); // Sends verification code
      }

      //   setPendingVerification(true);

      nextStep();
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('An unknown error occurred');
      }
    }
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
          handleSignUp={handleSignUp}
          methodSelected={methodSelected}
          setMethodSelected={setMethodSelected}
          setEmail={setEmail}
          setPhoneNumber={setPhoneNumber}
          setPassword={setPassword}
        />
      )}

      {step === 2 && (
        <StepTwoMain
          methodSelected={methodSelected}
          email={email}
        />
      )}

      {/* {step === 3 && <StepFour formData={formData} setFormData={setFormData} />} */}
    </div>
  );
};

export default SignUpPage;
