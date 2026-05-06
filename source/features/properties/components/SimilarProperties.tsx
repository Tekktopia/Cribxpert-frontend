import React from 'react';
import PropertyListings from './PropertyListing';
import { PropertyListing } from '@/types';

interface SimilarPropertiesProps {
  propertyName: string;
  similarProperties: PropertyListing[];
}

const SimilarProperties: React.FC<SimilarPropertiesProps> = ({
  similarProperties,
}) => {
  return (
    <div className="py-16 border-t border-neutral-100">
      <h2 className="text-2xl font-light tracking-tight text-neutral-900 mb-12 uppercase">
        Explore <span className="font-bold">Similar Spaces</span>
      </h2>
      <PropertyListings listings={similarProperties} />
    </div>
  );
};

export default SimilarProperties;
