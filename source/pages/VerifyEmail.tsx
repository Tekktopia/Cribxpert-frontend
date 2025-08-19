import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const VerifyEmail = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('verifyEmailToken', token);
      navigate('/onboarding');
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  return null;
};

export default VerifyEmail;
