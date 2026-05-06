import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentListing } from '@/features/properties/listingSlice';

const HouseLayout: React.FC = () => {
  const currentListing = useSelector(selectCurrentListing);

  if (!currentListing) return null;

  const specs = [
    { label: 'TOTAL AREA', value: `${currentListing.size || '120'} m²` },
    { label: 'MAX GUESTS', value: currentListing.guestNo || '2' },
    { label: 'BEDROOMS', value: currentListing.bedroomNo || '0' },
    { label: 'BATHROOMS', value: currentListing.bathroomNo || '0' },
    { label: 'CLEANING FEE', value: `$ ${currentListing.cleaningFee?.toLocaleString() || '0'}` },
    { label: 'TOTAL PRICE', value: `$ ${currentListing.basePrice?.toLocaleString() || '0'}` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 py-12 border-t border-neutral-100 mt-12">
      {/* Left: Floor Plan Placeholder */}
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <button className="px-5 py-2 bg-primary text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm">1st Floor</button>
          <button className="px-5 py-2 bg-neutral-50 text-neutral-400 text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-neutral-100 transition-colors">2nd Floor</button>
        </div>
        <div className="aspect-video bg-white border border-neutral-100 flex items-center justify-center p-6 overflow-hidden">
          <img 
            src="https://images.squarespace-cdn.com/content/v1/5890f5099f74567a9609c13b/1541434914109-Y0G75H8O8L0Y8Y0Y0Y0Y/Floor+Plan+1.jpg" 
            alt="Floor Plan" 
            className="w-full h-full object-contain mix-blend-multiply opacity-90"
            onError={(e) => {
              e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/2312/2312487.png';
            }}
          />
        </div>
      </div>

      {/* Right: Specs Table */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-light tracking-tight text-neutral-900 mb-10 uppercase">
          House <span className="font-bold">Layout</span>
        </h2>
        <div className="flex flex-col">
          {specs.map((spec, index) => (
            <div 
              key={index} 
              className={`flex justify-between items-center py-4 border-b border-neutral-100 ${index === specs.length - 1 ? 'bg-primary/5 px-4 -mx-4 rounded-sm' : ''}`}
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">{spec.label}</span>
              <span className={`text-[13px] tracking-widest text-neutral-900 ${index === specs.length - 1 ? 'font-bold text-primary' : 'font-medium'}`}>
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HouseLayout;
