import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import CustomDropdown from "./CustomDropdown";

type StepOneProps = {
  nextStep: () => void;
  methodSelected: string | null;
  setMethodSelected: React.Dispatch<React.SetStateAction<string | null>>;
};

const StepOne: React.FC<StepOneProps> = ({
  nextStep,
  methodSelected,
  setMethodSelected,
}) => {
  return (
    <div className='relative w-1/2 flex flex-col items-center justify-center p-8'>
      <p className='text-gray-500 text-sm mb-2 fixed top-4 right-4'>
        STEP 01/04
      </p>
      <div className='w-full max-w-md text-center'>
        <h2 className='text-[36px] font-bold mb-4'>Create Your Account</h2>
        <p className='text-[#313131] mb-6'>
          Choose your preferred method to get started
        </p>

        <CustomDropdown
          nextStep={nextStep}
          methodSelected={methodSelected}
          setMethodSelected={setMethodSelected}
        />

        <div className='relative text-gray-500 my-4 flex items-center justify-center'>
          <span className='bg-white px-2'>Or</span>
        </div>

        <button className='w-full p-3 border border-gray-300 text-[#730071] font-semibold rounded-md flex items-center justify-center gap-2 mb-3'>
          <span>Sign Up with Google</span>
          <FcGoogle className='w-5 h-5' />
        </button>

        <button className='w-full p-3 border border-gray-300 text-[#730071] font-semibold rounded-md flex items-center justify-center gap-2'>
          <span>Sign Up with Facebook</span>
          <FaFacebook className='w-5 h-5 text-blue-600' />
        </button>
      </div>
    </div>
  );
};
export default StepOne;
