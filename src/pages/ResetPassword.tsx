import React, { useState } from "react";
import { EyeOff, Eye, CheckCircle, XCircle } from "lucide-react";

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Password validation
  const passwordCriteria = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /\d/.test(formData.password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };
  return (
    <div className='flex h-screen'>
      {/* Left Side - Image Section */}
      <div className='w-1/2 h-full relative'>
        <img
          src='/authsidepane.png'
          alt='Login Background'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-[#73007166] opacity-50'></div>
      </div>

      {/* Right Side - Login Section*/}
      <div className='relative w-1/2 flex flex-col items-center justify-center p-8'>
        <div className='w-full max-w-md text-center space-y-2'>
          <h2 className='text-[36px] font-bold mb-4'>Reset Password</h2>

          <div className='space-y-6'>
            <p className='text-[#313131] mb-6'>
              Enter a new password to reset your account
            </p>

            {/* Password */}
            <div className='relative'>
              <label className='block text-left text-gray-700 font-medium mb-1'>
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter your password'
                className='w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#730071]'
              />
              {showPassword ? (
                <EyeOff
                  className='absolute right-3 top-10 text-gray-500 w-5 h-5 cursor-pointer'
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <Eye
                  className='absolute right-3 top-10 text-gray-500 w-5 h-5 cursor-pointer'
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>

            {/* Password */}
            <div className='relative'>
              <label className='block text-left text-gray-700 font-medium mb-1'>
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter your password'
                className='w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#730071]'
              />
              {showPassword ? (
                <EyeOff
                  className='absolute right-3 top-10 text-gray-500 w-5 h-5 cursor-pointer'
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <Eye
                  className='absolute right-3 top-10 text-gray-500 w-5 h-5 cursor-pointer'
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>

            {/* Password Requirements */}
            <ul className='text-sm grid grid-cols-2 mt-2'>
              {Object.entries(passwordCriteria).map(([key, met]) => (
                <li
                  key={key}
                  className={`flex items-center gap-2 ${met ? "text-green-500" : "text-gray-500"}`}
                >
                  {met ? <CheckCircle size={16} /> : <XCircle size={16} />}{" "}
                  {key === "length" && "Use 8+ characters"}
                  {key === "uppercase" && "Use upper & lower case letters"}
                  {key === "number" && "Use a number (e.g., 1234)"}
                  {key === "symbol" && "Use a symbol (e.g., !@#$)"}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button className='w-full max-w-[422px] p-3 mx-auto bg-[#730071] text-white font-semibold rounded-md flex items-center justify-center gap-2 mt-12'>
          Continue
        </button>

        <p className="mt-6">
          If you didn’t receive a link!{" "}
          <span className='text-red-500'>Resend</span>
        </p>
      </div>
    </div>
  );
};
export default ResetPassword;
