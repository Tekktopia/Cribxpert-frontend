// import React from 'react'

import { IoReload } from 'react-icons/io5';

type StepTwoProps = {
  email: string;
};

export default function StepTwo({ email }: StepTwoProps) {
  return (
    <div className="relative w-1/2 flex flex-col items-center justify-center p-8">
      <p className="text-gray-500 text-sm mb-2 fixed top-4 right-4">
        STEP 02/03
      </p>
      <div className="w-full max-w-md space-y-6 text-center">
        <div>
          <h2 className="text-[20px] font-bold mb-4">Verification</h2>
          <p className="text-[#999999] mb-6 text-[14px]">
            We've sent a verification link to your email (
            {email.slice(0, 3) +
              '****' +
              email.slice(email.length - 10, email.length)}
            ) . Check your inbox for your account verification link. If you
            haven't received the verification link, click the button to resend
            another link.
          </p>
          <img src="/gmail-icon.png" className="mx-auto" />
        </div>
      </div>
      <button className="w-full max-w-[422px] p-3 mx-auto bg-[#730071] text-white font-semibold rounded-md flex items-center justify-center gap-2 mt-4">
        <IoReload />
        Resend Reset Password Link
      </button>
    </div>
  );
}
