import ListingSearch from "./ListingSearch";
import { useState } from "react";



const ListingHeader: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    console.log(newSearchTerm);
    
    // Optionally: trigger filtering logic here
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">My Listing</h2>
      <div className="flex gap-4 items-center">
        <ListingSearch value={searchTerm} onChange={handleSearchChange} />
        <button className="bg-[#1D5C5C] px-4 py-2 rounded-lg text-white text-sm">
          Create New Listing
        </button>
      </div>
    </div>
  );
};

export default ListingHeader;


