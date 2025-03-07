import React from 'react';
import { Link } from 'react-router';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = React.useState('');
  console.log(email);
  return (
    <div className="flex h-screen">
      {/* Left Side - Image Section */}
      <div className="w-1/2 h-full relative">
        <img
          src="/authsidepane.png"
          alt="Login Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#73007166] opacity-50"></div>
      </div>

      {/* Right Side - Login Section*/}
      <div className="relative w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md text-center space-y-6">
          <h2 className="text-[36px] font-bold mb-4">Forgot Password</h2>

          <div>
            <p className="text-[#313131] mb-6">
              Enter your registered email, we’II send you a reset link
            </p>

            <label className="cursor-pointer flex flex-col items-start gap-2">
              Email
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border  border-[#730071] rounded-md flex justify-between items-center"
              />
            </label>
          </div>

          <Link to="/reset-password">
            <button className="w-full max-w-[422px] p-3 mx-auto bg-[#730071] text-white font-semibold rounded-md flex items-center justify-center gap-2 mt-4">
              Continue
            </button>
          </Link>

          <p>
            If you didn’t receive a link!{' '}
            <span className="text-red-500">Resend</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
