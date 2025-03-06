import React from "react";
import OTPInput from "./OTPInput";

type StepThreeProps = {
  nextStep: () => void;
  methodSelected: string | null;
};

const StepThree: React.FC<StepThreeProps> = ({ nextStep, methodSelected }) => {
  const [otp, setOtp] = React.useState<string[]>(new Array(6).fill(""));
  return (
    <div className='relative w-1/2 flex flex-col items-center justify-center p-8'>
      <p className='text-gray-500 text-sm mb-2 fixed top-4 right-4'>
        STEP 03/04
      </p>
      <div className='w-full max-w-md space-y-6 text-center'>
        {methodSelected === "Sign Up with Email" ? (
          <div>
            <h2 className='text-[36px] font-bold mb-4'>Email Verification</h2>
            <p className='text-[#313131] mb-6'>
              A verification link has been sent to your email, please check your
              inbox to continue
            </p>
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
          className='w-full max-w-[422px] p-3 mx-auto bg-[#730071] text-white font-semibold rounded-md flex items-center justify-center gap-2 mt-4'
        >
          Continue
        </button>
        {methodSelected === "Sign Up with Email" ? (
          <p>
            If you didn’t receive a link!{" "}
            <span className='text-red-500'>Resend</span>
          </p>
        ) : (
          <p>
            If you didn’t receive a code!{" "}
            <span className='text-red-500'>Resend</span>
          </p>
        )}
      </div>
    </div>
  );
};
export default StepThree;
