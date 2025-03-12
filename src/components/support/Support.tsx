import { SupportType } from '@/types';
import {
  DocumentTextIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router';

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
          <div>
            <div key={index} className="flex items-center gap-4">
              <div className="bg-[#F1E6F1] rounded-full p-3 ">{item.icon}</div>

              <h1 className="text-base text-[#070707] font-bold">
                {item.title}
              </h1>
            </div>
            <div className="flex flex-col gap-4 p-6 justify-center">
              <div className="flex  gap-4 ">
                <div>{item.iconList}</div>
                <Link
                  to={`#`}
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
    </div>
  );
};

export default Support;
