import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Password = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-start my-9 ">
      <form onSubmit={handleSubmit} className=" flex flex-col gap-[42px]">
        <div className=" flex gap-6 sm:gap-[42px] flex-wrap ">
          <div className="flex gap-1 flex-col w-[300px] ">
            <label className=" text-[#999999] ">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full py-3 px-4 border rounded flex items-center border-1 border-[#DFE4EA] text-[#999999]"
            />
            {errors.oldPassword && (
              <p className="text-red-500">{errors.oldPassword}</p>
            )}
          </div>

          <div className="flex gap-1 flex-col w-[300px] ">
            <label className=" text-[#999999] ">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full py-3 px-4 border rounded flex items-center border-1 border-[#DFE4EA] text-[#999999]"
            />
            <div className="text-sm text-red-500">
              {errors.newPassword.length && <p>{errors.newPassword.length}</p>}
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

          <div className="flex gap-1 flex-col w-[300px] ">
            <label className=" text-[#999999] ">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full py-3 px-4 border rounded flex items-center border-1 border-[#DFE4EA] text-[#999999]"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 items-center">
            <CheckCircleIcon className="w-6 h-6 text-[#730071]" />
            <p className=" text-sm leading-5 text-[#730071]">
              Minimum 8 characters.
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <CheckCircleIcon className="w-6 h-6 text-[#730071]" />
            <p className=" text-sm leading-5 text-[#730071]">
              Use combination of uppercase and lowercase letters.
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <CheckCircleIcon className="w-6 h-6 text-[#730071]" />
            <p className=" text-sm leading-5 text-[#730071]">
              Use of special characters (e.g., !, @, #, $, %)
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="w-[156px] bg-[#730071] text-white p-[10px] rounded-lg hover:bg-[#3f013e]"
          >
            Update Password
          </button>
          <button className="w-[156px] border-2 border-[#730071] text-[#730071] p-[10px] rounded-lg hover:border-[#3f013e]">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Password;
