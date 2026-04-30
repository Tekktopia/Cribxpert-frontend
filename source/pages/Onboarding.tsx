import AuthLeftSide from '@/features/auth/components/AuthLeftSide';
import StepFour from '@/features/auth/components/signup/StepFour';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function Onboarding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNo: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the authenticated user from the session established by the confirmation link
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        // No session — send them to signup
        navigate('/signup', { replace: true });
        return;
      }
      setFormData((prev) => ({ ...prev, id: user.id }));
      setLoading(false);
    });
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#1D5C5C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <AuthLeftSide />
      <StepFour formData={formData} setFormData={setFormData} />
    </div>
  );
}
