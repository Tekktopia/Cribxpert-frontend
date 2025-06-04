import eclipse from '@/assets/icons/Ellipse-gray.svg';
import button from '@/assets/icons/Button.svg';
import reminder from '@/assets/icons/reminder.svg';

const All = () => {
  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6 items-start my-6 sm:my-9">
      {/* Notification Item 1 */}
      <div className="w-full flex gap-3 sm:gap-[19px]">
        <div className="flex-shrink-0 h-[40px] sm:h-[50px] w-[40px] sm:w-[50px] py-[5px] px-[15px] justify-center items-center rounded-lg bg-[#F1E6F1]">
          <p className="text-[24px] sm:text-[31px] font-semibold text-[#6F6F6F]">
            B
          </p>
        </div>
        <div className="flex-1 flex items-start justify-center gap-2 sm:gap-[15px] flex-col">
          <p className="text-[14px] sm:text-[16px] font-semibold text-[#313131] line-clamp-2">
            Your booking for Jan 10 has been confirmed
          </p>
          <div className="text-[#999] text-[12px] sm:text-[14px] font-normal flex flex-wrap gap-2">
            <p>2 min ago</p>
            <img src={eclipse} alt="circle" className="hidden sm:inline" />
            <span className="inline sm:hidden">•</span>
            <p>Booking Confirmed</p>
          </div>
          <div className="flex flex-wrap w-full gap-2 sm:gap-4">
            <button
              type="submit"
              className="bg-[#1D5C5C] items-center justify-center text-white py-2 px-3 sm:p-[10px] rounded-[5px] hover:bg-[#3f013e] flex text-[12px] sm:text-[14px] lg:text-[16px]"
            >
              View Details
            </button>
            <button className="items-center justify-center border-2 border-[#999] text-[#313131] py-2 px-3 sm:p-[10px] rounded-[5px] hover:border-[#3f013e] flex text-[12px] sm:text-[14px] lg:text-[16px]">
              Complete Payment
            </button>
          </div>
        </div>
      </div>

      <hr className="w-full my-1" />

      {/* Notification Item 2 */}
      <div className="w-full flex gap-3 sm:gap-[19px]">
        <div className="flex-shrink-0 h-[40px] sm:h-[50px] w-[40px] sm:w-[50px] py-[5px] px-[15px] justify-center items-center rounded-lg bg-[#F1E6F1]">
          <p className="text-[24px] sm:text-[31px] font-semibold text-[#6F6F6F]">
            R
          </p>
        </div>
        <div className="flex-1 flex items-start justify-center gap-2 sm:gap-[15px] flex-col">
          <p className="text-[14px] sm:text-[16px] font-semibold text-[#6F6F6F] line-clamp-2">
            Please provide feedback for your stay at Makinwaa's Cottage
          </p>
          <div className="text-[#999] text-[12px] sm:text-[14px] font-normal flex flex-wrap gap-2">
            <p>2 days ago</p>
            <img src={eclipse} alt="circle" className="hidden sm:inline" />
            <span className="inline sm:hidden">•</span>
            <p>Review your stay</p>
          </div>
          <div className="flex w-full h-[54px] sm:h-[64px] items-center justify-center rounded-[3px] bg-[#F1E6F1]">
            <img src={button} alt="" className="h-5 sm:h-auto" />
            <textarea
              className="pr-2 sm:pr-[51px] pl-2 sm:pl-[17px] flex w-full justify-center bg-[#F1E6F1] items-center outline-none text-[#999] text-[12px] sm:text-[14px] resize-none"
              placeholder="Write a Review..."
            ></textarea>
          </div>
        </div>
      </div>

      <hr className="w-full my-1" />

      {/* Notification Item 3 */}
      <div className="w-full flex gap-3 sm:gap-[19px]">
        <div className="flex-shrink-0 h-[40px] sm:h-[50px] w-[40px] sm:w-[50px] py-[5px] px-[15px] justify-center items-center rounded-lg bg-[#F1E6F1]">
          <p className="text-[24px] sm:text-[31px] font-semibold text-[#6F6F6F]">
            P
          </p>
        </div>
        <div className="flex-1 flex items-start justify-center gap-2 sm:gap-[15px] flex-col">
          <p className="text-[14px] sm:text-[16px] font-semibold text-[#313131] line-clamp-2">
            Your Payment of NGN 85,000 has been processed
          </p>
          <div className="text-[#999] text-[12px] sm:text-[14px] font-normal flex flex-wrap gap-2">
            <p>4 days ago</p>
            <img src={eclipse} alt="circle" className="hidden sm:inline" />
            <span className="inline sm:hidden">•</span>
            <p>Payment Successful</p>
          </div>
          <button
            type="submit"
            className="bg-[#1D5C5C] items-center justify-center text-white py-2 px-3 sm:p-[10px] rounded-[5px] hover:bg-[#3f013e] flex text-[12px] sm:text-[14px] lg:text-[16px]"
          >
            View Receipt
          </button>
        </div>
      </div>

      <hr className="w-full my-1" />

      {/* Notification Item 4 */}
      <div className="w-full flex gap-3 sm:gap-[19px]">
        <div className="flex-shrink-0 h-[40px] sm:h-[50px] w-[40px] sm:w-[50px] flex justify-center items-center rounded-lg bg-[#F1E6F1]">
          <img src={reminder} alt="" className="h-[40px] sm:h-[50px]" />
        </div>
        <div className="flex-1 flex items-start justify-center gap-2 sm:gap-[15px] flex-col">
          <p className="text-[14px] sm:text-[16px] font-semibold text-[#6F6F6F] line-clamp-2">
            Reminder: you have 2 apartment saved in your saved listing
          </p>
          <div className="text-[#999] text-[12px] sm:text-[14px] font-normal flex gap-2">
            <p>4 days ago</p>
          </div>
          <a href="#" className="text-[#FF3B3B] text-[14px] sm:text-[16px]">
            Check them out
          </a>
        </div>
      </div>

      <hr className="w-full my-1" />

      {/* Notification Item 5 */}
      <div className="w-full flex gap-3 sm:gap-[19px]">
        <div className="flex-shrink-0 h-[40px] sm:h-[50px] w-[40px] sm:w-[50px] py-[5px] px-[15px] justify-center items-center rounded-lg bg-[#F1E6F1]">
          <p className="text-[24px] sm:text-[31px] font-semibold text-[#6F6F6F]">
            M
          </p>
        </div>
        <div className="flex-1 flex items-start justify-center gap-2 sm:gap-[15px] flex-col">
          <p className="text-[14px] sm:text-[16px] font-semibold text-[#6F6F6F] line-clamp-2">
            You have a new message from lorem ipsum
          </p>
          <div className="text-[#999] text-[12px] sm:text-[14px] font-normal flex flex-wrap gap-2">
            <p>A week ago</p>
            <img src={eclipse} alt="circle" className="hidden sm:inline" />
            <span className="inline sm:hidden">•</span>
            <p>New message</p>
          </div>
          <button className="items-center justify-center border-2 border-[#999] text-[#313131] py-2 px-3 sm:p-[10px] rounded-[5px] hover:border-[#3f013e] flex text-[12px] sm:text-[14px] lg:text-[16px]">
            View Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default All;
