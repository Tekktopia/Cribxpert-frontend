import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Footer from '@/shared/components/layout/Footer';
import { EyeOff, Eye } from 'lucide-react';
import { useUpdatePasswordMutation } from '@/features/auth/authService';

const Password = () => {
  // FIXED: Removed the unused { isLoading, error } variables
  const [updatePassword] = useUpdatePasswordMutation();
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    oldPassword: '',
    newPassword: {
      length: '',
      uppercase: '',
      lowercase: '',
      specialChar: '',
    },
    confirmPassword: '',
  });

  // Separate visibility state for each password field
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Individual toggle functions
  const toggleOldPassword = () => {
    setShowPasswords((prev) => ({
      ...prev,
      oldPassword: !prev.oldPassword,
    }));
  };

  const toggleNewPassword = () => {
    setShowPasswords((prev) => ({
      ...prev,
      newPassword: !prev.newPassword,
    }));
  };

  const toggleConfirmPassword = () => {
    setShowPasswords((prev) => ({
      ...prev,
      confirmPassword: !prev.confirmPassword,
    }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {
      oldPassword: '',
      newPassword: {
        length: '',
        uppercase: '',
        lowercase: '',
        specialChar: '',
      },
      confirmPassword: '',
    };

    if (!formData.oldPassword.trim()) {
      newErrors.oldPassword = 'Old password is required.';
      isValid = false;
    }

    if (formData.newPassword.length < 8) {
      newErrors.newPassword.length =
        'Password must be at least 8 characters long.';
      isValid = false;
    }
    if (!/[A-Z]/.test(formData.newPassword)) {
      newErrors.newPassword.uppercase =
        'Password must contain at least one uppercase letter.';
      isValid = false;
    }
    if (!/[a-z]/.test(formData.newPassword)) {
      newErrors.newPassword.lowercase =
        'Password must contain at least one lowercase letter.';
      isValid = false;
    }

    if (!/[@$!%*?&]/.test(formData.newPassword)) {
      newErrors.newPassword.specialChar =
        'Password must contain at least one special character (@$!%*?&).';
      isValid = false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        await updatePassword({
          currentPassword: formData.oldPassword, // Note: API expects currentPassword
          newPassword: formData.newPassword,
        }).unwrap();
        
        setSuccessMessage('Password updated successfully!');
        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err: any) {
        console.error('Failed to update password:', err);
        setErrors({
          ...errors,
          oldPassword: err.data?.message || 'Failed to update password',
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-4xl my-9 px-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-[42px]">
            <div className="flex gap-6 sm:gap-[42px] flex-wrap">
              {/* Old Password */}
              <div className="flex gap-1 flex-col lg:w-[300px] w-full">
                <label className="text-[#999999]">Old Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.oldPassword ? 'text' : 'password'}
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    placeholder="Enter old password"
                    className="w-full py-3 px-4 border rounded border-1 border-[#DFE4EA] text-[#999999] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleOldPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.oldPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.oldPassword && (
                  <p className="text-red-500 text-sm">{errors.oldPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div className="flex gap-1 flex-col lg:w-[300px] w-full">
                <label className="text-[#999999]">New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.newPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full py-3 px-4 border rounded border-1 border-[#DFE4EA] text-[#999999] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleNewPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.newPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="text-sm text-red-500 space-y-1 mt-1">
                  {errors.newPassword.length && (
                    <p>{errors.newPassword.length}</p>
                  )}
                  {errors.newPassword.uppercase && (
                    <p>{errors.newPassword.uppercase}</p>
                  )}
                  {errors.newPassword.lowercase && (
                    <p>{errors.newPassword.lowercase}</p>
                  )}
                  {errors.newPassword.specialChar && (
                    <p>{errors.newPassword.specialChar}</p>
                  )}
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="flex gap-1 flex-col lg:w-[300px] w-full">
                <label className="text-[#999999]">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.confirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    className="w-full py-3 px-4 border rounded border-1 border-[#DFE4EA] text-[#999999] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.confirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center">
                <CheckCircleIcon className="w-6 h-6 text-primary" />
                <p className="text-sm leading-5 text-primary">
                  Minimum 8 characters.
                </p>
              </div>
              <div className="flex gap-1 items-center">
                <CheckCircleIcon className="w-6 h-6 text-primary" />
                <p className="text-sm leading-5 text-primary">
                  Use combination of uppercase and lowercase letters.
                </p>
              </div>
              <div className="flex gap-1 items-center">
                <CheckCircleIcon className="w-6 h-6 text-primary" />
                <p className="text-sm leading-5 text-primary">
                  Use of special characters (e.g., !, @, #, $, %)
                </p>
              </div>
            </div>

            {/* FIXED: Added JSX to render the successMessage */}
            {successMessage && (
              <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg">
                {successMessage}
              </div>
            )}

            <div className="flex gap-4 flex-wrap">
              <button
                type="submit"
                className="w-[156px] bg-primary text-white p-[10px] rounded-lg hover:bg-hoverColor transition-colors"
              >
                Update Password
              </button>
              <button
                type="button"
                className="w-[156px] border-2 border-primary text-primary p-[10px] rounded-lg hover:bg-primary/5 transition-colors"
                onClick={() => {
                  setFormData({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Password;