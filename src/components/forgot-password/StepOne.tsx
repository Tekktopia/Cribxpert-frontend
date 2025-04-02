import React from 'react';
import CustomDropdown from '../sign-up/CustomDropdown';

type StepOneProps = {
  methodSelected: string | null;
  setMethodSelected: React.Dispatch<React.SetStateAction<string | null>>;
  email: string;
  phoneNumber: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  requestReset: (e: React.FormEvent) => Promise<void>;
  error: string;
};

export default function StepOne({
  requestReset,
  setEmail,
  setPhoneNumber,
  methodSelected,
  setMethodSelected,
  error,
}: StepOneProps) {
  return (
    <div className="relative w-1/2 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="text-left w-full max-w-[342px] ">
          <h2 className="text-[20px] font-semibold mb-4">Forgot Password</h2>
          <p className="text-[#999] mb-6">
            Enter your registered email, we’II send you a reset link
          </p>
        </div>
        <CustomDropdown
          methodSelected={methodSelected}
          setMethodSelected={setMethodSelected}
        />
        {methodSelected === 'Email Address' ? (
          <div>
            <p className='text-[14px] text-red-500 text-left'>{error}</p>
            <label className="cursor-pointer flex flex-col items-start gap-2">
              Email
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border  border-[#730071] rounded-md flex justify-between items-center"
                required
              />
            </label>
          </div>
        ) : (
          <div>
            <label className="cursor-pointer flex flex-col items-start gap-2">
              Enter mobile Number
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="number"
                placeholder="07068839585"
                className="w-full p-3 border  border-[#730071] rounded-md flex justify-between items-center"
                required
              />
            </label>
            <p className='text-[14px] text-red-500 text-left'>{error}</p>
          </div>
        )}

        <button
          onClick={requestReset}
          className="w-full p-3 mx-auto bg-[#730071] text-white font-semibold rounded-md flex items-center justify-center gap-2 mt-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
