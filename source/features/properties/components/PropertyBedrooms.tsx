import React from 'react';

interface Bedroom {
  image: string;
  name: string;
  amenities: string;
}

interface PropertyBedroomsProps {
  bedrooms: Bedroom[];
}

const PropertyBedrooms: React.FC<PropertyBedroomsProps> = ({ bedrooms }) => {
  return (
    <section className="py-8 sm:py-12">
      <h2 className="text-[#050505] text-lg sm:text-xl font-medium mb-4 sm:mb-5">
        Where you sleep
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {bedrooms.map((bedroom, index) => (
          <div key={index}>
            <img
              src={bedroom.image}
              alt={bedroom.name}
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-3">
              <p className="text-[#6F6F6F] font-[400] text-[14px]">
                {bedroom.name}
              </p>
              <p className="text-[#6F6F6F] font-[400] text-[14px]">
                {bedroom.amenities}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyBedrooms;
