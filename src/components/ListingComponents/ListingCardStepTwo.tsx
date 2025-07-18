
import { useState } from "react";



export interface ListingCardStepTwoProps {
  title: string;
  number: number;
  image: string;
}

const ListingCardStepTwo = ({ title, number, image }: ListingCardStepTwoProps) => {
    const [numbers, setNumber] = useState(number);
    const handleIncrement = () => {
        setNumber(prev =>( prev + 1)); 
    }
    const handleDecrement = () => {
       setNumber(prev => Math.max(0, prev - 1)); 
    }
  return (
    <div className="flex  items-center justify-between  border border-gray-300 p-2 rounded-lg">
      <div className=" pl-4 flex items-center justify-center gap-x-2">
      <img
        src={image}
        alt={title}
        className="w-5 h-5 object-cover flex-shrink-0"
      />
      <h2 className="text-sm ">{title}</h2>
      </div>
      <div className="flex items-center justify-center gap-4 pr-4">
        <button
        onClick={handleDecrement}
        className=""
        >
          <svg 
          
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 border border-gray-300 p-1.5 rounded-md hover:bg-gray-100">
                <path strokeLinecap="round" strokeLinejoin="round"
                d="M4.5 12h15" />
        </svg>

        </button>
      <p className="text-gray-600 max-w-xl">{numbers}</p>
      <button
        onClick={handleIncrement}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 border border-gray-300 p-1.5 rounded-md hover:bg-gray-100">
        <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 4.5v15m-7.5-7.5h15" />
        </svg>

      </button>

      </div>
    </div>
  );
};
export default ListingCardStepTwo