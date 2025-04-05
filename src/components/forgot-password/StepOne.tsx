import React from 'react';

type StepOneProps = {
  nextStep: () => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export default function StepOne({ nextStep, setEmail }: StepOneProps) {
  return (
    <div className="relative w-1/2 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="text-left w-full max-w-[342px] ">
          <h2 className="text-[20px] font-semibold mb-4">Forgot Password</h2>
          <p className="text-[#999] mb-6">
            Enter your registered email, we’II send you a reset link
          </p>
        </div>
        <div>
          <label className="cursor-pointer text-[#999] flex flex-col items-start gap-2">
            Enter email address
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border  border-[#730071] rounded-md flex justify-between items-center"
            />
          </label>
        </div>

        <button
          onClick={nextStep}
          className="w-full p-3 mx-auto bg-[#730071] text-white font-semibold rounded-md flex items-center justify-center gap-2 mt-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
