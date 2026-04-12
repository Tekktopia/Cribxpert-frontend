import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Location {
  name: string;
  distance: string;
  isTransport?: boolean;
}

interface PropertyLocationProps {
  mapImage: string;
  address: string;
  nearbyLocations: Location[];
  icons: {
    location: string;
    transport: string;
    arrowRight: string;
  };
}

const PropertyLocation: React.FC<PropertyLocationProps> = ({
  mapImage,
  address,
  nearbyLocations,
  icons,
}) => {
  return (
    <div className="space-y-4 py-6 sm:py-8">
      <h2 className="text-xl font-medium text-[#040404]">Explore the area</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 space-y-3">
          <div className="h-40 bg-gray-100 rounded-md overflow-hidden">
            <img
              src={mapImage}
              alt="Map"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-normal text-[#313131]">{address}</p>
            <div className="flex items-center gap-1 text-sm text-[#6F6F6F] cursor-pointer hover:text-[#040404]">
              <span>View in map</span>
               <ChevronRight size={20} color='#006073'/>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          {nearbyLocations.map((location, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2">
                <img
                  src={location.isTransport ? icons.transport : icons.location}
                  alt={location.isTransport ? 'Transport' : 'Location'}
                  className="w-4 h-4 flex-shrink-0"
                />
                <p className="text-sm font-normal text-[#6F6F6F] break-words">
                  {location.name}
                </p>
              </div>
              <p className="text-sm font-normal text-[#999999] ml-6">
                {location.distance}
              </p>
            </div>
          ))}
          <div className="flex items-center gap-1 text-sm  cursor-pointer  mt-4">
            <span className='text-[#6F6F6F]'>See more about area</span>
             <ChevronRight size={20} color='#006073'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyLocation;
