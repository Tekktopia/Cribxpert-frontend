import CustomDropdown from '@/components/sign-up/CustomDropdown';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router';
import { useSignIn } from '@clerk/clerk-react';
import { SignInResource } from '@clerk/types';

const Login: React.FC = () => {
  const { signIn, isLoaded } = useSignIn();
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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [methodSelected, setMethodSelected] = useState<string | null>(
    'Email Address'
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      let result: SignInResource;

      if (methodSelected === 'Phone Number') {
        if (!formData.phoneNumber) {
          setError('Phone number is required');
          return;
        }

        result = await signIn.create({
          identifier: formData.phoneNumber,
          password: formData.password,
        });
      } else {
        if (!formData.email) {
          setError('Email is required');
          return;
        }

        result = await signIn.create({
          identifier: formData.email,
          password: formData.password,
        });
      }

      if (result && result.status === 'complete') {
        window.location.href = '/'; // Redirect to onboarding after login
      }
    } catch (err) {
      console.log(err);
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image Section */}
      <div className="w-1/2 h-full relative">
        <img
          src="/authsidepane2.png"
          alt="Login Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#73007166] opacity-50"></div>
      </div>

      {/* Right Side - Login Section */}
      <div className="relative w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-[512px] text-center space-y-6">
          <div className="text-left w-full max-w-[342px] ">
            <h2 className="text-[20px] font-semibold mb-4">Login</h2>
            <p className="text-[#313131] mb-6">
              Enter your registered email or phone number to log in
            </p>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Login with Email or Phone Number */}
            <div className="space-y-2 text-[#999999]">
              <p className="text-left">Login with</p>
              <CustomDropdown
                methodSelected={methodSelected}
                setMethodSelected={setMethodSelected}
              />

              {methodSelected === 'Email Address' ? (
                <div>
                  <label className="cursor-pointer flex flex-col items-start gap-2">
                    Email
                    <input
                      name="email"
                      onChange={handleChange}
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
                      name="phoneNumber"
                      onChange={handleChange}
                      placeholder="Enter your Phone Number"
                      className="w-full p-3 border  border-[#730071] rounded-md flex justify-between items-center"
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#730071]"
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
                  className="mr-2 accent-[#730071]"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-[#730071]">
                Forgot Password?
              </Link>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mx-auto mt-8 p-3 bg-[#730071] text-white font-semibold rounded-md flex items-center justify-center gap-2"
            >
              Login
            </button>
          </form>
          {/* Sign Up Link */}
          <p className="text-gray-500 text-[14px]">
            Don't have an account?
            <Link to="/sign-up">
              <span className="text-[#730071]">Sign up</span>
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
