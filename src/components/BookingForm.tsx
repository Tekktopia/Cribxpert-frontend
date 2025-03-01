import calender from "../assets/icons/calendar.png"
import certified from "../assets/icons/certified.png"
import arrowdown from "../assets/icons/arrow-down.png";
import {Link } from "react-router";
const BookinForm:React.FC=()=>{
    return(
<div className="w-[480px] bg-white shadow-md border border-[#E6E6E6] rounded-lg p-5">
  {/* Price & Cancellation */}
  <div className="mb-4">
    <h4 className="text-[#6F6F6F] text-[14px] font-bold">NGN 85,000 <span className="font-normal">/night</span></h4>
    <p className="text-[#6F6F6F] text-[14px]">All fees included</p>
    <hr className="border-[#E6E6E6] my-3" />
  </div>

  <div className="mb-4">
    <h4 className="text-[#6F6F6F] text-[14px] font-medium">Free cancellation</h4>
    <p className="text-[#6F6F6F] text-[14px]">Before Fri, Jan 17</p>
  </div>

  {/* Date Selection */}
  <div className="flex gap-3">
    <div className="flex items-start rounded-md bg-white border border-[#E6E6E6] px-4 py-2 w-1/2">
      <img src={calender} alt="Calendar" className="w-[16px] h-[16px] mr-2" />
      <div>
        <p className="text-[#6F6F6F] text-[12px]">Start date</p>
        <p className="text-[#313131] text-[14px] font-medium">Jan 31</p>
      </div>
    </div>

    <div className="flex items-start rounded-md bg-white border border-[#E6E6E6] px-4 py-2 w-1/2">
      <img src={calender} alt="Calendar" className="w-[16px] h-[16px] mr-2" />
      <div>
        <p className="text-[#6F6F6F] text-[12px]">End date</p>
        <p className="text-[#313131] text-[14px] font-medium">Feb 2</p>
      </div>
    </div>
  </div>

  {/* Travelers Selection */}
  <div className="flex items-center rounded-md bg-white border border-[#E6E6E6] px-4 py-3 mt-3">
    <div className="flex flex-col">
    <p className="text-[#6F6F6F] text-[14px]">Travelers</p>
    <p className="text-[#313131] text-[14px] font-medium ml-auto">2 travelers</p>
    </div>
  
  </div>

  {/* Availability Check */}
  <p className="text-[#999999] text-[14px] mt-3">✔ Your dates are available</p>

  {/* Price & Breakdown */}
  <div className="flex items-center justify-between mt-4">
    <p className="text-[#313131] text-[16px] font-medium">Total Price</p>
    <h3 className="text-[#070707] text-[16px] font-semibold">NGN 170,000</h3>
  </div>
  <div className="flex items-center justify-center  text-[#6F6F6F] text-[14px] font-medium cursor-pointer mt-1">
    View price breakdown <img src={arrowdown} alt="Arrow Down" className="w-[16px] h-[16px] ml-1" />
  </div>

  {/* CTA Button */}
  <Link to="/BookingPage">
  <button className="bg-[#730071] w-full py-3 rounded-lg text-white font-medium mt-4 hover:bg-[#5a0056] transition">
    Book Now
  </button>
  </Link>
 

  {/* Confidence Guarantee */}
  <div className="flex items-center justify-center mt-3 text-[#070707] text-[14px]">
    <img src={certified} alt="Certified" className="w-[16px] h-[16px] mr-2" />
    <p>Book with confidence guarantee</p>
  </div>

  {/* Property ID & Contact */}
  <div className="mt-4 flex flex-col items-center">
    <p className="text-[#313131] text-[14px]">Property ID <strong>234532</strong></p>
    <p className="text-[#730071] text-[14px] font-medium cursor-pointer hover:underline mt-1">Contact host</p>
  </div>
</div>
    )
}
export default BookinForm
