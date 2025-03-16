import { useSignUp } from '@clerk/clerk-react';
import React from 'react';
import { IoReload } from 'react-icons/io5';

const StepTwoResendButton = () => {
  const [resendDisabled, setResendDisabled] = React.useState(false);

  const { signUp } = useSignUp();

  const handleResend = async () => {
    if (resendDisabled) return;

    setResendDisabled(true);
    setTimeout(() => setResendDisabled(false), 120000); // 2-minute cooldown

    try {
      await signUp?.preparePhoneNumberVerification();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={handleResend}
      disabled={resendDisabled}
      className="w-full max-w-[422px] p-3 mx-auto bg-[#73007179] text-white font-semibold rounded-md flex items-center justify-center gap-2 mt-4"
    >
      <IoReload />
      Resend
    </button>
  );
};

export default StepTwoResendButton;
