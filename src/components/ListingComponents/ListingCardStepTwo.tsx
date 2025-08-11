import { useState, useEffect } from "react";

export interface ListingCardStepTwoProps {
  title: string;
  number: number;
  image: string;
  onChange?: (newNumber: number) => void; // optional callback to notify parent
}

const ListingCardStepTwo = ({ title, number, image, onChange }: ListingCardStepTwoProps) => {
  const [count, setCount] = useState(number);

  // Notify parent when count changes
  useEffect(() => {
    if (onChange) {
      onChange(count);
    }
  }, [count, onChange]);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    setCount(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="flex items-center justify-between border border-gray-300 p-2 rounded-lg">
      <div className="pl-4 flex items-center justify-center gap-x-2">
        <img src={image} alt={title} className="w-5 h-5 object-cover flex-shrink-0" />
        <h2 className="text-sm">{title}</h2>
      </div>
      <div className="flex items-center justify-center gap-4 pr-4">
        <button onClick={handleDecrement} className="">
          <svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor"
            className="w-6 h-6 border border-gray-300 p-1.5 rounded-md hover:bg-gray-100"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15" />
          </svg>
        </button>
        <p className="text-gray-600 max-w-xl">{count}</p>
        <button onClick={handleIncrement}>
          <svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor"
            className="w-6 h-6 border border-gray-300 p-1.5 rounded-md hover:bg-gray-100"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m-7.5-7.5h15" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ListingCardStepTwo;
