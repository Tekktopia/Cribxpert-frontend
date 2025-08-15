// import { CameraIcon } from '@heroicons/react/16/solid';
import { ProfileFormProps } from '@/types';
import { CameraIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Profile = ({
  initialFirstName,
  initialLastName,
  initialEmail,
  initialPhone,
  initialProfileImage,
}: ProfileFormProps) => {
  const [formData, setFormData] = useState({
    firstName: initialFirstName,
    lastName: initialLastName,
    email: initialEmail,
    phone: initialPhone,
  });

  const [profileImage, setProfileImage] = useState<string | null>(
    initialProfileImage || null
  );

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profileImage: '',
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      profileImage: '',
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
      isValid = false;
    }

    if (!profileImage) {
      newErrors.profileImage = 'Profile image is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log({ ...formData, profileImage });
    }
  };

  return (
    <div className="lg:w-[800px] w-full flex flex-col gap-6 lg:items-start my-9 ">
      <div className="flex  items-center gap-3">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-[100px] h-24 rounded-[24px] border object-cover"
          />
        ) : (
          <div className="w-[100px] h-24 rounded-[24px]  flex items-center justify-center bg-[#1D5C5C]/10">
            <CameraIcon className="w-6 h-6 text-[#1D5C5C]" />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <div className="flex p-[10px] gap-[6px] items-center justify-center border border-[#BCC3CA] rounded-lg w-[179px] h-[44px]">
            <CameraIcon className="w-6 h-6 text-[#1D5C5C]" />
            <label
              htmlFor="file"
              className="cursor-pointer text-sm leading-5 text-[#1D5C5C]"
            >
              Change Picture
            </label>
            <input
              type="file"
              id="file"
              name="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* accept="image */}
          {errors.profileImage && (
            <p className="text-red-500">{errors.profileImage}</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className=" flex flex-col gap-[42px] ">
        <div className=" grid lg:grid-cols-2 lg:gap-[42px] gap-6 ">
          <div className="flex gap-1 flex-col lg:w-[395px] lg:h-[70px]">
            <label className=" text-[#999999] ">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="amoria"
              className="w-full py-3 px-4 border rounded  border-1 border-[#DFE4EA] text-[#999999]"
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div className="flex gap-1 flex-col lg:w-[395px] lg:h-[70px]">
            <label className=" text-[#999999] ">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="amoria"
              onChange={handleChange}
              className="w-full py-3 px-4 border rounded  border-1 border-[#DFE4EA] text-[#999999]"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName}</p>
            )}
          </div>

          <div className="flex gap-1 flex-col lg:w-[395px] lg:h-[70px]">
            <label className=" text-[#999999] ">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="amoriamakinwa@gmail.com"
              className="w-full py-3 px-4 border rounded  border-1 border-[#DFE4EA] text-[#999999]"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="flex gap-1 flex-col lg:w-[395px] lg:h-[70px]">
            <label className=" text-[#999999] ">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+2348167990657"
              className="w-full py-3 px-4 border rounded   border-1 border-[#DFE4EA] text-[#999999]"
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-[156px] bg-[#1D5C5C] text-white p-[10px] rounded-lg hover:bg-[#3f013e]"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Profile;
