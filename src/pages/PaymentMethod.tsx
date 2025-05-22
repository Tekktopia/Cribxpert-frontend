import React, { useState } from 'react';
import USSD from '@/assets/icons/USSD.png';
import Payment from '@/assets/icons/Payment-Link.png';
import BankCard from '@/assets/icons/Bank-Card.png';
import BankTransfer from '@/assets/icons/Bank-Transfer.png';
import copyIcon from '@/assets/icons/copyIcon.png';
import Header from '../components/layout/Header';

const PaymentMethod: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('Bank Transfer');

  const paymentMethods = [
    { name: 'USSD', icon: USSD },
    { name: 'Bank Card', icon: BankCard },
    { name: 'Bank Transfer', icon: BankTransfer },
    { name: 'Payment Link', icon: Payment },
  ];

  return (
    <>
      <Header />
      <section className="container mx-auto p-6 mt-32">
        <div className="flex flex-col md:flex-row md:gap-6 relative">
          {/* Left: Payment Methods */}
          <div className="md:w-1/3 w-full flex flex-col">
            {/* Payment Methods Title (Outside Box) */}
            <h1 className="text-lg font-semibold text-gray-800 -mb-4">
              Payment Method
            </h1>
            <div className="border border-[#F1E6F1] rounded-lg p-4 mt-6 flex-grow ">
              <div className="flex flex-col gap-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedMethod(method.name)}
                    className={`flex items-center cursor-pointer px-4 py-3 rounded-md bg-white shadow-sm
                    ${selectedMethod === method.name ? 'border-l-4 border-[#730071] bg-[#F5F5FF]' : 'border-gray-300 bg-white'}`}
                  >
                    <img
                      src={method.icon}
                      alt={method.name}
                      className="w-[24px] h-[24px] mr-3"
                    />
                    <p
                      className={`text-gray-700 font-medium ${selectedMethod === method.name ? 'text-[#730071]' : ''}`}
                    >
                      {method.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Payment Details */}
          <div className="md:w-2/3 w-full flex flex-col">
            {/* Payment Details Title (Outside Box) */}
            <h1 className="text-lg font-semibold text-gray-800 -mb-4">
              Payment Details
            </h1>
            <div className="border border-[#F1E6F1] rounded-lg p-6 mt-6 h-full flex-grow">
              <div className="p-5 bg-[#f8e6f8] rounded-lg shadow-md">
                <h3 className="text-lg text-center font-semibold text-gray-800">
                  Booking Fee - NGN 100,000
                </h3>
                {/* Bank Details */}
                <div className="space-y-4 text-gray-800 text-sm">
                  <div>
                    <p className="text-gray-500">Bank Name</p>
                    <p className="font-medium">FCMB</p>
                  </div>
                  <div>
                    <p className="text-[#6F6F6F] font-medium">Account Name</p>
                    <p className="text-gray-800">Tekktopia Shot-let</p>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <div>
                      <p className="text-[#6F6F6F] font-medium">
                        Account Number
                      </p>
                      <p className="text-gray-800">0002224449</p>
                    </div>
                    <img
                      src={copyIcon}
                      alt="CopyIcon"
                      className="w-[20px] h-[20px] cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p className="text-[#6F6F6F] font-medium">Amount</p>
                      <p className="text-[#730071] font-bold text-lg">
                        NGN 50,000
                      </p>
                    </div>
                    <img
                      src={copyIcon}
                      alt="CopyIcon"
                      className="w-[20px] h-[20px] cursor-pointer"
                    />
                  </div>
                </div>
                <button className="bg-[#730071] w-full py-3 mt-4 rounded-lg text-white font-medium hover:bg-[#5a0056] transition">
                  Click Here After Transfer
                </button>
                <p className="text-center text-gray-600 mt-3">
                  Note: Kindly transfer the exact amount to the account details
                  above. Account number is valid for{' '}
                  <span className="text-lg font-semibold text-[#730071]">
                    09:30
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentMethod;
