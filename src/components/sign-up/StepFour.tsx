import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompleteRegistrationMutation } from '@/features/auth/authService';

type FormData = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNo: string;
};
type StepFourProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const StepFour: React.FC<StepFourProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const [completeRegistration, { isLoading }] =
    useCompleteRegistrationMutation();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await completeRegistration({
        id: formData.id,
        fullName: formData.firstName + ' ' + formData.lastName,
        dob: formData.dateOfBirth,
        phoneNo: formData.phoneNo,
        password: "null",
      }).unwrap();

      if (result.user) {
        navigate('/login');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.error('Error completing registration:', error);
      setError(
        error?.data?.message ||
          'Failed to complete registration. Please try again.'
      );
    }
  };

  return (
    <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
      <p className="text-gray-500 text-sm mb-2 fixed top-4 right-4">
        STEP 04/04
      </p>

      <div className="w-full max-w-[512px] text-center">
        <h2 className="text-[20px] font-bold mb-4 text-left">
          Additional Details
        </h2>
        <p className="text-[#313131] mb-6 text-left">
          Just a little more information, and you'll be ready to explore
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-4 px-2 overflow-y-scroll max-h-[60vh] custom-scrollbar"
        >
          {error && (
            <div
              className="text-red-700 px-4 py-3 rounded relative text-left"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* First Name */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1D5C5C]"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1D5C5C]"
            />
          </div>

          {/* Date of Birth */}
          <div className="relative">
            <label className="block text-left text-gray-700 font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#1D5C5C]"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1D5C5C]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mx-auto p-3 bg-[#1D5C5C] text-white font-semibold rounded-md flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? 'Saving...' : 'Complete My Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StepFour;
