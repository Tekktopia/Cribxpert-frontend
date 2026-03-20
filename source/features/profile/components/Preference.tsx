import { PreferencesProps } from '@/types';
import { useState } from 'react';

const Preference = ({
  initialNotifications,
  initialUpdates,
  initialLanguage,
  initialCurrency,
  initialMessages,
  initialDiscounts,
  initialAuthentication,
}: PreferencesProps) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [updates, setUpdates] = useState(initialUpdates);
  const [language, setLanguage] = useState(initialLanguage);
  const [currency, setCurrency] = useState(initialCurrency);
  const [messages, setMessages] = useState(initialMessages);
  const [discounts, setDiscounts] = useState(initialDiscounts);
  const [authentication, setAuthentication] = useState(initialAuthentication);

  return (
    <div className="flex flex-col gap-6 items-start my-9 ">
      <h2 className="font-medium text-xl text-[#070707] ">Notification</h2>
      <div className="flex flex-col gap-4">
        <div className="flex lg:items-center lg:gap-2 gap-4">
          <button
            onClick={() => setNotifications(!notifications)}
            className="inline-flex items-center space-x-4 cursor-pointer "
          >
            <span className="relative">
              <div
                className={` w-10 lg:w-14 h-6 lg:h-7 rounded-full shadow-inner transition-colors duration-300 ${
                  notifications ? 'bg-primary' : 'bg-hoverColor'
                } `}
              ></div>
              <div
                className={`absolute inset-y-0 left-0 w-4 h-4  lg:w-5 lg:h-5 m-1 rounded-full shadow transition-transform duration-300  ${
                  notifications ? 'translate-x-4 lg:translate-x-7' : ''
                }   bg-white`}
              ></div>
            </span>
          </button>
          <span className="text-[#232323]">
            Get notified about confirmations, cancellations and check-in
            reminders
          </span>
        </div>

        <div className="flex lg:items-center gap-4  lg:gap-2">
          <button
            onClick={() => setDiscounts(!discounts)}
            className="inline-flex items-center space-x-4 cursor-pointer "
          >
            <span className="relative">
              <div
                className={` w-10 lg:w-14 h-6 lg:h-7 rounded-full shadow-inner transition-colors duration-300 ${
                  discounts ? 'bg-primary' : 'bg-hoverColor'
                } `}
              ></div>
              <div
                className={`absolute inset-y-0 left-0 w-4 h-4  lg:w-5 lg:h-5 m-1 rounded-full shadow transition-transform duration-300  ${
                  discounts ? 'translate-x-4 lg:translate-x-7' : ''
                }   bg-white`}
              ></div>
            </span>
          </button>
          <span className="text-[#232323]">
            Be the first to know about discounts and exclusive deals
          </span>
        </div>
        <div className="flex items-center  gap-2">
          <button
            onClick={() => setMessages(!messages)}
            className="inline-flex items-center space-x-4 cursor-pointer "
          >
            <span className="relative">
              <div
                className={` w-10 lg:w-14 h-6 lg:h-7 rounded-full shadow-inner transition-colors duration-300 ${
                  messages ? 'bg-primary' : 'bg-hoverColor'
                } `}
              ></div>
              <div
                className={`absolute inset-y-0 left-0 w-4 h-4  lg:w-5 lg:h-5 m-1 rounded-full shadow transition-transform duration-300  ${
                  messages ? 'translate-x-4 lg:translate-x-7' : ''
                }   bg-white`}
              ></div>
            </span>
          </button>
          <span className="text-[#232323]">
            Receive messages from hosts regarding your bookings
          </span>
        </div>
        <div className="flex items-center  gap-2">
          <button
            onClick={() => setUpdates(!updates)}
            className="inline-flex items-center space-x-4 cursor-pointer "
          >
            <span className="relative">
              <div
                className={` w-10 lg:w-14 h-6 lg:h-7 rounded-full shadow-inner transition-colors duration-300 ${
                  updates ? 'bg-primary' : 'bg-hoverColor'
                } `}
              ></div>
              <div
                className={`absolute inset-y-0 left-0 w-4 h-4  lg:w-5 lg:h-5 m-1 rounded-full shadow transition-transform duration-300  ${
                  updates ? 'translate-x-4 lg:translate-x-7' : ''
                }   bg-white`}
              ></div>
            </span>
          </button>
          <span className="text-[#232323]">
            Get updates on payments, invoices, and refunds
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-medium text-xl text-[#070707] ">Security</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAuthentication(!authentication)}
            className="inline-flex items-center space-x-4 cursor-pointer "
          >
            <span className="relative">
              <div
                className={` w-10 lg:w-14 h-6 lg:h-7 rounded-full shadow-inner transition-colors duration-300 ${
                  authentication ? 'bg-primary' : 'bg-hoverColor'
                } `}
              ></div>
              <div
                className={`absolute inset-y-0 left-0 w-4 h-4  lg:w-5 lg:h-5 m-1 rounded-full shadow transition-transform duration-300 ${
                  authentication ? 'translate-x-4 lg:translate-x-7' : ''
                }   bg-white`}
              ></div>
            </span>
          </button>
          <span className="text-[#232323]">
            Enable or disable two factor authentication
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full lg:w-[400px]">
        <h2 className="font-medium text-xl text-[#070707] ">
          Language & Currency
        </h2>
        <div>
          <label className=" text-[#999999] ">Select Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full py-3 px-4 border rounded flex items-center border-1 border-[#DFE4EA] text-[#070707]"
          >
            <option value="English">English(UK)</option>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
            <option value="German">German</option>
          </select>
        </div>
        <div>
          <label className=" text-[#999999] ">Select Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full py-3 px-4 border rounded flex items-center border-1 border-[#DFE4EA] text-[#070707]"
          >
            <option value="USD">USD </option>
            <option value="NGN">NGN </option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP </option>
            <option value="JPY">JPY </option>
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="w-[156px] bg-primary text-white p-[10px] rounded-lg hover:bg-hoverColor"
        >
          Save
        </button>
        <button className="w-[156px] border-2 border-primary text-primary p-[10px] rounded-lg">
          Cancel
        </button>
      </div>

      {/* 
             
            */}
    </div>
  );
};

export default Preference;
