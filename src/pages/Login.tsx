import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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

      {/* Right Side - Login Section */}
      <div className="relative w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-[512px] text-center space-y-6">
          <h2 className="text-[36px] font-bold mb-4">Login</h2>
          <p className="text-[#313131] mb-6">
            Enter your registered email or phone number to log in
          </p>

          {/* Email */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#730071]"
            />
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
              placeholder="Enter your password"
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
          <Link to="/">
            <button className="w-full mx-auto mt-8 max-w-[422px] p-3 bg-[#730071] text-white font-semibold rounded-md flex items-center justify-center gap-2">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
