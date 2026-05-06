import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import GoogleSignIn from '@/features/auth/components/login/GoogleSignIn';
import { isValidEmail } from '@/utils/utils';
import AuthLeftSide from '@/features/auth/components/AuthLeftSide';
import { supabase } from '@/lib/supabase';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const [methodSelected] = useState<string | null>('Email Address');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const identifier =
      methodSelected === 'Email Address' ? formData.email : formData.phoneNumber;

    if (!identifier) {
      setError(`${methodSelected === 'Email Address' ? 'Email' : 'Phone number'} is required`);
      return;
    }
    if (methodSelected === 'Email Address' && !isValidEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!formData.password) {
      setError('Password is required');
      return;
    }

    setIsLoading(true);
    const { error: sbError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    setIsLoading(false);

    if (sbError) {
      setError(sbError.message || 'Login failed. Please try again.');
      return;
    }

    // authListener fires onAuthStateChange → dispatches setSession → Redux updates
    navigate('/');
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image Section */}
      <AuthLeftSide />

      {/* Right Side - Login Section */}
      <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        {/* Back to Website Button */}
        <div className="absolute top-8 left-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 hover:text-primary transition-colors group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Website
          </Link>
        </div>

        <div className="w-full max-w-[512px] text-center space-y-6">
          <div className="text-left w-full max-w-[342px] ">
            <h2 className="text-[20px] font-semibold mb-4">Login</h2>
            <p className="text-[#313131] mb-6">
              Enter your registered email or phone number to log in
            </p>
          </div>

          <div className="w-full max-h-[70vh] overflow-y-auto scrollbar-hide">
            <GoogleSignIn />

            <div className="relative text-gray-500 my-2 flex items-center justify-center">
              <span className="bg-white px-2">Or</span>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Login with Email or Phone Number */}
              <div className="space-y-2 text-[#999999]">
                {/* <p className="text-left">Login with</p>
                <CustomDropdown
                  methodSelected={methodSelected}
                  setMethodSelected={setMethodSelected}
                /> */}

                {methodSelected === 'Email Address' ? (
                  <div>
                    <label className="cursor-pointer flex flex-col items-start gap-2">
                      Email
                      <input
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full p-3 border  border-[#1D5C5C] rounded-md flex justify-between items-center"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <label className="cursor-pointer flex flex-col items-start gap-2">
                      Phone Number
                      <input
                        name="phoneNumber"
                        onChange={handleChange}
                        placeholder="Enter your Phone Number"
                        className="w-full p-3 border  border-[#1D5C5C] rounded-md flex justify-between items-center"
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-left text-gray-700 font-medium mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#1D5C5C]"
                />
                {showPassword ? (
                  <EyeOff
                    className="absolute right-3 top-10 text-gray-500 w-5 h-5 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <Eye
                    className="absolute right-3 top-10 text-gray-500 w-5 h-5 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex justify-between items-center mt-2">
                <label className="block text-left text-gray-700 font-medium mb-1">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="mr-2 accent-[#1D5C5C]"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-[#1D5C5C]">
                  Forgot Password?
                </Link>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mx-auto mt-8 p-3 bg-primary hover:bg-hoverColor text-white font-semibold rounded-md flex items-center justify-center gap-2"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>

          {/* Sign Up Link */}
          <p className="text-gray-500 text-[14px]">
            Don't have an account?
            <Link to="/sign-up">
              <span className="text-[#1D5C5C]">Sign up</span>
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
