import { useSignUp } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { IoReload } from 'react-icons/io5';

type Props = {
  methodSelected: string | null;
  handleVerify: () => void;
};
const StepTwoResendButton = ({ methodSelected, handleVerify }: Props) => {
  const [resendDisabled, setResendDisabled] = React.useState(false);
  const { signUp } = useSignUp();

  const [timeLeft, setTimeLeft] = useState(120); // Countdown from 60 seconds

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleResend = async () => {
    if (resendDisabled) return;

    setResendDisabled(true);
    setTimeout(() => setResendDisabled(false), 120000); // 2-minute cooldown

    try {
      if (methodSelected === 'Email Address') {
        await signUp?.prepareEmailAddressVerification({
          strategy: 'email_link',
          redirectUrl: 'http://localhost:5173/onboarding',
        }); // Sends verification email
      } else {
        await signUp?.preparePhoneNumberVerification();
        setTimeLeft(120);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <>
      {methodSelected !== 'Email Address' ? (
        <div>
          <button
            onClick={handleVerify}
            className="w-full max-w-[422px] p-3 mx-auto bg-[#1D5C5C] text-white font-semibold rounded-md flex items-center justify-center gap-2 mt-4"
          >
            Proceed
          </button>

          <button
            onClick={handleResend}
            disabled={resendDisabled}
            className="text-center w-full text-[14px] text-[#999999] mt-2 flex items-center justify-center gap-3"
          >
            <IoReload />
            Resend Link: {timeLeft > 0 ? formatTime(timeLeft) : ''}
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleResend}
            disabled={resendDisabled}
            className="w-full max-w-[422px] p-3 mx-auto bg-[#73007191] text-white text-[14px] rounded-md flex items-center justify-center gap-2 mt-4"
          >
            <IoReload />
            Resend Link: {timeLeft > 0 ? formatTime(timeLeft) : ''}
          </button>
        </div>
      )}
    </>
  );
};

export default StepTwoResendButton;
