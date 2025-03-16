import React from 'react';
import OTPInput from './OTPInput';
import { useSignUp } from '@clerk/clerk-react';
import StepTwoResendButton from './StepTwoResendButton';

type StepTwoMainProps = {
  methodSelected: string | null;
  email: string;
  phoneNumber: string;
};

const StepTwoMain: React.FC<StepTwoMainProps> = ({
  methodSelected,
  email,
  phoneNumber,
}) => {
  const { signUp, setActive } = useSignUp();
  const [otp, setOtp] = React.useState<string[]>(new Array(6).fill(''));
  const [code, setCode] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const handleVerify = async () => {
    try {
      setCode(otp.join(''));
      const completeSignUp = await signUp?.attemptPhoneNumberVerification({
        code,
      });
      if (completeSignUp?.status === 'complete' && setActive) {
        await setActive({ session: completeSignUp.createdSessionId });
        window.location.href = '/onboarding'; // Redirect on success
      }
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        console.log(err.message);
        setError(err.message);
      } else {
        console.log('An unknown error occurred');
      }
    }
  };

  return (
    <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
      <p className="text-gray-500 text-sm mb-2 fixed top-4 right-4">
        STEP 03/04
      </p>
      <div className="w-full max-w-md space-y-6 text-center">
        {methodSelected === 'Email Address' ? (
          <div>
            <h2 className="text-[20px] font-bold mb-4">Verification</h2>
            <p className="text-[#313131] mb-6 text-[14px]">
              We've sent a verification link to your email{' '}
              {email.slice(0, 3) +
                '****' +
                email.slice(email.length - 10, email.length)}
              . Check your inbox for your account verification link. If you
              haven't received the verification link, click the button to resend
              another link.
            </p>
            <img src="/gmail-icon.png" className="mx-auto" />
          </div>
        ) : (
          <div>
            <h2 className="text-[20px] font-bold mb-4">Verification</h2>
            <div className="space-y-2  mb-6">
              <p className="text-[#999999] text-[14px]">
                We have sent an OTP code to{' '}
                {phoneNumber.slice(0, 3) +
                  '****' +
                  phoneNumber.slice(
                    phoneNumber.length - 3,
                    phoneNumber.length
                  )}
                , Please enter the OTP sent to this number below to confirm your
                account. . If you haven't received the OTP, click on the resend
                code to get another OTP
              </p>
              <p className="text-red-500">{error}</p>
            </div>

            <OTPInput otp={otp} setOtp={setOtp} />
          </div>
        )}

        <StepTwoResendButton
          methodSelected={methodSelected}
          handleVerify={handleVerify}
        />
      </div>
    </div>
  );
};
export default StepTwoMain;
