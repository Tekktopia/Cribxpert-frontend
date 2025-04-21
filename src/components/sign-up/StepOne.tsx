import React from 'react';
// import { FaFacebook } from "react-icons/fa";
import CustomDropdown from './CustomDropdown';
import { useSignUp} from '@clerk/clerk-react';
import { GoogleSignUp } from './GoogleSignUp';

type StepOneProps = {
  methodSelected: string | null;
  nextStep: () => void;
  setMethodSelected: React.Dispatch<React.SetStateAction<string | null>>;
  email: string;
  phoneNumber: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const StepOne: React.FC<StepOneProps> = ({
  methodSelected,
  nextStep,
  setMethodSelected,
  email,
  phoneNumber,
  password,
  setEmail,
  setPhoneNumber,
  setPassword,
}) => {
  const {
    signUp,
    // setActive,
    // isLoaded
  } = useSignUp();
  const [error, setError] = React.useState<string>('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (methodSelected === 'Email Address') {
        if (!email || !password) {
          throw new Error('Email and password are required');
        }
        // const result =
        await signUp?.create({ emailAddress: email, password });
        // console.log(result);

        await signUp?.prepareEmailAddressVerification({
          strategy: 'email_link',
          redirectUrl: '/onboarding',
        }); // Sends verification email
      } else {
        if (!phoneNumber || !password) {
          throw new Error('Phone number and password are required');
        } else if (phoneNumber.length < 11 || phoneNumber.length > 11) {
          throw new Error('Phone number must be 11 digits');
        }
        phoneNumber = phoneNumber.replace(/^0/, '+234');

        await signUp?.create({ phoneNumber, password });
        await signUp?.preparePhoneNumberVerification(); // Sends verification code
      }

      //   setPendingVerification(true);

      nextStep();
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        console.log(err.message);
        setError(err.message);
      } else {
        console.log('An unknown error occurred');
      }
    }
  };

  return (
    <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
      <p className="text-gray-500 text-sm mb-2 fixed top-4 right-4">
        STEP 01/04
      </p>
      <div className="w-full max-w-md text-center space-y-6">
        <div className="text-left w-full max-w-[342px] ">
          <h2 className="text-[20px] font-semibold mb-4">
            Create Your Account
          </h2>
          <p className="text-[#313131] mb-6">
            Choose your preferred method to get started
          </p>
        </div>

        <GoogleSignUp setError={setError}/>

        <div className="relative text-gray-500 my-4 flex items-center justify-center">
          <span className="bg-white px-2">Or</span>
        </div>

        <div className="space-y-2 text-[#999999]">
          <p className="text-red-500">{error}</p>
          <p className="text-left">Register with</p>
          <CustomDropdown
            methodSelected={methodSelected}
            setMethodSelected={setMethodSelected}
          />

          {methodSelected === 'Email Address' ? (
            <div>
              <label className="cursor-pointer flex flex-col items-start gap-2">
                Email
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-3 border  border-[#730071] rounded-md flex justify-between items-center"
                  required
                />
              </label>
            </div>
          ) : (
            <div>
              <label className="cursor-pointer flex flex-col items-start gap-2">
                Enter mobile Number
                <input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="number"
                  placeholder="07068839585"
                  className="w-full p-3 border  border-[#730071] rounded-md flex justify-between items-center"
                  required
                />
              </label>
            </div>
          )}

          <div>
            {/* <p className='text-red-500'>Password is too weak, Try again.</p> */}
            <label className="cursor-pointer flex flex-col items-start gap-2">
              Password
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                className="w-full p-3 border  border-[#730071] rounded-md flex justify-between items-center"
                required
                type="password"
              />
            </label>
          </div>
          <p className=" text-[14px] text-left">
            By clicking "Proceed" you agree to our{' '}
            <span className="text-[#730071]">Terms of Service</span>.
          </p>
        </div>
        {/* <button className='w-full p-3 border border-gray-300 text-[#730071] font-semibold rounded-md flex items-center justify-center gap-2'>
          <span>Sign Up with Facebook</span>
          <FaFacebook className='w-5 h-5 text-blue-600' />
        </button> */}

        <button
          onClick={handleSignUp}
          className="w-full p-3 mx-auto bg-[#730071] text-white font-semibold rounded-md flex items-center justify-center gap-2 mt-4"
        >
          Continue
        </button>
        <p className="text-gray-500 text-[14px]">
          Already have an account?
          <a href="/login">
            <span className="text-[#730071]">Log in</span>
          </a>
          .
        </p>
      </div>
    </div>
  );
};
export default StepOne;
