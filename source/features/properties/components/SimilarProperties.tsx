import React from 'react';
import PropertyListings from './PropertyListing';
import { PropertyListing } from '@/types';

interface SimilarPropertiesProps {
  propertyName: string;
  similarProperties: PropertyListing[];
}

const SimilarProperties: React.FC<SimilarPropertiesProps> = ({
  propertyName,
  similarProperties,
}) => {
  return (
    <div className="py-8">
      <h1 className="text-[#040404] text-md md:text-[20px] font-[400] mb-4">
        Similar properties to {propertyName}
      </h1>
      <PropertyListings listings={similarProperties} />
    </div>
  );
};

export default SimilarProperties;
