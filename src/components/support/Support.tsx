import { ContactInfo, SupportType } from '@/types';
import {
  DocumentTextIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import {
  PhoneArrowUpRightIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router';
import facebook from '@/assets/socialIcons/facebook.svg';
import instagram from '@/assets/socialIcons/instagram.svg';
import x from '@/assets/socialIcons/x.svg';

const contactInfo: Array<ContactInfo> = [
  {
    icon: <PhoneArrowUpRightIcon className="h-6 w-6" />,
    title: '+2348167890978',
  },
  {
    icon: <EnvelopeIcon className="h-6 w-6" />,
    title: 'shortletng.com',
  },
  {
    icon: <MapPinIcon className="h-6 w-6" />,
    title: 'Lagos, Nigeria',
  },
];

const header: Array<SupportType> = [
  {
    icon: <InformationCircleIcon className="h-6 w-6 text-[#730071]" />,
    title: 'Booking & Cancellations',
    iconList: <DocumentTextIcon className="h-6 w-6 text-[#6F6F6F]" />,
    list1: 'How do i cancel or modify a booking?',
    list2: ' What is refund process?',
    list3: ' What is refund process?',
    list4: ' What is refund process?',
    list5: ' What is refund process?',
  },
  {
    icon: <InformationCircleIcon className="h-6 w-6 text-[#730071]" />,
    title: 'Payments & Refunds',
    iconList: <DocumentTextIcon className="h-6 w-6 text-[#6F6F6F]" />,
    list1: 'How do I update my payment method?',
    list2: ' What is refund process?',
    list3: ' What is refund process?',
    list4: ' What is refund process?',
    list5: ' What is refund process?',
  },
  {
    icon: <InformationCircleIcon className="h-6 w-6 text-[#730071]" />,
    title: 'Account & Security',
    iconList: <DocumentTextIcon className="h-6 w-6 text-[#6F6F6F]" />,
    list1: 'How do I reset my password?',
    list2: ' What is refund process?',
    list3: ' What is refund process?',
    list4: ' What is refund process?',
    list5: ' What is refund process?',
  },
  {
    icon: <InformationCircleIcon className="h-6 w-6 text-[#730071]" />,
    title: 'Booking & Cancellations',
    iconList: <DocumentTextIcon className="h-6 w-6 text-[#6F6F6F]" />,
    list1: 'How do i cancel or modify a booking?',
    list2: ' What is refund process?',
    list3: ' What is refund process?',
    list4: ' What is refund process?',
    list5: ' What is refund process?',
  },
  {
    icon: <InformationCircleIcon className="h-6 w-6 text-[#730071]" />,
    title: 'Payments & Refunds',
    iconList: <DocumentTextIcon className="h-6 w-6 text-[#6F6F6F]" />,
    list1: 'How do I update my payment method?',
    list2: ' What is refund process?',
    list3: ' What is refund process?',
    list4: ' What is refund process?',
    list5: ' What is refund process?',
  },
  {
    icon: <InformationCircleIcon className="h-6 w-6 text-[#730071]" />,
    title: 'Account & Security',
    iconList: <DocumentTextIcon className="h-6 w-6 text-[#6F6F6F]" />,
    list1: 'How do I reset my password?',
    list2: ' What is refund process?',
    list3: ' What is refund process?',
    list4: ' What is refund process?',
    list5: ' What is refund process?',
  },
];
const Support = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[72px]   p-10 justify-center">
        {header.map((item: SupportType, index: number) => (
          <div key={index}>
            <div className="flex items-center gap-4">
              <div className="bg-[#F1E6F1] rounded-full p-3 ">{item.icon}</div>

              <h1 className="text-base text-[#070707] font-bold">
                {item.title}
              </h1>
            </div>
            <div className="flex flex-col gap-4 p-6 justify-center">
              <div className="flex  gap-4 ">
                <div>{item.iconList}</div>
                <Link
                  to={`/support-info`}
                  className="text-base cursor-pointer text-[#070707] "
                >
                  {item.list1}
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div>{item.iconList}</div>
                <h1 className="text-base text-[#070707] ">{item.list2}</h1>
              </div>
              <div className="flex items-center gap-4">
                <div>{item.iconList}</div>
                <h1 className="text-base text-[#070707] ">{item.list3}</h1>
              </div>
              <div className="flex items-center gap-4">
                <div>{item.iconList}</div>
                <h1 className="text-base text-[#070707] ">{item.list4}</h1>
              </div>
              <div className="flex items-center gap-4">
                <div>{item.iconList}</div>
                <h1 className="text-base text-[#070707] ">{item.list5}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row py-4 px-6 items-center gap-20 justify-between">
        <div className="lg:w-[500px] lg:h-[650px] bg-[#730071] flex flex-col justify-between relative overflow-hidden rounded-lg">
          <div className="p-8 text-white flex flex-col gap-24">
            <div className="flex flex-col gap-3">
              <h1 className="font-semibold text-2xl ">Contact Information</h1>
              <p className="text-[#6F6F6F]">
                We’ll get back to you within 24-48 hours
              </p>
            </div>
            <div className="flex flex-col gap-12">
              {contactInfo.map((item: ContactInfo, index: number) => (
                <div className="flex gap-3 items-center" key={index}>
                  {item.icon}
                  <p className="text-[16px]">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="justify-self-end p-4 flex gap-4">
            <div className=" items-center justify-center flex bg-[#AE6BAD] rounded-full w-8 p-2">
              <img src={facebook} alt="" className="" />
            </div>
            <div className=" items-center justify-center flex bg-[#AE6BAD] rounded-full w-8 p-2">
              <img src={instagram} alt="" />
            </div>
            <div className=" items-center justify-center flex bg-[#AE6BAD] rounded-full w-8 p-2">
              <img
                src={x}
                alt=""
                style={{ fill: 'white' }}
                className="stroke-white"
              />
            </div>
          </div>
          <div className="w-[269px] rounded-full h-[269px] bg-[#FFFFFF1F]  absolute  -bottom-20 -right-20"></div>
        </div>

        <form className=" flex flex-col gap-[42px] text-[#6F6F6F] lg:w-[540px]  p-3">
          <div className=" flex flex-wrap gap-4 ">
            <div className="flex gap-1 flex-col w-full lg:w-[250px]  h-[70px] mb-4">
              <label className=" text-[#999999] ">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="amoria"
                className="w-full py-3 px-4 border rounded flex items-center border-1 border-[#DFE4EA] text-[#999999]"
              />
            </div>

            <div className="flex gap-1 flex-col w-full lg:w-[250px] h-[70px] mb-4">
              <label className=" text-[#999999] ">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="amoria"
                className="w-full py-3 px-4 border rounded flex items-center border-1 border-[#DFE4EA] text-[#999999]"
              />
            </div>

            <div className="flex gap-1 flex-col w-full lg:w-[250px] h-[70px] mb-4">
              <label className=" text-[#999999] ">Email</label>
              <input
                type="email"
                name="email"
                placeholder="amoriamakinwa@gmail.com"
                className="w-full py-3 px-4 border rounded flex items-center border-1 border-[#DFE4EA] text-[#999999]"
              />
            </div>

            <div className="flex gap-1 flex-col w-full lg:w-[250px] h-[70px] mb-4">
              <label className=" text-[#999999] ">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+2348167990657"
                className="w-full py-3 px-4 border rounded flex items-center border-1 border-[#DFE4EA] text-[#999999]"
              />
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-[#313131]">Select Subject</h3>
            <div className="flex gap-4 flex-wrap ">
              <div className="flex justify-center items-center gap-3">
                {' '}
                <input type="radio" name="select" id="" />
                <label htmlFor="select"> Booking Issues</label>
              </div>
              <div className="flex justify-center items-center gap-3">
                <input type="radio" name="select" id="" />
                <label htmlFor="select"> Technical Suport</label>
              </div>
              <div className="flex justify-center items-center gap-3">
                <input type="radio" name="select" id="" />
                <label htmlFor="select"> Technical Suport</label>
              </div>
              <div className="flex justify-center items-center gap-3">
                <input type="radio" name="select" id="" />
                <label htmlFor="select"> Billing Issues</label>
              </div>
              <div className="flex justify-center items-center gap-3">
                <input type="radio" name="select" id="" />
                <label htmlFor="select"> Report</label>
              </div>
              <div className="flex justify-center items-center gap-3">
                <input type="radio" name="select" id="" />
                <label htmlFor="select">Others</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="">
              Message
            </label>
            <textarea
              name=""
              id=""
              placeholder="Write your message"
              className="w-full py-3 gap-3 px-4 border rounded flex items-center border-1 h-[125px] border-[#DFE4EA] text-[#999999]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-[156px] bg-[#730071] text-white p-[10px] rounded-lg hover:bg-[#3f013e] self-end"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Support;
