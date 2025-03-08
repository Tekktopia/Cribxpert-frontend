import { useState } from 'react';
import { PreferencesProps } from '../common/profile/types';
import React from 'react';

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
        <div className="flex items-center  gap-2">
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${
              notifications ? 'bg-[#730071]' : 'bg-[#F1E6F1]'
            }`}
          >
            <div
              className={`absolute left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                notifications ? 'translate-x-7' : ''
              }`}
            />
          </button>
          <span className="text-[#232323]">
            Get notified about confirmations, cancellations and check-in
            reminders
          </span>
        </div>

        <div className="flex items-center  gap-2">
          <button
            onClick={() => setDiscounts(!discounts)}
            className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${
              discounts ? 'bg-[#730071]' : 'bg-[#F1E6F1]'
            }`}
          >
            <div
              className={`absolute left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                discounts ? 'translate-x-7' : ''
              }`}
            />
          </button>
          <span className="text-[#232323]">
            Be the first to know about discounts and exclusive deals
          </span>
        </div>
        <div className="flex items-center  gap-2">
          <button
            onClick={() => setMessages(!messages)}
            className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${
              messages ? 'bg-[#730071]' : 'bg-[#F1E6F1]'
            }`}
          >
            <div
              className={`absolute left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                messages ? 'translate-x-7' : ''
              }`}
            />
          </button>
          <span className="text-[#232323]">
            Receive messages from hosts regarding your bookings
          </span>
        </div>
        <div className="flex items-center  gap-2">
          <button
            onClick={() => setUpdates(!updates)}
            className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${
              updates ? 'bg-[#730071]' : 'bg-[#F1E6F1]'
            }`}
          >
            <div
              className={`absolute left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                updates ? 'translate-x-7' : ''
              }`}
            />
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
            className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${
              authentication ? 'bg-[#730071]' : 'bg-[#F1E6F1]'
            }`}
          >
            <div
              className={`absolute left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                authentication ? 'translate-x-7' : ''
              }`}
            />
          </button>
          <span className="text-[#232323]">
            Enable or disable two factor authentication
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-[400px]">
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
          className="w-[156px] bg-[#730071] text-white p-[10px] rounded-lg hover:bg-[#3f013e]"
        >
          Save
        </button>
        <button className="w-[156px] border-2 border-[#730071] text-[#730071] p-[10px] rounded-lg hover:border-[#3f013e]">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Preference;
