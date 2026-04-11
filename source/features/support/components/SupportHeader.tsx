// frontend/src/features/support/components/SupportHeader.tsx
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { supportBanner } from '@/assets';
import { useState } from 'react';

interface SupportHeaderProps {
  title?: string;
  subtitle?: string;
  onSearch?: (query: string) => void;
  popularTerms?: string[];
}

const SupportHeader = ({ 
  title = "Support Center", 
  subtitle, 
  onSearch,
  popularTerms = ["What is refund process?", "How do i cancel a booking?"]
}: SupportHeaderProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (onSearch && searchValue.trim()) {
      onSearch(searchValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePopularClick = (term: string) => {
    setSearchValue(term);
    if (onSearch) {
      onSearch(term);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="bg-cover bg-no-repeat absolute inset-0"
        style={{ backgroundImage: `url(${supportBanner})` }}
      >
        <div className="bg-[#1D5C5C66] absolute inset-0">
          <div className="relative flex-col py-6 px-8 h-[447px] w-full flex text-white justify-end">
            <div className="inline-flex flex-col gap-4 items-start lg:w-[650px]">
              <h1 className="font-bold text-4xl">{title}</h1>
              {subtitle && <p className="text-lg font-normal">{subtitle}</p>}
              <div className="flex w-full mt-4">
                <div className="flex gap-2 bg-white items-center py-4 lg:py-[18px] px-6 w-4/5">
                  <MagnifyingGlassIcon className="h-6 w-6 text-[#6F6F6F]" />
                  <input
                    type="search"
                    name="search"
                    id="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="text-[#6F6F6F] text-[16px] w-full outline-none"
                    placeholder="Search for answers..."
                  />
                </div>
                <button 
                  onClick={handleSearch}
                  className="flex py-2 px-7 justify-center items-center gap-2 bg-[#ECB90A] text-[#070707] w-1/5 lg:text-[16px] text-sm hover:bg-[#d4a308] transition-colors"
                >
                  Search
                </button>
              </div>
              <p className="text-base font-normal">
                <span className="font-semibold text-white pr-2">POPULAR:</span>
                {popularTerms.map((term, index) => (
                  <span key={index}>
                    <button
                      onClick={() => handlePopularClick(term)}
                      className="hover:underline cursor-pointer"
                    >
                      {term}
                    </button>
                    {index < popularTerms.length - 1 && ' • '}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportHeader;