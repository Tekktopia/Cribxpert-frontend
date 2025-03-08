import React from 'react';
import { FcGoogle } from 'react-icons/fc';
// import { FaFacebook } from "react-icons/fa";
import CustomDropdown from './CustomDropdown';

type StepOneProps = {
  nextStep: () => void;
  methodSelected: string | null;
  setMethodSelected: React.Dispatch<React.SetStateAction<string | null>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
};

const StepOne: React.FC<StepOneProps> = ({
  nextStep,
  methodSelected,
  setMethodSelected,
  setEmail,
  setPhoneNumber,
}) => {
  return (
    <div className="relative w-1/2 flex flex-col items-center justify-center p-8">
      <p className="text-gray-500 text-sm mb-2 fixed top-4 right-4">
        STEP 01/04
      </p>
      <div className="w-full max-w-md text-center space-y-6">
        <div className="text-left w-full max-w-[342px] ">
          <h2 className="text-[20px] font-semibold mb-4">
            Create Your Account
          </h2>
          <p className="text-[#313131] mb-6">
            Choose your preferred method to get started
          </p>
        </div>

        <button className="w-full p-3 border border-gray-300 text-[#730071] font-semibold rounded-md flex items-center justify-center gap-2 mb-3">
          <span>Sign Up with Google</span>
          <FcGoogle className="w-5 h-5" />
        </button>

        <div className="relative text-gray-500 my-4 flex items-center justify-center">
          <span className="bg-white px-2">Or</span>
        </div>

        <div className="space-y-2 text-[#999999]">
          <p className="text-left">Register with</p>
          <CustomDropdown
            nextStep={nextStep}
            methodSelected={methodSelected}
            setMethodSelected={setMethodSelected}
          />

          {methodSelected === 'Email Address' ? (
            <div>
              <label className="cursor-pointer flex flex-col items-start gap-2">
                Email
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-3 border  border-[#730071] rounded-md flex justify-between items-center"
                />
              </label>
            </div>
          ) : (
            <div>
              <label className="cursor-pointer flex flex-col items-start gap-2">
                Phone Number
                <input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your Phone Number"
                  className="w-full p-3 border  border-[#730071] rounded-md flex justify-between items-center"
                />
              </label>
            </div>
          )}
          <p className=" text-[14px] text-left">
            By clicking "Proceed" you agree to our{' '}
            <span className="text-[#730071]">Terms of Service</span>.
          </p>
        </div>
        {/* <button className='w-full p-3 border border-gray-300 text-[#730071] font-semibold rounded-md flex items-center justify-center gap-2'>
          <span>Sign Up with Facebook</span>
          <FaFacebook className='w-5 h-5 text-blue-600' />
        </button> */}

        <button
          onClick={nextStep}
          className="w-full p-3 mx-auto bg-[#730071] text-white font-semibold rounded-md flex items-center justify-center gap-2 mt-4"
        >
          Continue
        </button>
        <p className="text-gray-500 text-[14px]">
          Already have an account?
          <span className="text-[#730071]">Log in</span>.
        </p>
      </div>
    </div>
  );
};
export default StepOne;
