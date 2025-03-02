import React from "react"
import { Link } from "react-router"
import makinwa from "../../../assets/images/Makinwaa.png"
const OrderSummary: React.FC=()=> {
    return(
<div className=" border border-[#E6E6E6] p-4  rounded-lg ">
    
<img src={makinwa} alt="Makinwa " className="w-full h-auto object-cover rounded-md"/>
<div>
<h2 className="mt-2 text-[#040404] font-[400] text-[14px] ">Makinwaa's Cottag -  Newly Remodeled</h2>
<p className="text-[#6F6F6F] text-[14px] mb-5">Federal Capital Territory Gombe</p>
<p className="text-[#999999]">⭐4.5 [115 verified positive feedbacks]</p>
<div className="w-full border border-[#cccccc] bg-[#f1e6f1]/30 mt-4 p-2">
<p className="text-[#6F6F6F] font-[400] text-[14px] ">Great choice! Secure your booking now before it’s gone.</p>
</div>    
    </div>

<div className="mt-5 flex md:flex-row flex-col justify-around gap-8">
    <div className="flex flex-col gap-2">
<h2 className="text-[#6F6F6F] font-[400] text-[14px]">Check-in date</h2>
<p className="text-[#6F6F6F] font-[400] text-[14px]">Fri, 31 Jan, 3:00 pm</p>
    </div>
    <div className="flex flex-col gap-2">
<h2 className="text-[#6F6F6F] font-[400] text-[14px]">Check-out date</h2>
<p className="text-[#6F6F6F] font-[400] text-[14px]">Sun, 2 Feb, 10:00 am</p>
    </div>
    <div className="flex flex-col gap-2">
<h2 className="text-[#6F6F6F] font-[400] text-[14px]">No of Guest</h2>
<p className="text-[#6F6F6F] font-[400] text-[14px]"> 2 guests</p>
    </div>
</div>
<div className="mt-4">
    <div className="flex justify-between">
    <p className="text-[#6F6F6F] font-[400] text-[14px]">Booking fee[2 nights]</p>
    <p className="text-[#6F6F6F] font-[400] text-[14px]">NGN 160,000</p>
    </div>
    <div className="flex justify-between mt-2">
    <p className="text-[#6F6F6F] font-[400] text-[14px]">Cleaning Fee</p>
    <p className="text-[#6F6F6F] font-[400] text-[14px]">NGN 10,000</p>
    </div>
    <div className="flex justify-between mt-2">
    <p className="text-[#6F6F6F] font-[400] text-[14px]">Service Fee</p>
    <p className="text-[#6F6F6F] font-[400] text-[14px]">NGN 0</p>
    </div>
    <div className="flex justify-between mt-2">
    <p className="text-[#313131] font-[400] text-[14px]">Total</p>
    <p className="text-[#313131] font-[500] text-[14px]">NGN 260,000</p>
    </div>
    <Link to="/paymentmethod">
  <button className="bg-[#730071] w-full py-3 rounded-lg text-white font-medium mt-4 hover:bg-[#5a0056] transition">
    Make Payment
  </button>
  </Link>
</div>
</div>

    )
}
export default OrderSummary