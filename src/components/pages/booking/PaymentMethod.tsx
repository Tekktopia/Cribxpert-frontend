import React from "react";
import USSD from "../../../assets/icons/USSD.png";
import Payment from "../../../assets/icons/Payment-Link.png";
import BankCard from "../../../assets/icons/Bank-Card.png";
import BankTransfer from "../../../assets/icons/Bank-Transfer.png";
import copyICon from "../../../assets/icons/copyIcon.png";

const PaymentMethod: React.FC = () => {
  return (
    <section className='container mx-auto p-6'>
      <div className='flex justify-between'>
        <h1 className='text-black font-[400] text-[16px]' id='PAYSTACK-GATEWAY'>
          PAYSTACK GATEWAY
        </h1>
        <div className='flex flex-col'>
          <p className='text-[#040404]'>Reference id: if any 00000000</p>
          <p className='text-[#040404]'>
            Pay<span className='text-[#8B2B89]'>NGN50,000</span>
          </p>
        </div>
      </div>

      <div>
        <hr className='border border-[#530000]/20' />

        <div className='flex flex-col md:flex-row md:justify-between justify-center md:items-start items-center mx-auto gap-6'>
          <div className='md:w-1/2 w-full py-6'>
            <h3 className='text-[400] font-[400] text-center text-[#040404]'>
              Payment Method
            </h3>
            <div className='rounded-md border border-[#F1E6F1] p-4'>
              <div className='flex flex-col gap-2'>
                <div className='bg-white rounded-md flex items-center px-4 py-2 gap-2 shadow-sm'>
                  <img
                    src={USSD}
                    alt='USSD Icon'
                    className='w-[30px] h-[30px]'
                  />
                  <p className='text-[#313131]'>USSD</p>
                </div>
                <div className='bg-white rounded-md flex items-center px-4 py-2 gap-2 shadow-sm'>
                  <img
                    src={Payment}
                    alt='Payment Method'
                    className='w-[30px] h-[30px]'
                  />
                  <p className='text-[#313131]'>Payment Link</p>
                </div>
                <div className='bg-white rounded-md flex items-center px-4 py-2 gap-2 shadow-sm'>
                  <img
                    src={BankCard}
                    alt='BankCard'
                    className='w-[30px] h-[30px]'
                  />
                  <p className='text-[#313131]'>Bank Card</p>
                </div>
                <div className='bg-white rounded-md flex items-center px-4 py-2 gap-2 shadow-sm'>
                  <img
                    src={BankTransfer}
                    alt='BankTransfer'
                    className='w-[30px] h-[30px]'
                  />
                  <p className='text-[#313131]'>Bank Transfer</p>
                </div>
              </div>
            </div>
          </div>

          <div className='md:w-1/2 w-full py-6'>
            <h3 className='text-[400] mb-3 text-center md:text-left font-[400] text-[#040404]'>
              Payment System
            </h3>
            <div className='rounded-md border border-[#F1E6F1] p-4'>
              <h3 className='text-[400] font-[400] text-[#040404] text-center mb-4'>
                Booking Fees ~ NGN170,000
              </h3>
              <div className='p-4 bg-[#f1e6f1]/40 rounded-md'>
                <div className='flex flex-col gap-4'>
                  <div>
                    <p className='text-[#6F6F6F] font-[400] text-[14px]'>
                      Bank Name
                    </p>
                    <p className='text-[#6F6F6F] font-[400] text-[14px]'>
                      FCMB
                    </p>
                  </div>
                  <div>
                    <p className='text-[#6F6F6F] font-[400] text-[14px]'>
                      Account Name
                    </p>
                    <p className='text-[#6F6F6F] font-[400] text-[14px]'>
                      Tekktopia Shot-let
                    </p>
                  </div>
                  <div className='mb-4 flex justify-between items-center'>
                    <div>
                      <p className='text-[#6F6F6F] font-[400] text-[14px]'>
                        Account Number
                      </p>
                      <p className='text-[#6F6F6F] font-[400] text-[14px]'>
                        0002224449
                      </p>
                    </div>
                    <img
                      src={copyICon}
                      alt='CopyIcon'
                      className='w-[16px] h-[16px]'
                    />
                  </div>
                  <div className='mb-4 flex justify-between items-center'>
                    <div>
                      <p className='text-[#6F6F6F] font-[400] text-[14px]'>
                        Amount
                      </p>
                      <p className='text-[#6F6F6F] font-[400] text-[14px]'>
                        NGN 50,000
                      </p>
                    </div>
                    <img
                      src={copyICon}
                      alt='CopyIcon'
                      className='w-[16px] h-[16px]'
                    />
                  </div>
                </div>
              </div>
              <button className='bg-[#730071] w-full py-3 rounded-lg text-white font-medium mt-4 hover:bg-[#5a0056] transition'>
                Click Here After Transfer
              </button>
              <p className='text-center text-[14px] text-[#6F6F6F] mt-3'>
                Note: Kindly transfer the exact amount to the account details
                above. Account number is valid for{" "}
                <span className='text-[20px] text-[#730071] font-[600]'>
                  09:30
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethod;
