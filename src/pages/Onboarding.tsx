import StepFour from '@/components/sign-up/StepFour';
import React from 'react';

export default function Onboarding() {

  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: '',
  });

  return (
    <div className="flex h-screen">
      {/* Left Side - Image Section */}
      <div className="lg:w-1/2 h-full relative">
        <img
          src={`${'/authsidepane1.png'}`}
          alt="Signup Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#73007166] opacity-50"></div>
      </div>

      <StepFour formData={formData} setFormData={setFormData} />
    </div>
  );
}