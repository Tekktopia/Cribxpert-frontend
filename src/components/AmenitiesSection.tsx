import airConditioning from '@/assets/icons/air-conditioning.png';
import kitchenIcon from '@/assets/icons/kitchen.png';
import washer from '@/assets/icons/washer.png';
import wifiIcon from '@/assets/icons/wifi.png';
import dryerIocon from '@/assets/icons/dryer.png';
import parkingIcon from '@/assets/icons/parking.png';
import arrowright from '@/assets/icons/arrow-right.png';
const AmenitiesSection = () => (
  <div className="py-8">
    <h3 className="text-[#050505] font-[500] text-[16px]">Popular Amenities</h3>
    <div className="mt-5">
      <div className="flex flex-row items-center gap-14">
        <div className="w-[158px] h-[100px] space-y-3">
          <div className="flex flex-row gap-5">
            <img
              src={parkingIcon}
              alt="Parking"
              className="w-[16px] h-[16px]"
            />
            <p className="text-[#313131] font-[400] text-[14px]">
              Parking Available
            </p>
          </div>
          <div className="flex flex-row gap-5">
            <img
              src={airConditioning}
              alt="Air Conditioning"
              className="w-[16px] h-[16px]"
            />
            <p className="text-[#313131] font-[400] text-[14px]">
              Air Conditioning
            </p>
          </div>
          <div className="flex flex-row gap-5">
            <img
              src={kitchenIcon}
              alt="Kitchen"
              className="w-[16px] h-[16px]"
            />
            <p className="text-[#313131] font-[400] text-[14px]">Kitchen</p>
          </div>
        </div>
        <div className="w-[158px] h-[100px] space-y-3">
          <div className="flex flex-row gap-5">
            <img src={washer} alt="Washer" className="w-[16px] h-[16px]" />
            <p className="text-[#313131] font-[400] text-[14px]">Washer</p>
          </div>
          <div className="flex flex-row gap-5">
            <img src={wifiIcon} alt="WiFi" className="w-[16px] h-[16px]" />
            <p className="text-[#313131] font-[400] text-[14px]">
              24/7 WIFI connection
            </p>
          </div>
          <div className="flex flex-row gap-5">
            <img src={dryerIocon} alt="Dryer" className="w-[16px] h-[16px]" />
            <p className="text-[#313131] font-[400] text-[14px]">Dryer</p>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-8 ">
        <p className="text-[#730071] font-[400] ">See all popular amenities </p>
        <img src={arrowright} alt="Right Arrow" className="text-[#730071]" />
      </div>
    </div>
  </div>
);
export default AmenitiesSection;
