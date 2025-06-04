import StepFour from '@/components/sign-up/StepFour';
import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export default function Onboarding() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && !user) {
      // Redirect to /login if user is null
      window.location.href = '/sign-up';
    }
  }, [user, isLoaded]);

  const [formData, setFormData] = React.useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    dateOfBirth: '',
    email: user?.primaryEmailAddress?.emailAddress || '',
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
        <div className="absolute inset-0 bg-[#1D5C5C66] opacity-50"></div>
      </div>

      <StepFour formData={formData} setFormData={setFormData} />
    </div>
  );
}
