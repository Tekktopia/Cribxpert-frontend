import React from "react";
import OTPInput from "./OTPInput";
import { IoReload } from "react-icons/io5";

type StepTwoMainProps = {
  nextStep: () => void;
  methodSelected: string | null;
  email: string;
};

const StepTwoMain: React.FC<StepTwoMainProps> = ({
  nextStep,
  methodSelected,
  email,
}) => {
  const [otp, setOtp] = React.useState<string[]>(new Array(6).fill(""));
  return (
    <div className='relative w-1/2 flex flex-col items-center justify-center p-8'>
      <p className='text-gray-500 text-sm mb-2 fixed top-4 right-4'>
        STEP 03/04
      </p>
      <div className='w-full max-w-md space-y-6 text-center'>
        {methodSelected === "Email Address" ? (
          <div>
            <h2 className='text-[20px] font-bold mb-4'>Verification</h2>
            <p className='text-[#313131] mb-6 text-[14px]'>
              We've sent a verification link to your email{" "}
              {email.slice(0, 3) +
                "****" +
                email.slice(email.length - 10, email.length)}
              . Check your inbox for your account verification link. If you
              haven't received the verification link, click the button to resend
              another link.
            </p>
            <img src="/gmail-icon.png" className="mx-auto"/>
          </div>
        ) : (
          <div>
            <h2 className='text-[36px] font-bold mb-4'>
              Phone Number Verification
            </h2>
            <p className='text-[#313131] mb-6'>
              Enter the 6 digit code we sent to your phone
            </p>

            <OTPInput otp={otp} setOtp={setOtp} />
          </div>
        )}

        <button
          onClick={nextStep}
          className='w-full max-w-[422px] p-3 mx-auto bg-[#73007179] text-white font-semibold rounded-md flex items-center justify-center gap-2 mt-4'
        >
          <IoReload/>
          Resend
        </button>
      </div>
    </div>
  );
};
export default StepTwoMain;
