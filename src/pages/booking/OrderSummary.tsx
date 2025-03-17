import React from 'react';
import { Link } from 'lucide-react';

const OrderSummary: React.FC = () => {
  return (


<div className="border border-[#E6E6E6] p-4 rounded-lg h-full">
<img
  src="/lovable-uploads/af93be49-d8ae-41b3-bf4a-fbf5ec34ff1c.png"
  alt="Makinwa's Cottage"
  className="w-full h-auto object-cover rounded-md max-h-[250px]"
/>
<div>
  <h2 className="mt-2 text-[#040404] font-[400] text-[14px]">
    Makinwaa's Cottage - Newly Remodeled
  </h2>
  <p className="text-[#6F6F6F] text-[14px] mb-2">
    Federal Capital Territory Gombe
  </p>
  <p className="text-[#999999] text-[14px]">
    ⭐ 4.5 [115 verified positive feedbacks]
  </p>
  <div className="w-full border border-[#cccccc] bg-[#f1e6f1]/30 mt-4 p-2 rounded-md">
    <p className="text-[#6F6F6F] font-[400] text-[14px]">
      Great choice! Secure your booking now before it's gone.
    </p>
  </div>
</div>

<div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="flex flex-col gap-1">
    <h2 className="text-[#6F6F6F] font-[400] text-[14px]">
      Check-in date
    </h2>
    <p className="text-[#6F6F6F] font-[400] text-[14px]">
      Fri, 31 Jan, 3:00 pm
    </p>
  </div>
  <div className="flex flex-col gap-1">
    <h2 className="text-[#6F6F6F] font-[400] text-[14px]">
      Check-out date
    </h2>
    <p className="text-[#6F6F6F] font-[400] text-[14px]">
      Sun, 2 Feb, 10:00 am
    </p>
  </div>
  <div className="flex flex-col gap-1">
    <h2 className="text-[#6F6F6F] font-[400] text-[14px]">No of Guest</h2>
    <p className="text-[#6F6F6F] font-[400] text-[14px]">2 guests</p>
  </div>
</div>

<div className="mt-5 space-y-2">
  <div className="flex justify-between">
    <p className="text-[#6F6F6F] font-[400] text-[14px]">
      Booking fee [2 nights]
    </p>
    <p className="text-[#6F6F6F] font-[400] text-[14px]">NGN 160,000</p>
  </div>
  <div className="flex justify-between">
    <p className="text-[#6F6F6F] font-[400] text-[14px]">Cleaning Fee</p>
    <p className="text-[#6F6F6F] font-[400] text-[14px]">NGN 10,000</p>
  </div>
  <div className="flex justify-between">
    <p className="text-[#6F6F6F] font-[400] text-[14px]">Service Fee</p>
    <p className="text-[#6F6F6F] font-[400] text-[14px]">NGN 0</p>
  </div>
  <div className="flex justify-between pt-2 border-t border-gray-200">
    <p className="text-[#313131] font-[500] text-[14px]">Total</p>
    <p className="text-[#313131] font-[600] text-[14px]">NGN 170,000</p>
  </div>
</div>

<Link to="/paymentmethod">
          <button className="bg-[#730071] w-full py-3 rounded-lg text-white font-medium mt-4 hover:bg-[#5a0056] transition">
            Make Payment
          </button>
        </Link>

</div>
);
};

export default OrderSummary;