import {
  // SignUpButton,
  useSignUp,
} from '@clerk/clerk-react';
import { FcGoogle } from 'react-icons/fc';

type GoogleSignUpProps = {
  setError: React.Dispatch<React.SetStateAction<string>>;
};
export function GoogleSignUp({ setError }: GoogleSignUpProps) {
  const { signUp } = useSignUp();

  const handleGoogleSignUp = () => {
    if (!signUp) return;

    signUp
      .authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/onboarding',
        redirectUrlComplete: '/onboarding', // Where to redirect after sign-up
      })
      .catch((err) => {
        console.error('Google OAuth error:', err);
        setError(err.message || 'An error occurred during Google sign-up.');
      });
  };

  return (
    // <SignUpButton
    //   forceRedirectUrl="/onboarding" // always go here after sign‑up
    //   fallbackRedirectUrl="/onboarding"
    // >
    <button
      className="w-full p-3 border border-gray-300 text-[#1D5C5C] font-semibold rounded-md flex items-center justify-center gap-2 mb-3"
      onClick={handleGoogleSignUp}
    >
      <span>Sign Up with Google</span>
      <FcGoogle className="w-5 h-5" />
    </button>
    // </SignUpButton>
  );
}
