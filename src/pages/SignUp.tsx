import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const SignUp: React.FC = () => {
  return (
    <div className='flex h-screen'>
      {/* Left Side - Image Section */}
      <div className='w-1/2 h-full relative'>
        <img
          src='/authsidepane.png'
          alt='Signup Background'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-purple-900 opacity-50'></div>
      </div>

      {/* Right Side - Signup Section */}
      <div className='relative w-1/2 flex flex-col items-center justify-center p-8'>
        <p className='text-gray-500 text-sm mb-2 fixed top-4 right-4'>STEP 01/04</p>
        <div className='w-full max-w-md text-center'>
          <h2 className='text-2xl font-semibold mb-4'>Create Your Account</h2>
          <p className='text-gray-600 mb-6'>
            Choose your preferred method to get started
          </p>

          <select className='w-full p-3 border border-purple-500 rounded-md mb-4'>
            <option>Select</option>
            <option>Sign Up with Email</option>
            <option>Sign Up with Phone Number</option>
          </select>

          <div className='relative text-gray-500 my-4 flex items-center justify-center'>
            <span className='bg-white px-2'>Or</span>
          </div>

          <button className='w-full p-3 border border-gray-300 rounded-md flex items-center justify-center gap-2 mb-3'>
            <span>Sign Up with Google</span>
            <FcGoogle className='w-5 h-5' />
          </button>

          <button className='w-full p-3 border border-gray-300 rounded-md flex items-center justify-center gap-2'>
            <span>Sign Up with Facebook</span>
            <FaFacebook className='w-5 h-5 text-blue-600' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
