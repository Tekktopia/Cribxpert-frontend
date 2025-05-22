import eclipse from '@/assets/icons/Ellipse-gray.svg';
import button from '@/assets/icons/Button.svg';
import reminder from '@/assets/icons/reminder.svg';
const All = () => {
  return (
    <div className=" w-full flex flex-col gap-6 items-start my-9 ">
      <div className="flex gap-[19px]">
        <div className="flex h-[50px] py-[5px] px-[15px] justify-center items-center rounded-lg bg-[#F1E6F1] w-[50px]">
          <p className="text-[31px] font-semibold text-[#6F6F6F] ">B</p>
        </div>
        <div className="flex items-start justify-center gap-[15px] flex-col ">
          <p className="text-[14px] sm:text-[16px] font-semibold text-[#313131] ">
            Your booking for Jan 10 has been confirmed
          </p>
          <div className="text-[#999] text-[13px] sm:text-[14px] font-normal flex gap-2">
            <p>2 min ago</p>
            <img src={eclipse} alt="circle" />
            <p>Booking Confirmed</p>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className=" bg-[#730071] items-center justify-center text-white p-[10px] rounded-[5px] hover:bg-[#3f013e] flex  text-[12px]  sm:text-[16px] lg:text-[18px]"
            >
              View Details
            </button>
            <button className=" items-center justify-center  border-2 border-[#999] text-[#313131] p-[10px] rounded-[5px] hover:border-[#3f013e] flex  text-[12px]  sm:text-[16px] lg:text-[18px]">
              Complete Payment
            </button>
          </div>
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex gap-[19px]">
        <div className="flex h-[50px] py-[5px] px-[15px] justify-center items-center rounded-lg bg-[#F1E6F1] w-[50px]">
          <p className="text-[31px] font-semibold text-[#6F6F6F] ">R</p>
        </div>
        <div className="flex items-start justify-center gap-[15px] flex-col ">
          <p className="text-[16px] font-semibold text-[#6F6F6F] ">
            Please provide feedback for your stay at Makinwaa’s Cottage
          </p>
          <div className="text-[#999] text-[14px] font-normal flex gap-2">
            <p>2 days ago</p>
            <img src={eclipse} alt="circle" />
            <p>Review your stay</p>
          </div>
          <div className="flex w-full lg:w-[610px] h-[64px] items-center justify-center rounded-[3px] bg-[#F1E6F1]">
            <img src={button} alt="" />
            <textarea
              className="pr-[51px] pl-[17px] flex w-full justify-center bg-[#F1E6F1]  items-center  outline-none text-[#999]"
              placeholder="Write a Review..."
            ></textarea>
          </div>
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex gap-[19px]">
        <div className="flex h-[50px] py-[5px] px-[15px] justify-center items-center rounded-lg bg-[#F1E6F1] w-[50px] ">
          <p className="text-[31px] font-semibold text-[#6F6F6F] ">P</p>
        </div>
        <div className="flex items-start justify-center gap-[15px] flex-col ">
          <p className="text-[16px] font-semibold text-[#313131] ">
            Your Payment of NGN 85,000 has been processed
          </p>
          <div className="text-[#999] text-[14px] font-normal flex gap-2">
            <p>4 days ago</p>
            <img src={eclipse} alt="circle" />
            <p>Payment Successful</p>
          </div>
          <button
            type="submit"
            className=" bg-[#730071] items-center justify-center text-white p-[10px] rounded-[5px] hover:bg-[#3f013e] flex  text-[12px]  sm:text-[16px] lg:text-[18px]"
          >
            View Receipt
          </button>
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex gap-[19px]">
        <div>
          <p className="text-[31px] font-semibold text-[#6F6F6F] ">
            <div className="flex h-[50px] py-[5px] px-[5px] w-[50px] justify-center items-center rounded-lg bg-[#F1E6F1] ">
              <img src={reminder} alt="" className="h-[50px] " />
            </div>
          </p>
        </div>
        <div className="flex items-start justify-center gap-[15px] flex-col ">
          <p className="text-[16px] font-semibold text-[#6F6F6F] ">
            Reminder: you have 2 apartment saved in your saved listing
          </p>
          <div className="text-[#999] text-[14px] font-normal flex gap-2">
            <p>4 days ago</p>
          </div>
          <a href="#" className="text-[#FF3B3B] text-[16px]">
            Check them out
          </a>
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex gap-[19px]">
        <div className="flex h-[50px] py-[5px] px-[15px] justify-center items-center rounded-lg bg-[#F1E6F1] w-[50px]">
          <p className="text-[31px] font-semibold text-[#6F6F6F] ">M</p>
        </div>
        <div className="flex items-start justify-center gap-[15px] flex-col ">
          <p className="text-[16px] font-semibold text-[#6F6F6F] ">
            You have a new message from lorem ipsum
          </p>
          <div className="text-[#999] text-[14px] font-normal flex gap-2">
            <p>A week ago</p>
            <img src={eclipse} alt="circle" />
            <p>New message</p>
          </div>
          <button className=" items-center justify-center  border-2 border-[#999] text-[#313131] p-[10px] rounded-[5px] hover:border-[#3f013e] flex  text-[12px]  sm:text-[16px] lg:text-[18px]">
            View Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default All;
