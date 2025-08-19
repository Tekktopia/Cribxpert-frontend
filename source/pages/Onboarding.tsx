import AuthLeftSide from '@/features/auth/components/AuthLeftSide';
import StepFour from '@/features/auth/components/signup/StepFour';
import React from 'react';
import {  useLocation } from 'react-router-dom';

export default function Onboarding() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('id');

  const [formData, setFormData] = React.useState({
    id: userId || '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNo: '',
    password: ''
  });

  // console.log('Onboarding Form Data:', formData);  

  return (
    <div className="flex h-screen">
      {/* Left Side - How It Works Carousel */}
      <AuthLeftSide />

      {/* Right Side - Form Section */}
      <StepFour formData={formData} setFormData={setFormData} />
    </div>
  );
}
