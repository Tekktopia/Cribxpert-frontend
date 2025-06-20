import { FcGoogle } from 'react-icons/fc';
import { useGoogleAuthQuery } from '@/features/auth/authService';
import { useEffect, useState } from 'react';

type GoogleSignUpProps = {
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export function GoogleSignUp({ setError }: GoogleSignUpProps) {
  const [enabled, setEnabled] = useState(false);
  const { data, error, isFetching } = useGoogleAuthQuery(undefined, {
    skip: !enabled,
  });

  useEffect(() => {
    if (data?.url) {
      window.location.href = data.url;
    }
    if (error) {
      type GoogleAuthError = {
        message?: string ;
        error?: string;
      };
      const typedError = error as GoogleAuthError;
      setError(
        typedError?.message ||
          typedError?.error ||
          'An error occurred during Google sign-up.'
      );
      setEnabled(false);
    }
  }, [data, error, setError]);

  const handleGoogleSignUp = () => {
    setEnabled(true);
  };

  return (
    <button
      className="w-full p-3 border border-gray-300 text-[#1D5C5C] font-semibold rounded-md flex items-center justify-center gap-2 mb-3"
      onClick={handleGoogleSignUp}
      disabled={isFetching}
    >
      <span>{isFetching ? 'Redirecting...' : 'Sign Up with Google'}</span>
      <FcGoogle className="w-5 h-5" />
    </button>
  );
}
