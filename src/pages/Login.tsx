import CustomDropdown from '@/components/sign-up/CustomDropdown';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import GoogleSignIn from '@/components/login/GoogleSignIn';
import { useDispatch } from 'react-redux';
import {
  clearError,
  setIsAuthenticated,
  setUser,
  useLoginMutation,
} from '@/features/auth';
import { isValidEmail } from '@/utils/utils';
import AuthLeftSide from '@/components/common/AuthLeftSide';

const Login: React.FC = () => {
  const [login, { isLoading, error: loginError }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
  });

  useEffect(() => {
    if (loginError) {
      if ('data' in loginError) {
        setError(
          typeof loginError.data === 'object' &&
            loginError.data !== null &&
            'message' in loginError.data
            ? (loginError.data as { message?: string }).message ||
                'Login failed. Please try again.'
            : 'Login failed. Please try again.'
        );
      } else {
        setError('Network error. Please check your connection.');
      }
    }

    // Clear error when component unmounts
    return () => {
      dispatch(clearError());
    };
  }, [loginError, dispatch]);

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
    setError('');

    const identifier =
      methodSelected === 'Email Address'
        ? formData.email
        : formData.phoneNumber;

    if (!identifier) {
      setError(
        `${
          methodSelected === 'Email Address' ? 'Email' : 'Phone number'
        } is required`
      );
      return;
    }

    // Add email validation check
    if (methodSelected === 'Email Address' && !isValidEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!formData.password) {
      setError('Password is required');
      return;
    }

    const result = await login({
      identifier,
      password: formData.password,
    }).unwrap();

    if (result) {
      // Store the access token in sessionStorage
      if (result.accessToken) {
        sessionStorage.setItem('token', result.accessToken);

        setIsAuthenticated(true);

        // store user data if needed
        if (result.user) {
          setUser(result.user);
        }
      }

      navigate('/'); // Redirect to home after successful login
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image Section */}
      <AuthLeftSide />

      {/* Right Side - Login Section */}
      <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-[512px] text-center space-y-6">
          <div className="text-left w-full max-w-[342px] ">
            <h2 className="text-[20px] font-semibold mb-4">Login</h2>
            <p className="text-[#313131] mb-6">
              Enter your registered email or phone number to log in
            </p>
          </div>

          <div className="w-full max-h-[70vh] overflow-y-auto scrollbar-hide">
            <GoogleSignIn setError={setError} />

            <div className="relative text-gray-500 my-2 flex items-center justify-center">
              <span className="bg-white px-2">Or</span>
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
                className="w-full mx-auto mt-8 p-3 bg-[#1D5C5C] text-white font-semibold rounded-md flex items-center justify-center gap-2"
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
