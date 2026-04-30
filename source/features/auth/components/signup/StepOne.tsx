import React from 'react';
import { GoogleSignUp } from './GoogleSignUp';
import { Link } from 'react-router';
import { isValidEmail } from '@/utils/utils';
import { supabase } from '@/lib/supabase';
import { Eye, EyeOff } from 'lucide-react';

type StepOneProps = {
  methodSelected: string | null;
  nextStep: () => void;
  setMethodSelected: React.Dispatch<React.SetStateAction<string | null>>;
  email: string;
  phoneNumber: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
};

const StepOne: React.FC<StepOneProps> = ({
  methodSelected,
  nextStep,
  email,
  setEmail,
  setPhoneNumber,
}) => {
  const [error, setError] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setError('');

    if (methodSelected !== 'Email Address') {
      setError('Phone verification is not yet supported');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    const { error: sbError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${import.meta.env.VITE_FRONTEND_URL || window.location.origin}/onboarding`,
      },
    });
    setIsLoading(false);

    if (sbError) {
      setError(sbError.message || 'An error occurred during sign-up');
      return;
    }

    localStorage.setItem('pendingEmail', email);
    nextStep();
  };

  return (
    <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
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

        <GoogleSignUp/>

        <div className="relative text-gray-500 my-4 flex items-center justify-center">
          <span className="bg-white px-2">Or</span>
        </div>

        <div className="space-y-2 text-[#999999]">
          <p className="text-red-500">{error}</p>
          {/* <p className="text-left">Register with</p>
          <CustomDropdown
            methodSelected={methodSelected}
            setMethodSelected={setMethodSelected}
          /> */}

          {methodSelected === 'Email Address' ? (
            <div className="space-y-3">
              <label className="cursor-pointer flex flex-col items-start gap-2">
                Email
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-3 border border-[#1D5C5C] rounded-md flex justify-between items-center"
                  required
                />
              </label>
              <label className="cursor-pointer flex flex-col items-start gap-2">
                Password
                <div className="relative w-full">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password (min. 8 characters)"
                    className="w-full p-3 border border-[#1D5C5C] rounded-md"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>
            </div>
          ) : (
            <div>
              <label className="cursor-pointer flex flex-col items-start gap-2">
                Enter mobile Number
                <input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  // type="number"
                  name="phoneNumber"
                  minLength={11}
                  placeholder="+2348123456789"
                  className="w-full p-3 border  border-[#1D5C5C] rounded-md flex justify-between items-center"
                  required
                />
              </label>
            </div>
          )}

          <p className=" text-[14px] text-left">
            By clicking "Proceed" you agree to our{' '}
            <span className="text-[#1D5C5C]">Terms of Service</span>.
          </p>
        </div>

        <button
          onClick={handleSignUp}
          disabled={isLoading}
          type="button"
          className="w-full p-3 mx-auto bg-[#1D5C5C] text-white font-semibold rounded-md flex items-center justify-center gap-2 mt-4"
        >
          {isLoading ? 'Sending verification...' : 'Continue'}
        </button>

        <p className="text-gray-500 text-[14px]">
          Already have an account?
          <Link to="/login">
            <span className="text-[#1D5C5C]">Log in</span>
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
export default StepOne;
