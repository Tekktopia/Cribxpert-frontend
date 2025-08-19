import { useState, useEffect } from "react";

export interface ListingCardStepTwoProps {
  title: string;
  number: number;
  image: string;
  onChange?: (newNumber: number) => void;
}

const ListingCardStepTwo = ({ title, number, image, onChange }: ListingCardStepTwoProps) => {
  const [count, setCount] = useState(number);

  useEffect(() => {
    if (onChange) {
      onChange(count);
    }
  }, [count, onChange]);

  const handleIncrement = () => setCount(prev => prev + 1);
  const handleDecrement = () => setCount(prev => Math.max(0, prev - 1));

  return (
    <div className="flex flex-wrap items-center justify-between border border-gray-300 p-2 sm:p-3 rounded-lg gap-y-2">
      {/* Left Section */}
      <div className="pl-2 sm:pl-4 flex items-center gap-x-2 min-w-0">
        <img
          src={image}
          alt={title}
          className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
        />
        <h2 className="text-xs sm:text-sm truncate">{title}</h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4 pr-2 sm:pr-4">
        <button onClick={handleDecrement}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 sm:w-7 sm:h-7 border border-gray-300 p-1.5 rounded-md hover:bg-gray-100"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15" />
          </svg>
        </button>
        <p className="text-gray-600 text-sm sm:text-base">{count}</p>
        <button onClick={handleIncrement}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 sm:w-7 sm:h-7 border border-gray-300 p-1.5 rounded-md hover:bg-gray-100"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m-7.5-7.5h15" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ListingCardStepTwo;
