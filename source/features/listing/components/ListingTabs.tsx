import React from 'react';

interface ListingTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  'All Listings',
  'Active Listings',
  'Most Booked Listings',
  'Drafted Listings',
];

const ListingTabs: React.FC<ListingTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-4 mb-5 text-sm border-b-2 pb-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 border-b-2 transition duration-200 ${
            activeTab === tab
              ? 'text-[#1D5C5C] border-[#1D5C5C] font-semibold'
              : 'border-transparent text-gray-600 hover:text-[#1D5C5C]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ListingTabs;
