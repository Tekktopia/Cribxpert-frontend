'use client';
import { useSignIn } from '@clerk/clerk-react';
import { OAuthStrategy } from '@clerk/types';
import { FcGoogle } from 'react-icons/fc';

type GoogleSignInProps = {
    setError: React.Dispatch<React.SetStateAction<string>>;
}

export default function GoogleSignIn({ setError }: GoogleSignInProps) {
  const { signIn } = useSignIn();

  const handleGoogleSignIn = () => {
    if (!signIn) return;
    signIn
      .authenticateWithRedirect({
        strategy: 'oauth_google' as OAuthStrategy,
        // Where to redirect after first-time sign-in
        redirectUrl: '/onboarding',
        // Where to redirect on subsequent sign-ins
        redirectUrlComplete: '/',        
      })
      .catch((err) => {
        console.error('Google OAuth error:', err);
        setError(err.message || 'An error occurred during Google sign-in.');
      });
  };

  return (
    <button
      className="w-full p-3 border border-gray-300 text-[#730071] font-semibold rounded-md flex items-center justify-center gap-2 mb-3"
      onClick={handleGoogleSignIn}
    >
      <span>Sign In with Google</span>
      <FcGoogle className="w-5 h-5" />
    </button>
  );
}
