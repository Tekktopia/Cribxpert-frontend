import AuthLeftSide from '@/components/common/AuthLeftSide';
import StepFour from '@/components/sign-up/StepFour';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '@/features/auth/authSlice';

export default function Onboarding() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [formData, setFormData] = React.useState({
    id: sessionStorage.getItem('pendingUserId') || '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNo: '',
    email: sessionStorage.getItem('pendingEmail') || '',
    password: sessionStorage.getItem('pendingPassword') || '',
  });

  // console.log('Onboarding Form Data:', formData);

  // Redirect authenticated users away from this page
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Handle cleanup of local storage
  useEffect(() => {
    // Clear local storage after retrieving data
    sessionStorage.removeItem('pendingUserId');
    sessionStorage.removeItem('pendingEmail');
    sessionStorage.removeItem('pendingPassword');
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left Side - How It Works Carousel */}
      <AuthLeftSide />

      {/* Right Side - Form Section */}
      <StepFour formData={formData} setFormData={setFormData} />
    </div>
  );
}
