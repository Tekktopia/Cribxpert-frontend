import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type CustomDropdownProps = {
  nextStep: () => void;
  methodSelected: string | null;
  setMethodSelected: React.Dispatch<React.SetStateAction<string | null>>;
};

const options = [
  { id: 1, name: "Email Address" },
  { id: 2, name: "Phone Number" },
];

export default function CustomDropdown({
  methodSelected,
  setMethodSelected,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (name: string) => {
    setMethodSelected((prev) => (prev === name ? null : name)); // Toggle selection
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className='relative w-full z-20'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 border border-[#730071] rounded-md flex justify-between items-center`}
      >
        {methodSelected || "Select"}
        <ChevronDown className={`w-5 h-5`} />
      </button>

      {isOpen && (
        <div className='absolute w-full mt-1 p-4 bg-white border border-gray-300 rounded-md shadow-lg'>
          <label className='cursor-pointer flex justify-between items-center gap-2 p-3 bg-purple-100'>
            <button onClick={handleClose} className='w-4 h-4 accent-[#730071]'>
              Select
            </button>
            <ChevronUp className={`w-5 h-5 text-[#730071]`} />
          </label>
          {options.map((option) => (
            <label
              key={option.id}
              className='cursor-pointer w-full flex items-center gap-2 p-3'
            >
              <input
                type='checkbox'
                checked={methodSelected === option.name}
                onChange={() => handleSelect(option.name)}
                className='w-4 h-4 accent-[#730071]'
              />
              {option.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
