import SupportHeader from '@/features/support/components/SupportHeader';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline';

const SupportInfo = () => {
  return (
    <div>
      <div className="mt-32">
        <SupportHeader />
        <div className="lg:p-8">
          <div className=" text-[#6F6F6F] flex p-[60px] flex-col gap-[20px] bg-[#FFF] shadow-lg shadow-[#1D5C5C14] text-sm lg:text-lg">
            <div className=" gap-[10px] flex flex-col ">
              <h1 className="text-[#070707] text-2xl lg:text-[31px] font-bold mb-4">
                How do i Cancel or modify a booking?
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 mt-10">
              <p>Is this helpful?</p>
              <div className="flex gap-2">
                <button>
                  <HandThumbUpIcon className="h-6 w-6 text-[#6F6F6F]" />
                </button>
                <button>
                  <HandThumbDownIcon className="h-6 w-6 text-[#6F6F6F]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportInfo;
