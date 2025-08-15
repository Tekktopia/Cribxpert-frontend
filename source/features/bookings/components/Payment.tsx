import { bookingsData } from '@/utils/data';
import { useParams } from 'react-router';

const Payment = () => {
  const { id } = useParams();
  const booking = bookingsData.find((b) => b.id === id);
  return (
    <div className="text-[#6F6F6F] flex flex-col w-full gap-[40px] p-4 font-medium">
      <div>
        <h1 className="text-xl font-bold text-[#313131]">Payment</h1>
      </div>
      <hr />
      <div className="flex justify-between items-center p-4">
        <p>₦60,000 x 3 nights</p>
        <p>₦180,000</p>
      </div>
      <hr />
      <div className="flex flex-col justify-between gap-[20px]  p-4">
        <div className="flex justify-between">
          <p className="text-[#313131] font-semibold">Sub Total</p>
          <p className="text-[#313131] ">₦180,000</p>
        </div>
        <div className="flex justify-between">
          <p>Security Deposit</p>
          <p>₦80,000</p>
        </div>
        <div className="flex justify-between">
          <p>Service Charge</p>
          <p>₦18,000</p>
        </div>
      </div>
      <hr />
      <div className="flex justify-between items-center p-4 text-[#313131] font-semibold">
        <p>Total</p>
        <p>₦278,000</p>
      </div>
      <hr />
      {booking?.status === 'pending' && (
        <div>
          <button className="w-full bg-primary p-3 rounded-lg text-white font-semibold hover:bg-primary/90 transition-colors duration-300">
            Make Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Payment;
