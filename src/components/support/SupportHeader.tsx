import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import supportbanner from '../../assets/images/supportbanner.png';

const SupportHeader = () => {
  return (
    <div className="relative min-h-screen">
      <div
        className="  bg-cover bg-no-repeat absolute inset-0   "
        style={{ backgroundImage: `url(${supportbanner})` }}
      >
        <div className="bg-[#73007166] absolute inset-0 ">
          <div className="relative  flex-col py-6 px-8 h-[447px]  w-full flex text-white justify-end ">
            <div className="inline-flex flex-col gap-4 items-start w-[650px] ">
              <h1 className="font-bold text-4xl">Support Center</h1>
              <p className="text-lg font-normal">
                Browse through our frequently asked questions, and guides for
                quick solutions
              </p>
              <div className="flex w-full mt-4">
                <div className="flex gap-2 bg-white items-center py-[18px] px-6 w-4/5 ">
                  <MagnifyingGlassIcon className="h-6 w-6 text-[#6F6F6F]" />
                  <input
                    type="Search"
                    name=""
                    id=""
                    className="text-[#6F6F6F] text-[16px] w-full outline-none"
                    placeholder="search"
                  />
                </div>
                <button className="flex py-2 px-7 justify-center items-center gap-2 bg-[#ECB90A] text-[#070707] w-1/5">
                  Search
                </button>
              </div>
              <p className="text-base font-normal">
                <span className="font-semibold text-white pr-2">POPULAR:</span>
                What is refund process? How do i cancel a booking?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportHeader;
