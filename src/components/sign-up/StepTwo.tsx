import React from "react";

type StepTwoProps = {
  nextStep: () => void;
  methodSelected: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
};

const StepTwo: React.FC<StepTwoProps> = ({
  nextStep,
  setEmail,
  setPhoneNumber,
  methodSelected,
}) => {
  return (
    <div className='relative w-1/2 flex flex-col items-center justify-center p-8'>
      <p className='text-gray-500 text-sm mb-2 fixed top-4 right-4'>
        STEP 02/04
      </p>
      <div className='w-full max-w-md text-center'>
        <h2 className='text-[36px] font-bold mb-4'>Create Your Account</h2>
        {methodSelected === "Sign Up with Email" ? (
          <div>
            <p className='text-[#313131] mb-6'>
              Input your email to get started
            </p>

            <label className='cursor-pointer flex flex-col items-start gap-2'>
              Email
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
                className='w-full p-3 border  border-[#730071] rounded-md flex justify-between items-center'
              />
            </label>
          </div>
        ) : (
          <div>
            <p className='text-[#313131] mb-6'>
              Input your Phone Number to get started
            </p>

            <label className='cursor-pointer flex flex-col items-start gap-2'>
              Phone Number
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder='Enter your Phone Number'
                className='w-full p-3 border  border-[#730071] rounded-md flex justify-between items-center'
              />
            </label>
          </div>
        )}

        <button
          onClick={nextStep}
          className='w-full max-w-[422px] p-3 mx-auto bg-[#730071] text-white font-semibold rounded-md flex items-center justify-center gap-2 mt-4'
        >
          Continue
        </button>
      </div>
    </div>
  );
};
export default StepTwo;
