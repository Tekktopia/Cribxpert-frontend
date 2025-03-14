import React, {useRef } from 'react';

type OTPInputProps = {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
};
const OTPInput: React.FC<OTPInputProps> = ({ otp, setOtp }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus(); // Move to next input
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move to previous input on backspace
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            placeholder='-'
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-[44px] h-[46px] border bg-[#CCCCCC4D] text-center text-xl rounded-md focus:border-[#730071] outline-none"
          />
        ))}
      </div>
      
    </div>
  );
};

export default OTPInput;
