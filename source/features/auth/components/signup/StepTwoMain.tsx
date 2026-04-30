import React from 'react';
import { useNavigate } from 'react-router-dom';
import OTPInput from './OTPInput';
import StepTwoResendButton from './StepTwoResendButton';
import { supabase } from '@/lib/supabase';

type StepTwoMainProps = {
  methodSelected: string | null;
  email: string;
  phoneNumber: string;
};

const StepTwoMain: React.FC<StepTwoMainProps> = ({
  methodSelected,
  email,
  phoneNumber,
}) => {
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState<string[]>(new Array(6).fill(''));
  const [error, setError] = React.useState<string>('');

  const handleVerify = async () => {
    if (methodSelected === 'Email Address') return; // email uses magic link, no OTP

    const token = otp.join('');
    const { error: sbError } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token,
      type: 'sms',
    });

    if (sbError) {
      setError(sbError.message || 'Verification failed');
      return;
    }

    // authListener fires onAuthStateChange → handles Redux update automatically
    navigate('/onboarding');
  };

  return (
    <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
      <p className="text-gray-500 text-sm mb-2 fixed top-4 right-4">
        STEP 03/04
      </p>
      <div className="w-full max-w-md space-y-6 text-center">
        {methodSelected === 'Email Address' ? (
          <div>
            <h2 className="text-[20px] font-bold mb-4">Confirm Your Email</h2>
            <p className="text-[#313131] mb-6 text-[14px]">
              We've sent a confirmation link to{' '}
              <strong>{email.slice(0, 3) + '****' + email.slice(email.length - 10)}</strong>.
              Click the link in the email to verify your account and continue
              setting up your profile. If you haven't received it, click resend below.
            </p>
            <img src="/gmail-icon.png" className="mx-auto" />
          </div>
        ) : (
          <div>
            <h2 className="text-[20px] font-bold mb-4">Verification</h2>
            <div className="space-y-2 mb-6">
              <p className="text-[#999999] text-[14px]">
                We have sent an OTP code to{' '}
                {phoneNumber.slice(0, 3) +
                  '****' +
                  phoneNumber.slice(phoneNumber.length - 3, phoneNumber.length)}
                . Please enter the OTP sent to this number below to confirm your
                account. If you haven't received the OTP, click on the resend
                code to get another OTP.
              </p>
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <OTPInput otp={otp} setOtp={setOtp} />
          </div>
        )}

        <StepTwoResendButton
          methodSelected={methodSelected}
          handleVerify={handleVerify}
          email={email}
          phoneNumber={phoneNumber}
        />
      </div>
    </div>
  );
};
export default StepTwoMain;
