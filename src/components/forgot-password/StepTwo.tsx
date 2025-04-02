import React from 'react';
import OTPInput from '../sign-up/OTPInput';
import { SignInResource } from '@clerk/types'; // Import the type
import StepTwoResendButton from './StepTwoResendButton';
// import { useSignIn } from '@clerk/clerk-react';

type StepTwoProps = {
  methodSelected: string | null;
  email: string;
  phoneNumber: string;
  signIn: SignInResource | undefined; // Use the correct type for signIn
};

const StepTwo: React.FC<StepTwoProps> = ({ methodSelected, signIn }) => {
  const [error, setError] = React.useState<string>('');
  const [otp, setOtp] = React.useState<string[]>(new Array(6).fill(''));

  // ✅ Handles OTP verification for password reset
  const handleVerify = async () => {
    if (!signIn) {
      setError('Sign-in instance not available.');
      return;
    }

    if (methodSelected === 'Email Address') {
      await handleEmailVerification();
    } else if (methodSelected === 'Phone Number') {
      await handlePhoneNumberVerification();
    } else {
      setError('Invalid verification method selected.');
    }
  };

  // ✅ Verifies OTP for email-based password reset
  const handleEmailVerification = async () => {
    if (!signIn) {
      setError('Sign-in instance not available.');
      return;
    }

    try {
      const completeReset = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: otp.join(''),
      });

      if (completeReset?.status === 'needs_new_password') {
        window.location.href = '/reset-password'; // Redirect on success
      }
    } catch (err) {
      handleError(err);
    }
  };

  // ✅ Verifies OTP for phone number-based password reset
  const handlePhoneNumberVerification = async () => {
    if (!signIn) {
      setError('Sign-in instance not available.');
      return;
    }

    try {
      const completeReset = await signIn.attemptFirstFactor({
        strategy: 'reset_password_phone_code',
        code: otp.join(''),
      });

      if (completeReset?.status === 'needs_new_password') {
        window.location.href = '/reset-password'; // Redirect on success
      }
    } catch (err) {
      handleError(err);
    }
  };

  // ✅ Error handler
  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      console.error('Verification Error:', err.message);
      setError(err.message);
    } else {
      console.error('An unknown error occurred.');
      setError('An unknown error occurred. Please try again.');
    }
  };

  return (
    <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
      <p className="text-gray-500 text-sm mb-2 fixed top-4 right-4">
        STEP 03/04
      </p>
      <div className="w-full max-w-md space-y-6 text-center">
        <div>
          <h2 className="text-[20px] font-bold mb-4">Verification</h2>
          <div className="space-y-2 mb-6">
            <p className="text-[#999999] text-[14px]">
              We have sent an OTP code to you. Please enter the OTP received
              below to confirm your account. If you haven't received the OTP,
              click on the resend code to get another OTP.
            </p>
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <OTPInput otp={otp} setOtp={setOtp} />
        </div>

        <StepTwoResendButton
          methodSelected={methodSelected}
          handleVerify={handleVerify}
        />
      </div>
    </div>
  );
};

export default StepTwo;
